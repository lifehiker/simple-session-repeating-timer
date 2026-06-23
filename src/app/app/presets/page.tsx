"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { STARTER_TEMPLATES } from "@/lib/templates";
import { useTimerStore } from "@/stores/timer-store";
import { PresetInput } from "@/types/timer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { UpgradeModal } from "@/components/billing/upgrade-modal";
import { toast } from "sonner";

const FREE_PRESET_LIMIT = 3;
const GUEST_PRESETS_KEY = "ssrt_guest_presets";

interface ApiPreset {
  id: string;
  name: string;
  mode: "SESSION" | "REPEATING";
  repeatCount: number | null;
  segments: { name: string; durationSeconds: number; color?: string; position: number }[];
}

function formatDuration(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  if (minutes >= 60) return `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
  if (minutes > 0) return `${minutes}m${rest ? ` ${rest}s` : ""}`;
  return `${rest}s`;
}

function totalDuration(segments: { durationSeconds: number }[]) {
  return segments.reduce((total, segment) => total + segment.durationSeconds, 0);
}

function readGuestPresets(): PresetInput[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(GUEST_PRESETS_KEY) ?? "[]");
  } catch {
    return [];
  }
}

export default function PresetsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { loadPresetToDraft, startTimer } = useTimerStore();
  const [presets, setPresets] = useState<ApiPreset[]>([]);
  const [guestPresets, setGuestPresets] = useState<PresetInput[]>([]);
  const [fetchingPresets, setFetchingPresets] = useState(false);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    if (status === "loading") return;
    if (session?.user) {
      Promise.resolve()
        .then(() => setFetchingPresets(true));
      fetch("/api/presets")
        .then((response) => response.json())
        .then((data) => setPresets(Array.isArray(data) ? data : []))
        .finally(() => setFetchingPresets(false));
      return;
    }
    setGuestPresets(readGuestPresets());
  }, [session, status]);

  function runPreset(preset: ApiPreset | PresetInput) {
    startTimer({
      name: preset.name,
      mode: preset.mode,
      repeatCount: "repeatCount" in preset ? preset.repeatCount ?? undefined : undefined,
      segments: preset.segments.map((segment, index) => ({ ...segment, position: index })),
    });
    router.push("/app/timer/run");
  }

  function customizePreset(preset: ApiPreset | PresetInput) {
    loadPresetToDraft({
      name: preset.name,
      mode: preset.mode,
      repeatCount: "repeatCount" in preset ? preset.repeatCount ?? undefined : undefined,
      segments: preset.segments.map((segment, index) => ({ ...segment, position: index })),
    });
    router.push("/app/timer");
  }

  async function deletePreset(id: string) {
    setDeleting(id);
    try {
      const response = await fetch(`/api/presets/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Delete failed");
      setPresets((current) => current.filter((preset) => preset.id !== id));
      toast.success("Preset deleted");
    } catch {
      toast.error("Could not delete preset");
    } finally {
      setDeleting(null);
    }
  }

  function deleteGuestPreset(index: number) {
    const updated = guestPresets.filter((_, itemIndex) => itemIndex !== index);
    setGuestPresets(updated);
    localStorage.setItem(GUEST_PRESETS_KEY, JSON.stringify(updated));
    toast.success("Preset deleted");
  }

  const activePresets = session?.user ? presets : guestPresets;
  const loading = status === "loading" || fetchingPresets;

  return (
    <div className="mx-auto max-w-5xl p-4 sm:p-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-950">Presets and templates</h1>
          <p className="mt-2 text-zinc-600">
            {session?.user ? `${presets.length} saved presets` : `${guestPresets.length}/${FREE_PRESET_LIMIT} guest preset slots used`}
          </p>
        </div>
        <Button asChild>
          <Link href="/app/timer">New timer</Link>
        </Button>
      </div>

      {!session?.user ? (
        <Card className="mb-5 border-amber-200 bg-amber-50">
          <CardContent className="flex flex-col gap-3 p-4 text-sm text-amber-950 sm:flex-row sm:items-center sm:justify-between">
            <span>Guest presets stay on this device. Create an account to save across devices.</span>
            {guestPresets.length >= FREE_PRESET_LIMIT ? <Button size="sm" onClick={() => setShowUpgrade(true)}>Upgrade</Button> : null}
          </CardContent>
        </Card>
      ) : null}

      {loading ? (
        <div className="grid gap-3">
          {[1, 2, 3].map((item) => <div key={item} className="h-20 animate-pulse rounded-md bg-zinc-100" />)}
        </div>
      ) : activePresets.length ? (
        <div className="mb-8 space-y-3">
          <h2 className="text-sm font-medium uppercase tracking-wide text-zinc-500">Your presets</h2>
          {activePresets.map((preset, index) => (
            <div key={"id" in preset ? preset.id : `${preset.name}-${index}`} className="flex flex-col gap-3 rounded-md border bg-white p-4 sm:flex-row sm:items-center">
              <div className="min-w-0 flex-1">
                <div className="truncate font-medium">{preset.name}</div>
                <div className="text-sm text-zinc-500">
                  {preset.mode === "REPEATING" ? `Repeating ${"repeatCount" in preset ? preset.repeatCount ?? "forever" : "forever"} · ` : "Session · "}
                  {preset.segments.length} segments · {formatDuration(totalDuration(preset.segments))}
                </div>
              </div>
              <Badge variant="secondary">{preset.mode === "SESSION" ? "Session" : "Repeating"}</Badge>
              <div className="flex flex-wrap gap-2">
                <Button size="sm" onClick={() => runPreset(preset)}>Run</Button>
                <Button size="sm" variant="outline" onClick={() => customizePreset(preset)}>Edit</Button>
                {"id" in preset ? (
                  <Button size="sm" variant="ghost" disabled={deleting === preset.id} onClick={() => deletePreset(preset.id)}>
                    {deleting === preset.id ? "Deleting..." : "Delete"}
                  </Button>
                ) : (
                  <Button size="sm" variant="ghost" onClick={() => deleteGuestPreset(index)}>Delete</Button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mb-8 rounded-md border border-dashed p-8 text-center text-zinc-600">
          No saved presets yet.
        </div>
      )}

      <section>
        <h2 className="text-sm font-medium uppercase tracking-wide text-zinc-500">Starter templates</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {STARTER_TEMPLATES.map((template) => (
            <Card key={template.name}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="font-medium">{template.name}</div>
                  <Badge variant="secondary">{template.mode === "SESSION" ? "Session" : `${template.repeatCount ?? "∞"} cycles`}</Badge>
                </div>
                <p className="mt-2 text-sm text-zinc-500">{template.segments.map((segment) => segment.name).join(" -> ")}</p>
                <div className="mt-4 flex gap-2">
                  <Button size="sm" onClick={() => runPreset(template)}>Run</Button>
                  <Button size="sm" variant="outline" onClick={() => customizePreset(template)}>Customize</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <UpgradeModal open={showUpgrade} onClose={() => setShowUpgrade(false)} reason="Guest mode includes three local preset slots. Pro unlocks unlimited saved presets." />
    </div>
  );
}
