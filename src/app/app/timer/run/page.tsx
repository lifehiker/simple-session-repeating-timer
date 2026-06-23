"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef } from "react";
import { useTimerStore } from "@/stores/timer-store";
import { TimerDisplay } from "@/components/timer/timer-display";
import { TimerControls } from "@/components/timer/timer-controls";
import { Button } from "@/components/ui/button";
import { playCompleteSound, playTransitionSound } from "@/lib/audio";
import { trackEvent } from "@/lib/analytics";
import { speak } from "@/lib/speech";

export default function TimerRunPage() {
  const { runningState, settings, startTimer } = useTimerStore();
  const previousSegmentRef = useRef<number | null>(null);
  const previousCycleRef = useRef<number | null>(null);
  const previousStatusRef = useRef<string | null>(null);

  const announceTransition = useCallback(() => {
    if (!runningState) return;
    const segment = runningState.segments[runningState.currentSegmentIndex];
    if (settings.soundEnabled) playTransitionSound();
    if (settings.speechEnabled && segment) speak(segment.name, settings.voiceName || undefined);
  }, [runningState, settings]);

  useEffect(() => {
    if (!runningState) return;

    const segmentChanged =
      previousSegmentRef.current !== null &&
      previousSegmentRef.current !== runningState.currentSegmentIndex;
    const cycleChanged =
      previousCycleRef.current !== null &&
      previousCycleRef.current !== runningState.currentCycle;

    if (segmentChanged || cycleChanged) {
      announceTransition();
    }

    if (previousStatusRef.current !== "completed" && runningState.status === "completed") {
      if (settings.soundEnabled) playCompleteSound();
      if (settings.speechEnabled) speak("Session complete", settings.voiceName || undefined);
      trackEvent("timer_completed", { mode: runningState.mode });
    }

    previousSegmentRef.current = runningState.currentSegmentIndex;
    previousCycleRef.current = runningState.currentCycle;
    previousStatusRef.current = runningState.status;
  }, [announceTransition, runningState, settings]);

  function toggleFullScreen() {
    if (document.fullscreenElement) {
      void document.exitFullscreen();
    } else {
      void document.documentElement.requestFullscreen();
    }
  }

  if (!runningState) {
    return (
      <div className="grid min-h-screen place-items-center bg-zinc-950 p-6 text-center text-white">
        <div>
          <h1 className="text-2xl font-semibold">No timer running</h1>
          <p className="mt-2 text-zinc-400">Build or choose a preset first.</p>
          <Button asChild className="mt-6">
            <Link href="/app/timer">Build timer</Link>
          </Button>
        </div>
      </div>
    );
  }

  const completed = runningState.status === "completed";

  return (
    <div className="fixed inset-0 z-50 flex min-h-screen flex-col overflow-y-auto bg-zinc-950 p-3 sm:p-4">
      <div className="mb-3 flex items-center justify-between">
        <Button asChild variant="ghost" className="text-zinc-300 hover:text-white">
          <Link href="/app/timer">Back</Link>
        </Button>
        <div className="text-sm text-zinc-400">{runningState.presetName ?? "Timer"}</div>
        <Button variant="ghost" className="text-zinc-300 hover:text-white" onClick={toggleFullScreen}>
          Fullscreen
        </Button>
      </div>

      <div className="flex flex-1 flex-col justify-center">
        <TimerDisplay />
        {completed ? (
          <div className="mt-6 flex flex-col items-center gap-3 text-white">
            <div className="text-2xl font-semibold">Session complete</div>
            <div className="flex gap-3">
              <Button
                onClick={() =>
                  startTimer({
                    name: runningState.presetName ?? "Timer",
                    mode: runningState.mode,
                    repeatCount: runningState.totalCycles,
                    segments: runningState.segments.map((segment, index) => ({ ...segment, position: index })),
                  })
                }
              >
                Run again
              </Button>
              <Button asChild variant="outline">
                <Link href="/app/timer">New timer</Link>
              </Button>
            </div>
          </div>
        ) : (
          <TimerControls />
        )}
      </div>

      <div className="mt-5 flex gap-2 overflow-x-auto pb-2">
        {runningState.segments.map((segment, index) => (
          <div
            key={`${segment.name}-${index}`}
            className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium ${
              index === runningState.currentSegmentIndex ? "bg-white text-zinc-950" : "bg-white/10 text-white/70"
            }`}
            style={{ borderColor: segment.color ?? "#3b82f6" }}
          >
            {segment.name}
          </div>
        ))}
      </div>
    </div>
  );
}
