import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { STARTER_TEMPLATES } from "@/lib/templates";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard – SessionTimer",
};

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  if (m >= 60) return `${Math.floor(m / 60)}h ${m % 60}m`;
  if (m > 0 && s > 0) return `${m}m ${s}s`;
  if (m > 0) return `${m}m`;
  return `${s}s`;
}

function getTotalDuration(segments: { durationSeconds: number }[]): number {
  return segments.reduce((sum, s) => sum + s.durationSeconds, 0);
}

export default async function AppDashboard() {
  const session = await auth();

  let userPresets: {
    id: string;
    name: string;
    mode: string;
    repeatCount: number | null;
    segments: { durationSeconds: number }[];
  }[] = [];

  if (session?.user?.id) {
    userPresets = await prisma.preset.findMany({
      where: { userId: session.user.id },
      include: { segments: true },
      orderBy: { updatedAt: "desc" },
      take: 5,
    });
  }

  return (
    <div className="p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          {session?.user ? `Welcome back, ${session.user.name?.split(" ")[0] ?? "there"}!` : "Welcome to SessionTimer"}
        </h1>
        <p className="text-gray-500 mt-1">
          {session?.user ? "Pick up where you left off or start something new." : "Build and run timers without signing up."}
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        <Link href="/app/timer">
          <Card className="hover:border-blue-300 hover:shadow-md transition-all cursor-pointer h-full">
            <CardContent className="pt-6">
              <div className="text-3xl mb-3">⏱️</div>
              <div className="font-semibold text-gray-900 mb-1">New Timer</div>
              <div className="text-sm text-gray-500">Build a custom timer with named segments</div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/app/presets">
          <Card className="hover:border-blue-300 hover:shadow-md transition-all cursor-pointer h-full">
            <CardContent className="pt-6">
              <div className="text-3xl mb-3">📋</div>
              <div className="font-semibold text-gray-900 mb-1">My Presets</div>
              <div className="text-sm text-gray-500">
                {session?.user
                  ? `${userPresets.length} saved preset${userPresets.length !== 1 ? "s" : ""}`
                  : "Save your favorite timers"}
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Recent Presets (logged in users) */}
      {session?.user && userPresets.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900">Recent Presets</h2>
            <Link href="/app/presets" className="text-sm text-blue-600 hover:underline">
              View all
            </Link>
          </div>
          <div className="space-y-2">
            {userPresets.map((preset) => (
              <div
                key={preset.id}
                className="flex items-center gap-4 p-3 border rounded-lg bg-white hover:border-gray-300 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-900 truncate">{preset.name}</div>
                  <div className="text-sm text-gray-500">
                    {preset.mode === "REPEATING" ? `${preset.repeatCount ?? "∞"} cycles · ` : ""}
                    {preset.segments.length} segment{preset.segments.length !== 1 ? "s" : ""} ·{" "}
                    {formatDuration(getTotalDuration(preset.segments))}
                  </div>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {preset.mode === "SESSION" ? "Session" : "Repeating"}
                </Badge>
                <Link href="/app/timer">
                  <Button size="sm" variant="outline">Run</Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Guest prompt */}
      {!session?.user && (
        <Card className="mb-8 bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <h3 className="font-semibold text-gray-900 mb-2">Save your timers across devices</h3>
            <p className="text-sm text-gray-600 mb-4">
              Create a free account to save up to 3 presets and access them anywhere.
            </p>
            <div className="flex gap-3">
              <Link href="/signup">
                <Button size="sm">Create Free Account</Button>
              </Link>
              <Link href="/login">
                <Button size="sm" variant="outline">Sign In</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Starter Templates */}
      <div>
        <h2 className="font-semibold text-gray-900 mb-4">Starter Templates</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {STARTER_TEMPLATES.map((template) => (
            <Card key={template.name} className="hover:border-blue-300 hover:shadow-sm transition-all">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-semibold">{template.name}</CardTitle>
                  <Badge variant="secondary" className="text-xs">
                    {template.mode === "SESSION" ? "Session" : `Repeating ×${template.repeatCount ?? "∞"}`}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="text-xs text-gray-500 mb-3">
                  {template.segments.map((s) => s.name).join(" → ")}
                </div>
                <Link href="/app/timer">
                  <Button size="sm" variant="outline" className="text-xs">
                    Use Template
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
