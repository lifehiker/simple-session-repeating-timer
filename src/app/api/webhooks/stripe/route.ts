import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    console.log("[stripe webhook] Stripe not configured, skipping");
    return NextResponse.json({ received: true });
  }

  try {
    const { default: Stripe } = await import("stripe");
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const body = await req.text();
    const sig = req.headers.get("stripe-signature");

    if (!sig) {
      return NextResponse.json({ error: "No signature" }, { status: 400 });
    }

    let event: import("stripe").Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(
        body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error("[stripe webhook] signature verification failed:", err);
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    switch (event.type) {
      case "checkout.session.completed": {
        const checkoutSession = event.data.object as import("stripe").Stripe.Checkout.Session;
        const userId = checkoutSession.metadata?.userId;
        const customerId = checkoutSession.customer as string;
        const subscriptionId = checkoutSession.subscription as string;

        if (userId && subscriptionId) {
          const stripeSubscription = await stripe.subscriptions.retrieve(subscriptionId);
          await prisma.subscription.upsert({
            where: { userId },
            update: {
              stripeCustomerId: customerId,
              stripeSubscriptionId: subscriptionId,
              stripePriceId: stripeSubscription.items.data[0]?.price.id,
              status: stripeSubscription.status,
              currentPeriodEnd: new Date(
                stripeSubscription.items.data[0]?.current_period_end * 1000
              ),
            },
            create: {
              userId,
              stripeCustomerId: customerId,
              stripeSubscriptionId: subscriptionId,
              stripePriceId: stripeSubscription.items.data[0]?.price.id,
              status: stripeSubscription.status,
              currentPeriodEnd: new Date(
                stripeSubscription.items.data[0]?.current_period_end * 1000
              ),
            },
          });
        }
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as import("stripe").Stripe.Subscription;
        const existing = await prisma.subscription.findFirst({
          where: { stripeSubscriptionId: subscription.id },
        });

        if (existing) {
          await prisma.subscription.update({
            where: { id: existing.id },
            data: {
              status: subscription.status,
              stripePriceId: subscription.items.data[0]?.price.id,
              currentPeriodEnd: new Date(
                subscription.items.data[0]?.current_period_end * 1000
              ),
            },
          });
        }
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as import("stripe").Stripe.Subscription;
        await prisma.subscription.updateMany({
          where: { stripeSubscriptionId: subscription.id },
          data: { status: "inactive" },
        });
        break;
      }

      default:
        console.log("[stripe webhook] unhandled event:", event.type);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("[stripe webhook] error:", err);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }
}
