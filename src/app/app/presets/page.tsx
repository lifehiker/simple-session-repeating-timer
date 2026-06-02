"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTimerStore } from "@/stores/timer-store";
import { STARTER_TEMPLATES } from "@/lib/templates";
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
  mode: string;
  repeatCount: number | null;
  segments: { durationSeconds: number; name: string; color: string; position: number }[];
}

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  if (m >= 60) return `${Math.floor(m / 60)}h ${m % 60}m`;
  const s = seconds % 60;
  if (m > 0) return `${m}m${s > 0 ? ` ${s}s` : ""}`;
  return `${s}s`;
}

function getTotalDuration(segments: { durationSeconds: number }[]): number {
  return segments.reduce((sum, s) => sum + s.durationSeconds, 0);
}

export default function PresetsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { loadPresetToDraft, startTimer } = useTimerStore();

  const [presets, setPresets] = useState<ApiPreset[]>([]);
  const [guestPresets, setGuestPresets] = useState<PresetInput[]>([]);
  const [loading, setLoading] = useState(true);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    if (status === "loading") return;

    if (session?.user) {
      fetch("/api/presets")
        .then((r) => r.json())
        .then((data) => {
          setPresets(Array.isArray(data) ? data : []);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } else {
      try {
        const data = localStorage.getItem(GUEST_PRESETS_KEY);
        setGuestPresets(data ? JSON.parse(data) : []);
      } catch {
        setGuestPresets([]);
      }
      setLoading(false);
    }
  }, [session, status]);

  function handleRunPreset(preset: ApiPreset | PresetInput) {
    if ("id" in preset) {
      startTimer({
        name: preset.name,
        mode: preset.mode as "SESSION" | "REPEATING",
        repeatCount: preset.repeatCount ?? undefined,
        segments: preset.segments.map((s, i) => ({ ...s, position: i })),
      });
    } else {
      startTimer(preset);
    }
    router.push("/app/timer/run");
  }

  function handleLoadTemplate(template: PresetInput) {
    loadPresetToDraft(template);
    router.push("/app/timer");
    toast.success(`Loaded template: ${template.name}`);
  }

  async function handleDelete(id: string) {
    setDeleting(id);
    try {
      const res = await fetch(`/api/presets/${id}`, { method: "DELETE" });
      if (res.ok) {
        setPresets((prev) => prev.filter((p) => p.id !== id));
        toast.success("Preset deleted");
      } else {
        toast.error("Failed to delete preset");
      }
    } catch {
      toast.error("Failed to delete preset");
    } finally {
      setDeleting(null);
    }
  }

  function handleGuestDelete(index: number) {
    const updated = guestPresets.filter((_, i) => i !== index);
    setGuestPresets(updated);
    localStorage.setItem(GUEST_PRESETS_KEY, JSON.stringify(updated));
    toast.success("Preset deleted");
  }

  const presetCount = session?.user ? presets.length : guestPresets.length;
  const isAtLimit = !session?.user ? presetCount >= FREE_PRESET_LIMIT : false;

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-gray-100 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Saved Presets</h1>
          <p className="text-gray-500 mt-1 text-sm">
            {session?.user
              ? `${presets.length} preset${presets.length !== 1 ? "s" : ""} saved`
              : `${guestPresets.length} / ${FREE_PRESET_LIMIT} guest presets`}
          </p>
        </div>
        <Link href="/app/timer">
          <Button>+ New Timer</Button>
        </Link>
      </div>

      {/* Free tier indicator */}
      {!session?.user && (
        <Card className="mb-4 bg-amber-50 border-amber-200">
          <CardContent className="py-3 flex items-center justify-between">
            <span className="text-sm text-amber-800">
              Guest presets: {guestPresets.length}/{FREE_PRESET_LIMIT} used
            </span>
            {isAtLimit && (
              <Button size="sm" onClick={() => setShowUpgrade(true)}>
                Upgrade
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      {/* User presets */}
      {session?.user && presets.length > 0 && (
        <div className="space-y-2 mb-8">
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">Your Presets</h2>
          {presets.map((preset) => (
            <div
              key={preset.id}
              className="flex items-center gap-4 p-4 border rounded-lg bg-white hover:border-gray-300"
            >
              <div className="flex-1 min-w-0">
                <div className="font-medium text-gray-900 truncate">{preset.name}</div>
                <div className="text-sm text-gray-500">
                  {preset.mode === "REPEATING" ? `×${preset.repeatCount ?? "∞"} · ` : ""}
                  {preset.segments.length} segments ·{" "}
                  {formatDuration(getTotalDuration(preset.segments))}
                </div>
              </div>
              <Badge variant="secondary" className="text-xs">
                {preset.mode === "SESSION" ? "Session" : "Repeating"}
              </Badge>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => handleRunPreset(preset)}
                >
                  Run
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    loadPresetToDraft({
                      name: preset.name,
                      mode: preset.mode as "SESSION" | "REPEATING",
                      repeatCount: preset.repeatCount ?? undefined,
                      segments: preset.segments,
                    });
                    router.push("/app/timer");
                  }}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleDelete(preset.id)}
                  disabled={deleting === preset.id}
                  className="text-red-400 hover:text-red-600"
                >
                  {deleting === preset.id ? "..." : "Delete"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Guest presets */}
      {!session?.user && guestPresets.length > 0 && (
        <div className="space-y-2 mb-8">
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">Your Presets (Local)</h2>
          {guestPresets.map((preset, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-4 border rounded-lg bg-white"
            >
              <div className="flex-1 min-w-0">
                <div className="font-medium text-gray-900 truncate">{preset.name}</div>
                <div className="text-sm text-gray-500">
                  {preset.segments.length} segments
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" onClick={() => handleRunPreset(preset)}>Run</Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleGuestDelete(index)}
                  className="text-red-400"
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty state */}
      {presetCount === 0 && (
        <div className="text-center py-12 text-gray-500">
          <div className="text-5xl mb-4">📋</div>
          <p className="mb-4">No saved presets yet.</p>
          <Link href="/app/timer">
            <Button variant="outline">Build Your First Timer</Button>
          </Link>
        </div>
      )}

      {/* Starter Templates */}
      <div>
        <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">Starter Templates</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {STARTER_TEMPLATES.map((template) => (
            <Card key={template.name} className="hover:border-blue-300 hover:shadow-sm transition-all">
              <CardContent className="pt-4 pb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium text-gray-900 text-sm">{template.name}</div>
                  <Badge variant="secondary" className="text-xs">
                    {template.mode === "SESSION" ? "Session" : `×${template.repeatCount ?? "∞"}`}
                  </Badge>
                </div>
                <div className="text-xs text-gray-500 mb-3">
                  {template.segments.map((s) => s.name).join(" → ")}
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs"
                    onClick={() => handleRunPreset(template)}
                  >
                    Run
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-xs"
                    onClick={() => handleLoadTemplate(template)}
                  >
                    Customize
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <UpgradeModal
        open={showUpgrade}
        onClose={() => setShowUpgrade(false)}
        reason="You've used all 3 guest preset slots. Create a free account for more."
      />
    </div>
  );
}
