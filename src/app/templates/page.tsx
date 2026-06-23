import Link from "next/link";
import type { Metadata } from "next";
import { MarketingNav } from "@/components/marketing-nav";
import { STARTER_TEMPLATES } from "@/lib/templates";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Timer Templates - Presentation, Classroom, Workout, Laundry, Study",
  description: "Starter timer presets for presentations, classroom rotations, workout intervals, laundry routines, and study sessions.",
};

const templateLinks: Record<string, string> = {
  Presentation: "/templates/presentation",
  "Classroom Rotation": "/templates/classroom-rotation",
  "Workout Intervals": "/templates/workout-intervals",
  Laundry: "/templates/laundry-routine",
  "Study Session": "/templates/study-session",
};

export default function TemplatesPage() {
  return (
    <main>
      <MarketingNav />
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-semibold tracking-tight">Timer templates for real routines</h1>
        <p className="mt-3 max-w-3xl text-zinc-600">Start with a proven session or interval structure, then customize names, durations, colors, and repeats in the builder.</p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {STARTER_TEMPLATES.map((template) => (
            <Link key={template.name} href={templateLinks[template.name] ?? "/app/timer"} className="rounded-md border bg-white p-5 transition hover:border-blue-300 hover:shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <h2 className="font-semibold">{template.name}</h2>
                <Badge variant="secondary">{template.mode === "SESSION" ? "Session" : `${template.repeatCount ?? "∞"} cycles`}</Badge>
              </div>
              <p className="mt-3 text-sm text-zinc-600">{template.segments.map((segment) => segment.name).join(" -> ")}</p>
            </Link>
          ))}
        </div>
        <Button asChild size="lg" className="mt-8"><Link href="/app/timer">Customize a template</Link></Button>
      </div>
    </main>
  );
}
