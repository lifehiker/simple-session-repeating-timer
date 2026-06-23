import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: "Stripe is not configured for this deployment." }, { status: 503 });
  }

  const session = await auth();
  if (!session?.user?.id || !session.user.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const priceId = String(body?.priceId ?? "");
  const allowed = [process.env.STRIPE_PRO_PRICE_ID, process.env.STRIPE_PRO_ANNUAL_PRICE_ID].filter(Boolean);

  if (!priceId || !allowed.includes(priceId)) {
    return NextResponse.json({ error: "A configured Stripe price id is required." }, { status: 400 });
  }

  const { default: Stripe } = await import("stripe");
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const localSubscription = await prisma.subscription.findUnique({ where: { userId: session.user.id } });

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer: localSubscription?.stripeCustomerId ?? undefined,
    customer_email: localSubscription?.stripeCustomerId ? undefined : session.user.email,
    line_items: [{ price: priceId, quantity: 1 }],
    subscription_data: { metadata: { userId: session.user.id } },
    success_url: `${appUrl}/app/settings?upgraded=1`,
    cancel_url: `${appUrl}/pricing`,
    metadata: { userId: session.user.id, priceId },
  });

  return NextResponse.json({ url: checkoutSession.url });
}
