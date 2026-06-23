import Link from "next/link";
import { MarketingNav } from "@/components/marketing-nav";
import { Button } from "@/components/ui/button";

export function BlogPost({ title, intro, sections }: { title: string; intro: string; sections: { heading: string; body: string }[] }) {
  return (
    <main>
      <MarketingNav />
      <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-semibold tracking-tight">{title}</h1>
        <p className="mt-4 text-lg text-zinc-600">{intro}</p>
        <div className="mt-10 space-y-8">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-2xl font-semibold tracking-tight">{section.heading}</h2>
              <p className="mt-3 leading-7 text-zinc-700">{section.body}</p>
            </section>
          ))}
        </div>
        <Button asChild size="lg" className="mt-10"><Link href="/app/timer">Build your timer</Link></Button>
      </article>
    </main>
  );
}
