import Link from "next/link";
import { MarketingNav } from "@/components/marketing-nav";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PresetInput } from "@/types/timer";

export function TemplatePage({ template, description }: { template: PresetInput; description: string }) {
  return (
    <main>
      <MarketingNav />
      <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
        <Badge variant="secondary">{template.mode === "SESSION" ? "Session template" : "Repeating template"}</Badge>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight">{template.name} timer template</h1>
        <p className="mt-3 text-lg text-zinc-600">{description}</p>
        <div className="mt-8 space-y-3">
          {template.segments.map((segment, index) => (
            <div key={segment.name} className="flex items-center gap-4 rounded-md border bg-white p-4">
              <div className="grid size-9 place-items-center rounded-md text-sm font-semibold text-white" style={{ backgroundColor: segment.color ?? "#2563eb" }}>{index + 1}</div>
              <div>
                <div className="font-medium">{segment.name}</div>
                <div className="text-sm text-zinc-500">{Math.floor(segment.durationSeconds / 60)} min {segment.durationSeconds % 60 ? `${segment.durationSeconds % 60} sec` : ""}</div>
              </div>
            </div>
          ))}
        </div>
        <Button asChild size="lg" className="mt-8"><Link href="/app/timer">Use this template</Link></Button>
      </div>
    </main>
  );
}
