"use client";

import { useState } from "react";
import { SegmentInput } from "@/types/timer";
import { Button } from "@/components/ui/button";
import { SegmentForm } from "./segment-form";

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  if (m > 0 && s > 0) return `${m}m ${s}s`;
  if (m > 0) return `${m}m`;
  return `${s}s`;
}

interface SegmentListProps {
  segments: SegmentInput[];
  onChange: (segments: SegmentInput[]) => void;
}

export function SegmentList({ segments, onChange }: SegmentListProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [addingNew, setAddingNew] = useState(false);

  function addSegment(segment: Omit<SegmentInput, "position">) {
    const newSegments = [
      ...segments,
      { ...segment, position: segments.length },
    ];
    onChange(newSegments);
    setAddingNew(false);
  }

  function updateSegment(index: number, segment: Omit<SegmentInput, "position">) {
    const newSegments = segments.map((s, i) =>
      i === index ? { ...s, ...segment } : s
    );
    onChange(newSegments);
    setEditingIndex(null);
  }

  function removeSegment(index: number) {
    const newSegments = segments
      .filter((_, i) => i !== index)
      .map((s, i) => ({ ...s, position: i }));
    onChange(newSegments);
  }

  function moveUp(index: number) {
    if (index === 0) return;
    const newSegments = [...segments];
    [newSegments[index - 1], newSegments[index]] = [
      newSegments[index],
      newSegments[index - 1],
    ];
    onChange(newSegments.map((s, i) => ({ ...s, position: i })));
  }

  function moveDown(index: number) {
    if (index === segments.length - 1) return;
    const newSegments = [...segments];
    [newSegments[index], newSegments[index + 1]] = [
      newSegments[index + 1],
      newSegments[index],
    ];
    onChange(newSegments.map((s, i) => ({ ...s, position: i })));
  }

  return (
    <div className="space-y-3">
      {segments.map((segment, index) => (
        <div key={index}>
          {editingIndex === index ? (
            <SegmentForm
              initial={segment}
              onSave={(s) => updateSegment(index, s)}
              onCancel={() => setEditingIndex(null)}
            />
          ) : (
            <div className="flex items-center gap-3 p-3 border rounded-lg bg-white hover:border-gray-300 transition-colors">
              <div
                className="w-4 h-10 rounded-sm flex-shrink-0"
                style={{ backgroundColor: segment.color ?? "#3b82f6" }}
              />
              <div className="flex-1 min-w-0">
                <div className="font-medium text-gray-900 truncate">{segment.name}</div>
                <div className="text-sm text-gray-500">{formatDuration(segment.durationSeconds)}</div>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => moveUp(index)}
                  disabled={index === 0}
                  className="h-7 w-7 p-0 text-gray-400"
                >
                  ↑
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => moveDown(index)}
                  disabled={index === segments.length - 1}
                  className="h-7 w-7 p-0 text-gray-400"
                >
                  ↓
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setEditingIndex(index)}
                  className="h-7 px-2 text-xs text-gray-500"
                >
                  Edit
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeSegment(index)}
                  className="h-7 px-2 text-xs text-red-400 hover:text-red-600"
                  disabled={segments.length === 1}
                >
                  Remove
                </Button>
              </div>
            </div>
          )}
        </div>
      ))}

      {addingNew && (
        <SegmentForm
          onSave={addSegment}
          onCancel={() => setAddingNew(false)}
        />
      )}

      {!addingNew && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setAddingNew(true)}
          className="w-full border-dashed"
        >
          + Add Segment
        </Button>
      )}
    </div>
  );
}
