import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { tierForPriceId } from "@/lib/billing";

export async function POST(req: NextRequest) {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    console.log("[stripe webhook] Stripe not configured; acknowledging event without mutation");
    return NextResponse.json({ received: true });
  }

  const { default: Stripe } = await import("stripe");
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");
  if (!sig) return NextResponse.json({ error: "No signature" }, { status: 400 });

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (error) {
    console.error("[stripe webhook] signature verification failed:", error);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const checkoutSession = event.data.object as Stripe.Checkout.Session;
    const userId = checkoutSession.metadata?.userId;
    const subscriptionId = checkoutSession.subscription as string | null;
    if (userId && subscriptionId) {
      const subscription = await stripe.subscriptions.retrieve(subscriptionId);
      const item = subscription.items.data[0];
      await prisma.subscription.upsert({
        where: { userId },
        update: {
          stripeCustomerId: String(checkoutSession.customer ?? ""),
          stripeSubscriptionId: subscription.id,
          stripePriceId: item?.price.id,
          tier: tierForPriceId(item?.price.id),
          status: subscription.status,
          currentPeriodEnd: item?.current_period_end ? new Date(item.current_period_end * 1000) : null,
        },
        create: {
          userId,
          stripeCustomerId: String(checkoutSession.customer ?? ""),
          stripeSubscriptionId: subscription.id,
          stripePriceId: item?.price.id,
          tier: tierForPriceId(item?.price.id),
          status: subscription.status,
          currentPeriodEnd: item?.current_period_end ? new Date(item.current_period_end * 1000) : null,
        },
      });
    }
  }

  if (event.type === "customer.subscription.updated" || event.type === "customer.subscription.deleted") {
    const subscription = event.data.object as Stripe.Subscription;
    const item = subscription.items.data[0];
    await prisma.subscription.updateMany({
      where: { stripeSubscriptionId: subscription.id },
      data: {
        stripePriceId: item?.price.id,
        tier: event.type === "customer.subscription.deleted" ? "free" : tierForPriceId(item?.price.id),
        status: event.type === "customer.subscription.deleted" ? "inactive" : subscription.status,
        currentPeriodEnd: item?.current_period_end ? new Date(item.current_period_end * 1000) : null,
      },
    });
  }

  return NextResponse.json({ received: true });
}
