"use client";

import { useTimerStore } from "@/stores/timer-store";

function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  if (h > 0) {
    return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  }
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function TimerDisplay() {
  const { runningState } = useTimerStore();

  if (!runningState) return null;

  const { segments, currentSegmentIndex, remainingSeconds, currentCycle, totalCycles, mode } =
    runningState;

  const currentSegment = segments[currentSegmentIndex];
  const nextSegment = segments[currentSegmentIndex + 1] ?? (
    mode === "REPEATING" ? segments[0] : undefined
  );

  const totalSeconds = currentSegment?.durationSeconds ?? 1;
  const progress = Math.max(0, Math.min(1, 1 - remainingSeconds / totalSeconds));
  const bgColor = currentSegment?.color ?? "#3b82f6";

  return (
    <div
      className="flex flex-col items-center justify-center min-h-[60vh] rounded-2xl text-white p-8 transition-colors duration-1000"
      style={{ backgroundColor: bgColor }}
    >
      {/* Cycle indicator */}
      {mode === "REPEATING" && (
        <div className="text-lg font-medium opacity-80 mb-2">
          Cycle {currentCycle}{totalCycles > 0 ? ` of ${totalCycles}` : " (∞)"}
        </div>
      )}

      {/* Preset name */}
      {runningState.presetName && (
        <div className="text-sm opacity-60 mb-4">{runningState.presetName}</div>
      )}

      {/* Main countdown */}
      <div className="text-[10rem] md:text-[12rem] font-mono font-bold leading-none tabular-nums drop-shadow-lg">
        {formatTime(remainingSeconds)}
      </div>

      {/* Current segment */}
      <div className="text-3xl md:text-4xl font-semibold mt-6 opacity-95">
        {currentSegment?.name ?? ""}
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-lg mt-8 bg-white/20 rounded-full h-2">
        <div
          className="bg-white h-2 rounded-full transition-all duration-1000"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      {/* Next segment */}
      {nextSegment && (
        <div className="mt-4 text-sm opacity-70">
          Next: {nextSegment.name}
          {mode === "REPEATING" && currentSegmentIndex === segments.length - 1
            ? " (next cycle)"
            : ""}
        </div>
      )}
    </div>
  );
}
