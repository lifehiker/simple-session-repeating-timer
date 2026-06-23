"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useTimerStore } from "@/stores/timer-store";
import { STARTER_TEMPLATES } from "@/lib/templates";
import { PresetInput } from "@/types/timer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ModeToggle } from "./mode-toggle";
import { SegmentList } from "./segment-list";
import { RepeatCountInput } from "./repeat-count-input";
import { toast } from "sonner";
import { trackEvent } from "@/lib/analytics";
import { Play } from "lucide-react";

const GUEST_PRESETS_KEY = "ssrt_guest_presets";

function getGuestPresets(): PresetInput[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(GUEST_PRESETS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveGuestPreset(preset: PresetInput) {
  const existing = getGuestPresets();
  const withName = existing.filter((p) => p.name !== preset.name);
  const updated = [preset, ...withName].slice(0, 3);
  localStorage.setItem(GUEST_PRESETS_KEY, JSON.stringify(updated));
}

interface TimerBuilderProps {
  initialPreset?: PresetInput;
}

export function TimerBuilder({ initialPreset }: TimerBuilderProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const { builderDraft, setBuilderDraft, loadPresetToDraft, startTimer } = useTimerStore();
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (initialPreset) loadPresetToDraft(initialPreset);
  }, [initialPreset, loadPresetToDraft]);

  const currentDraft = builderDraft;

  function handleLoadTemplate(template: PresetInput) {
    loadPresetToDraft(template);
    trackEvent("template_used", { template: template.name });
  }

  async function handleStart() {
    if (currentDraft.segments.length === 0) {
      toast.error("Add at least one segment");
      return;
    }
    startTimer(currentDraft);
    trackEvent("timer_started", { mode: currentDraft.mode, segments: currentDraft.segments.length });
    router.push("/app/timer/run");
  }

  async function handleSave() {
    if (!currentDraft.name.trim()) {
      toast.error("Please enter a preset name");
      return;
    }

    if (!session?.user) {
      // Guest save
      const guestPresets = getGuestPresets();
      const replacingExisting = guestPresets.some((preset) => preset.name === currentDraft.name);
      if (guestPresets.length >= 3 && !replacingExisting) {
        toast.error("Free limit: 3 saved presets. Sign up for more!");
        return;
      }
      saveGuestPreset(currentDraft);
      toast.success("Saved locally (guest mode)");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/presets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentDraft),
      });
      const data = await res.json();

      if (!res.ok) {
        if (data.code === "PRESET_LIMIT") {
          toast.error("Preset limit reached. Upgrade to Pro for unlimited presets.", {
            action: { label: "Upgrade", onClick: () => router.push("/pricing") },
          });
        } else {
          toast.error(data.error ?? "Failed to save preset");
        }
        return;
      }

      trackEvent("preset_created", { mode: currentDraft.mode });
      toast.success("Preset saved!");
    } catch {
      toast.error("Failed to save preset");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Starter Templates */}
      <div>
        <Label className="text-sm text-gray-500 mb-2 block">Quick start with a template</Label>
        <div className="flex gap-2 flex-wrap">
          {STARTER_TEMPLATES.map((t) => (
            <Button
              key={t.name}
              type="button"
              variant="outline"
              size="sm"
              onClick={() => handleLoadTemplate(t)}
              className="text-xs"
            >
              {t.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Timer Name */}
      <div className="space-y-2">
        <Label htmlFor="preset-name">Timer name</Label>
        <Input
          id="preset-name"
          placeholder="My Timer"
          value={currentDraft.name}
          onChange={(e) => setBuilderDraft({ name: e.target.value })}
        />
      </div>

      {/* Mode Toggle */}
      <div className="space-y-2">
        <Label>Mode</Label>
        <ModeToggle
          mode={currentDraft.mode}
          onChange={(mode) => setBuilderDraft({ mode })}
        />
        <p className="text-xs text-gray-500">
          {currentDraft.mode === "SESSION"
            ? "Session: run segments once in order"
            : "Repeating: repeat segments for N cycles"}
        </p>
      </div>

      {/* Repeat Count */}
      {currentDraft.mode === "REPEATING" && (
        <RepeatCountInput
          value={currentDraft.repeatCount ?? 0}
          onChange={(repeatCount) => setBuilderDraft({ repeatCount })}
        />
      )}

      {/* Segments */}
      <div className="space-y-2">
        <Label>Segments</Label>
        <SegmentList
          segments={currentDraft.segments}
          onChange={(segments) => setBuilderDraft({ segments })}
        />
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <Button onClick={handleStart} className="flex-1">
          <Play className="size-4" />
          Start Timer
        </Button>
        <Button variant="outline" onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : "Save Preset"}
        </Button>
      </div>
    </div>
  );
}
