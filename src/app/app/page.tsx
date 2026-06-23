import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { FREE_PRESET_LIMIT, ensureSubscription, hasProAccess } from "@/lib/billing";
import { STARTER_TEMPLATES } from "@/lib/templates";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type DashboardPreset = {
  id: string;
  name: string;
  mode: string;
  repeatCount: number | null;
  segments: { id: string; presetId: string; name: string; durationSeconds: number; color: string; position: number }[];
};

export default async function DashboardPage() {
  const session = await auth();
  const userId = session?.user?.id;
  const isSignedIn = Boolean(userId);
  let presets: DashboardPreset[] = [];
  let subscription: Awaited<ReturnType<typeof ensureSubscription>> | null = null;
  let pro = false;

  if (userId) {
    [presets, subscription, pro] = await Promise.all([
      prisma.preset.findMany({
        where: { userId, isTemplate: false },
        include: { segments: { orderBy: { position: "asc" } } },
        orderBy: { updatedAt: "desc" },
        take: 4,
      }),
      ensureSubscription(userId),
      hasProAccess(userId),
    ]);
  }

  const remaining = Math.max(0, FREE_PRESET_LIMIT - presets.length);

  return (
    <div className="mx-auto max-w-6xl p-4 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Badge variant="secondary" className="mb-3">
            {isSignedIn ? `${pro ? "Pro" : "Free"} workspace` : "Guest mode"}
          </Badge>
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-950">Run a visible session timer</h1>
          <p className="mt-2 max-w-2xl text-zinc-600">
            Build named segments, repeat routines, and launch a display large enough for a room.
          </p>
        </div>
        <Button asChild size="lg">
          <Link href="/app/timer">Build timer</Link>
        </Button>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <Metric title="Saved presets" value={isSignedIn ? presets.length.toString() : "Local"} detail={pro ? "Unlimited on Pro" : `${remaining} cloud slots remaining`} />
        <Metric title="Starter templates" value={STARTER_TEMPLATES.length.toString()} detail="Presentation, class, workout, laundry, study" />
        <Metric title="Display mode" value="Large" detail="Fullscreen timer with progress and next segment" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
        <Card>
          <CardHeader>
            <CardTitle>Recent presets</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {presets.map((preset) => (
              <div key={preset.id} className="flex items-center justify-between rounded-md border p-3">
                <div>
                  <div className="font-medium">{preset.name}</div>
                  <div className="text-sm text-zinc-500">
                    {preset.mode === "REPEATING" ? `Repeats ${preset.repeatCount ?? "forever"} cycles · ` : "Session · "}
                    {preset.segments.length} segments
                  </div>
                </div>
                <Badge variant="secondary">{preset.mode === "SESSION" ? "Session" : "Repeating"}</Badge>
              </div>
            ))}
            {!presets.length ? (
              <div className="rounded-md border border-dashed p-6 text-center text-sm text-zinc-600">
                {isSignedIn ? "Saved presets will appear here." : "Guest presets are stored locally on this device."}
              </div>
            ) : null}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button asChild className="w-full justify-start">
              <Link href="/app/timer">Create a timer</Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start">
              <Link href="/app/presets">Open presets and templates</Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start">
              <Link href="/app/settings">Sound and speech settings</Link>
            </Button>
            {!pro ? (
              <div className="rounded-md bg-blue-50 p-3 text-sm text-blue-950">
                Free accounts can save {FREE_PRESET_LIMIT} presets. Pro unlocks unlimited presets and spoken transitions.
              </div>
            ) : (
              <div className="rounded-md bg-emerald-50 p-3 text-sm text-emerald-950">
                {subscription?.status === "active" ? "Your Pro subscription is active." : "Pro access is available."}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Metric({ title, value, detail }: { title: string; value: string; detail: string }) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="text-sm text-zinc-500">{title}</div>
        <div className="mt-2 text-2xl font-semibold">{value}</div>
        <div className="mt-1 text-xs text-zinc-500">{detail}</div>
      </CardContent>
    </Card>
  );
}
