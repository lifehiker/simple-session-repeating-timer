import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MarketingNav } from "@/components/marketing-nav";
import { Button } from "@/components/ui/button";

interface LandingPageProps {
  title: string;
  description: string;
  keyword: string;
  useCases: string[];
}

export function SeoLandingPage({ title, description, keyword, useCases }: LandingPageProps) {
  return (
    <main className="bg-white text-zinc-950">
      <MarketingNav />
      <section className="border-b bg-blue-50">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm font-medium uppercase tracking-wide text-blue-700">{keyword}</p>
          <h1 className="mt-3 max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl">{title}</h1>
          <p className="mt-5 max-w-3xl text-lg text-zinc-600">{description}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg"><Link href="/app/timer">Start free timer <ArrowRight className="size-4" /></Link></Button>
            <Button asChild size="lg" variant="outline"><Link href="/templates">Browse templates</Link></Button>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold tracking-tight">Why this timer works</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {useCases.map((item) => (
            <div key={item} className="rounded-md border p-5 text-zinc-700">{item}</div>
          ))}
        </div>
      </section>
    </main>
  );
}
