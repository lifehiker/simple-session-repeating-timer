import Link from "next/link";
import type { Metadata } from "next";
import { MarketingNav } from "@/components/marketing-nav";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Free visible timers with three saved presets. Pro unlocks unlimited presets, repeating timers, spoken alerts, and advanced display options.",
};

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-zinc-50">
      <MarketingNav />
      <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-semibold tracking-tight">Simple pricing for a simple timer</h1>
          <p className="mt-3 text-zinc-600">Start free. Upgrade when saved routines and spoken transitions become part of your workflow.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <Plan name="Free" price="$0" cta="Start free timer" href="/app/timer" features={["Unlimited manual timer runs", "Three saved presets", "One custom repeating timer", "Large display mode", "Sound alerts", "Starter templates"]} />
          <Plan name="Pro" price="$24.99/year" cta="Create account" href="/signup" featured features={["Unlimited saved presets", "Unlimited repeating timers", "Spoken segment alerts", "Advanced display colors", "Duplicate and edit templates", "Priority support", "$3.99 monthly option"]} />
        </div>
        <div className="mt-8 rounded-md border bg-white p-5 text-sm text-zinc-600">
          Stripe checkout is enabled when deployment credentials are configured. Without credentials, the app still runs with free and local fallback workflows.
        </div>
      </div>
    </main>
  );
}

function Plan({ name, price, cta, href, features, featured }: { name: string; price: string; cta: string; href: string; features: string[]; featured?: boolean }) {
  return (
    <div className={`relative rounded-md border bg-white p-6 ${featured ? "border-blue-500 shadow-sm" : ""}`}>
      {featured ? <Badge className="absolute right-4 top-4 bg-blue-600">Best value</Badge> : null}
      <div className="text-sm font-medium uppercase tracking-wide text-zinc-500">{name}</div>
      <div className="mt-3 text-4xl font-semibold">{price}</div>
      <Button asChild className="mt-6 w-full" variant={featured ? "default" : "outline"}>
        <Link href={href}>{cta}</Link>
      </Button>
      <ul className="mt-6 space-y-3 text-sm text-zinc-700">
        {features.map((feature) => (
          <li key={feature} className="flex gap-2">
            <span className="text-blue-600">✓</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
