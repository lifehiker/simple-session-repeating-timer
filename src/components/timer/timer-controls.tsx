"use client";

import { useTimerStore } from "@/stores/timer-store";
import { Button } from "@/components/ui/button";

export function TimerControls() {
  const { runningState, startTimer, pauseTimer, resumeTimer, skipSegment, prevSegment, restartTimer } =
    useTimerStore();

  if (!runningState) return null;

  const { status } = runningState;

  function handlePlayPause() {
    if (status === "idle") {
      // Re-start using current preset data
      startTimer({
        name: runningState!.presetName ?? "Timer",
        mode: runningState!.mode,
        segments: runningState!.segments.map((s, i) => ({ ...s, position: i })),
        repeatCount: runningState!.totalCycles,
      });
    } else if (status === "running") {
      pauseTimer();
    } else if (status === "paused") {
      resumeTimer();
    }
  }

  const isCompleted = status === "completed";

  return (
    <div className="flex items-center justify-center gap-4 mt-6">
      <Button
        variant="outline"
        size="lg"
        onClick={() => prevSegment()}
        disabled={isCompleted}
        className="h-14 w-14 rounded-full p-0 text-xl"
        title="Previous segment"
      >
        ⏮
      </Button>

      <Button
        variant="outline"
        size="lg"
        onClick={restartTimer}
        className="h-12 w-12 rounded-full p-0 text-lg"
        title="Restart"
      >
        ↺
      </Button>

      <Button
        size="lg"
        onClick={handlePlayPause}
        disabled={isCompleted}
        className="h-16 w-16 rounded-full p-0 text-2xl shadow-lg"
        title={status === "running" ? "Pause" : "Play"}
      >
        {status === "running" ? "⏸" : "▶"}
      </Button>

      <Button
        variant="outline"
        size="lg"
        onClick={() => skipSegment()}
        disabled={isCompleted}
        className="h-12 w-12 rounded-full p-0 text-lg"
        title="Skip segment"
      >
        ⏭
      </Button>
    </div>
  );
}
