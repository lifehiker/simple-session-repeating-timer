import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { STARTER_TEMPLATES } from "@/lib/templates";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Timer Templates – Ready-to-Use Session Presets | SessionTimer",
  description:
    "Browse free timer templates for presentations, classroom rotations, workouts, laundry, and study sessions. Click to use any template instantly.",
};

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  if (m >= 60) return `${Math.floor(m / 60)}h ${m % 60}m`;
  if (m > 0) return `${m}m${s > 0 ? ` ${s}s` : ""}`;
  return `${s}s`;
}

export default function TemplatesPage() {
  return (
    <div className="min-h-screen">
      <header className="border-b bg-white">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="font-bold text-xl text-blue-600">SessionTimer</Link>
          <Link href="/app/timer"><Button>Build Custom Timer</Button></Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Timer Templates</h1>
        <p className="text-xl text-gray-600 mb-12">
          Ready-to-use timer presets for common sessions. Click any template to customize
          and start it immediately.
        </p>

        <div className="grid sm:grid-cols-2 gap-6">
          {STARTER_TEMPLATES.map((template) => {
            const total = template.segments.reduce((s, seg) => s + seg.durationSeconds, 0);
            return (
              <Card key={template.name} className="hover:border-blue-300 hover:shadow-md transition-all">
                <CardContent className="pt-6 pb-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-lg font-bold text-gray-900">{template.name}</h2>
                      <div className="text-sm text-gray-500 mt-1">
                        {formatDuration(total)} total ·{" "}
                        {template.mode === "REPEATING"
                          ? `${template.repeatCount ?? "∞"} cycles`
                          : "run once"}
                      </div>
                    </div>
                    <Badge variant="secondary">
                      {template.mode === "SESSION" ? "Session" : "Repeating"}
                    </Badge>
                  </div>

                  <div className="space-y-2 mb-4">
                    {template.segments.map((seg, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div
                          className="w-3 h-3 rounded-full flex-shrink-0"
                          style={{ backgroundColor: seg.color }}
                        />
                        <span className="text-sm text-gray-700">{seg.name}</span>
                        <span className="text-sm text-gray-400 ml-auto">
                          {formatDuration(seg.durationSeconds)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Link href="/app/timer">
                    <Button size="sm">Use This Template</Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>

      <footer className="border-t bg-gray-50 py-8 px-4 text-center text-sm text-gray-500">
        <Link href="/">← Back to SessionTimer</Link>
      </footer>
    </div>
  );
}
