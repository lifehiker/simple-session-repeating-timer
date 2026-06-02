"use client";

import { useState } from "react";
import { SegmentInput } from "@/types/timer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const SEGMENT_COLORS = [
  "#3b82f6", // blue
  "#ef4444", // red
  "#10b981", // green
  "#f59e0b", // yellow
  "#8b5cf6", // purple
  "#f97316", // orange
  "#06b6d4", // cyan
  "#ec4899", // pink
];

interface SegmentFormProps {
  initial?: Partial<SegmentInput>;
  onSave: (segment: Omit<SegmentInput, "position">) => void;
  onCancel: () => void;
}

function secondsToMinsSecs(seconds: number): { mins: number; secs: number } {
  return { mins: Math.floor(seconds / 60), secs: seconds % 60 };
}

function minsSecsToSeconds(mins: number, secs: number): number {
  return mins * 60 + secs;
}

export function SegmentForm({ initial, onSave, onCancel }: SegmentFormProps) {
  const initial_duration = secondsToMinsSecs(initial?.durationSeconds ?? 5 * 60);
  const [name, setName] = useState(initial?.name ?? "");
  const [mins, setMins] = useState(initial_duration.mins);
  const [secs, setSecs] = useState(initial_duration.secs);
  const [color, setColor] = useState(initial?.color ?? SEGMENT_COLORS[0]);

  function handleSave() {
    if (!name.trim()) return;
    const durationSeconds = minsSecsToSeconds(mins, secs);
    if (durationSeconds < 1) return;
    onSave({ id: initial?.id, name: name.trim(), durationSeconds, color });
  }

  return (
    <div className="space-y-4 p-4 border rounded-lg bg-white">
      <div className="space-y-2">
        <Label>Segment name</Label>
        <Input
          placeholder="e.g. Introduction, Work, Rest..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
        />
      </div>

      <div className="space-y-2">
        <Label>Duration</Label>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Input
              type="number"
              min={0}
              max={1440}
              value={mins}
              onChange={(e) => setMins(Math.max(0, parseInt(e.target.value, 10) || 0))}
              className="w-16 text-center"
            />
            <span className="text-sm text-gray-500">min</span>
          </div>
          <div className="flex items-center gap-1">
            <Input
              type="number"
              min={0}
              max={59}
              value={secs}
              onChange={(e) => setSecs(Math.min(59, Math.max(0, parseInt(e.target.value, 10) || 0)))}
              className="w-16 text-center"
            />
            <span className="text-sm text-gray-500">sec</span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Color</Label>
        <div className="flex gap-2 flex-wrap">
          {SEGMENT_COLORS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setColor(c)}
              className={`w-8 h-8 rounded-full transition-transform ${
                color === c ? "ring-2 ring-offset-2 ring-gray-400 scale-110" : ""
              }`}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
      </div>

      <div className="flex gap-2 pt-2">
        <Button onClick={handleSave} size="sm" disabled={!name.trim() || minsSecsToSeconds(mins, secs) < 1}>
          Save
        </Button>
        <Button variant="ghost" size="sm" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
