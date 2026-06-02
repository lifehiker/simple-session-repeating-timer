import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing – SessionTimer",
  description:
    "Simple, transparent pricing. Free tier with 3 saved presets. Pro plan for unlimited presets, spoken alerts, and advanced display options.",
};

export default function PricingPage() {
  const free = [
    "Unlimited timer runs",
    "Up to 3 saved presets",
    "Session & repeating modes",
    "Sound alerts at transitions",
    "Large display mode",
    "1 custom repeating timer",
    "Guest mode (no signup)",
    "All 5 starter templates",
  ];

  const pro = [
    "Everything in Free",
    "Unlimited saved presets",
    "Unlimited repeating timers",
    "Spoken segment alerts (TTS)",
    "Advanced display themes",
    "Duplicate & edit templates",
    "Priority support",
    "Future: export & share presets",
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="font-bold text-xl text-blue-600">
            SessionTimer
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">Sign In</Button>
            </Link>
            <Link href="/app/timer">
              <Button size="sm">Start Free</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Simple, transparent pricing</h1>
          <p className="text-lg text-gray-600">
            Start for free. Upgrade when you need more.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-8 mb-12">
          {/* Free */}
          <div className="bg-white rounded-2xl border p-8">
            <div className="mb-6">
              <div className="font-semibold text-gray-500 text-sm uppercase tracking-wide mb-2">Free</div>
              <div className="text-5xl font-bold text-gray-900 mb-1">$0</div>
              <div className="text-gray-500">Forever free</div>
            </div>
            <Link href="/signup">
              <Button variant="outline" className="w-full mb-6">Get started free</Button>
            </Link>
            <ul className="space-y-3">
              {free.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pro */}
          <div className="bg-white rounded-2xl border-2 border-blue-500 p-8 relative">
            <Badge className="absolute -top-3 right-6 bg-blue-600">Most popular</Badge>
            <div className="mb-6">
              <div className="font-semibold text-blue-600 text-sm uppercase tracking-wide mb-2">Pro</div>
              <div className="text-5xl font-bold text-gray-900 mb-1">
                $3.99<span className="text-2xl font-normal text-gray-500">/mo</span>
              </div>
              <div className="text-gray-500">or $24.99/year (save 48%)</div>
            </div>
            <Link href="/signup">
              <Button className="w-full mb-6">Start with Pro</Button>
            </Link>
            <ul className="space-y-3">
              {pro.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm">
                  <span className="text-blue-500 mt-0.5">✓</span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-2xl border overflow-hidden mb-12">
          <div className="px-6 py-4 bg-gray-50 border-b">
            <h2 className="font-semibold text-gray-900">Feature comparison</h2>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left px-6 py-3 text-gray-500 font-normal">Feature</th>
                <th className="text-center px-6 py-3 text-gray-500 font-normal">Free</th>
                <th className="text-center px-6 py-3 text-blue-600 font-semibold">Pro</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Timer runs", "Unlimited", "Unlimited"],
                ["Saved presets", "Up to 3", "Unlimited"],
                ["Repeating timers", "1", "Unlimited"],
                ["Sound alerts", "✓", "✓"],
                ["Large display mode", "✓", "✓"],
                ["Starter templates", "5 templates", "5 templates"],
                ["Spoken alerts (TTS)", "—", "✓"],
                ["Advanced themes", "—", "✓"],
                ["Duplicate templates", "—", "✓"],
                ["Priority support", "—", "✓"],
              ].map(([feature, freeVal, proVal], i) => (
                <tr key={feature} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="px-6 py-3 text-gray-700">{feature}</td>
                  <td className="px-6 py-3 text-center text-gray-500">{freeVal}</td>
                  <td className="px-6 py-3 text-center text-blue-600 font-medium">{proVal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* FAQ */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">FAQ</h2>
          {[
            {
              q: "Do I need an account to use the timer?",
              a: "No. You can build and run timers as a guest without signing up. You only need an account to save presets across devices.",
            },
            {
              q: "What happens when I hit the 3-preset limit?",
              a: "You'll see an upgrade prompt when you try to save a 4th preset. You can still run unlimited timers — you just can't save more presets in the free tier.",
            },
            {
              q: "Can I cancel my Pro subscription?",
              a: "Yes, anytime. You'll keep Pro access until the end of your billing period. No questions asked.",
            },
            {
              q: "Is there a free trial for Pro?",
              a: "The free tier gives you a solid experience. If you need spoken alerts or unlimited presets, upgrade to Pro — it's $3.99/month.",
            },
          ].map(({ q, a }) => (
            <div key={q} className="border-b pb-6">
              <h3 className="font-semibold text-gray-900 mb-2">{q}</h3>
              <p className="text-gray-600 text-sm">{a}</p>
            </div>
          ))}
        </div>
      </div>

      <footer className="border-t bg-white py-8 px-4 text-center text-sm text-gray-500">
        <Link href="/" className="hover:text-gray-700">← Back to SessionTimer</Link>
      </footer>
    </div>
  );
}
