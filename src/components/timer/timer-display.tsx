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
      className="flex min-h-[62vh] flex-col items-center justify-center rounded-lg p-5 text-center text-white transition-colors duration-1000 sm:min-h-[68vh] sm:p-8"
      style={{ backgroundColor: bgColor }}
    >
      {/* Cycle indicator */}
      {mode === "REPEATING" && (
        <div className="mb-2 text-base font-medium opacity-80 sm:text-lg">
          Cycle {currentCycle}{totalCycles > 0 ? ` of ${totalCycles}` : " (∞)"}
        </div>
      )}

      {/* Preset name */}
      {runningState.presetName && (
        <div className="mb-4 max-w-full truncate text-sm opacity-70">{runningState.presetName}</div>
      )}

      {/* Main countdown */}
      <div className="w-full font-mono text-[clamp(4.5rem,28vw,12rem)] font-bold leading-none tabular-nums drop-shadow-lg">
        {formatTime(remainingSeconds)}
      </div>

      {/* Current segment */}
      <div className="mt-6 max-w-full text-balance break-words text-2xl font-semibold opacity-95 sm:text-4xl">
        {currentSegment?.name ?? ""}
      </div>

      {/* Progress bar */}
      <div className="mt-8 h-2 w-full max-w-lg rounded-full bg-white/20">
        <div
          className="h-2 rounded-full bg-white transition-all duration-1000"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      {/* Next segment */}
      {nextSegment && (
        <div className="mt-4 max-w-full truncate text-sm opacity-75">
          Next: {nextSegment.name}
          {mode === "REPEATING" && currentSegmentIndex === segments.length - 1
            ? " (next cycle)"
            : ""}
        </div>
      )}
    </div>
  );
}
