"use client";

import { useTimerStore } from "@/stores/timer-store";
import { Button } from "@/components/ui/button";
import { Pause, Play, RotateCcw, SkipBack, SkipForward } from "lucide-react";

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
    <div className="mt-6 flex items-center justify-center gap-3 sm:gap-4">
      <Button
        variant="outline"
        size="lg"
        onClick={() => prevSegment()}
        disabled={isCompleted}
        className="h-12 w-12 rounded-full p-0 sm:h-14 sm:w-14"
        title="Previous segment"
        aria-label="Previous segment"
      >
        <SkipBack className="size-5" />
      </Button>

      <Button
        variant="outline"
        size="lg"
        onClick={restartTimer}
        className="h-11 w-11 rounded-full p-0 sm:h-12 sm:w-12"
        title="Restart"
        aria-label="Restart"
      >
        <RotateCcw className="size-5" />
      </Button>

      <Button
        size="lg"
        onClick={handlePlayPause}
        disabled={isCompleted}
        className="h-14 w-14 rounded-full p-0 shadow-lg sm:h-16 sm:w-16"
        title={status === "running" ? "Pause" : "Play"}
        aria-label={status === "running" ? "Pause" : "Play"}
      >
        {status === "running" ? <Pause className="size-6" /> : <Play className="size-6" />}
      </Button>

      <Button
        variant="outline"
        size="lg"
        onClick={() => skipSegment()}
        disabled={isCompleted}
        className="h-11 w-11 rounded-full p-0 sm:h-12 sm:w-12"
        title="Skip segment"
        aria-label="Skip segment"
      >
        <SkipForward className="size-5" />
      </Button>
    </div>
  );
}
