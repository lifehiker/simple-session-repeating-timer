"use client";

import { useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useTimerStore } from "@/stores/timer-store";
import { TimerDisplay } from "@/components/timer/timer-display";
import { TimerControls } from "@/components/timer/timer-controls";
import { playTransitionSound, playCompleteSound } from "@/lib/audio";
import { speak } from "@/lib/speech";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function TimerRunPage() {
  const router = useRouter();
  const { runningState, settings, startTimer } = useTimerStore();
  const prevSegmentIndexRef = useRef<number | null>(null);
  const prevStatusRef = useRef<string | null>(null);

  const handleSegmentTransition = useCallback(() => {
    if (settings.soundEnabled) {
      playTransitionSound();
    }
    if (settings.speechEnabled && runningState) {
      const seg = runningState.segments[runningState.currentSegmentIndex];
      if (seg) {
        speak(seg.name, settings.voiceName || undefined);
      }
    }
  }, [settings, runningState]);

  useEffect(() => {
    if (!runningState) return;

    const prevIdx = prevSegmentIndexRef.current;
    const prevStatus = prevStatusRef.current;

    // Detect segment change
    if (prevIdx !== null && prevIdx !== runningState.currentSegmentIndex) {
      handleSegmentTransition();
    }

    // Detect completion
    if (prevStatus !== "completed" && runningState.status === "completed") {
      if (settings.soundEnabled) {
        playCompleteSound();
      }
      if (settings.speechEnabled) {
        speak("Session complete!");
      }
    }

    prevSegmentIndexRef.current = runningState.currentSegmentIndex;
    prevStatusRef.current = runningState.status;
  }, [runningState, handleSegmentTransition, settings]);

  const handleFullScreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen().catch(console.error);
    }
  };

  if (!runningState) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
        <div className="text-5xl mb-4">⏱️</div>
        <h2 className="text-xl font-semibold mb-2">No timer running</h2>
        <p className="text-gray-500 mb-6">Build a timer first, then start it.</p>
        <Link href="/app/timer">
          <Button>Build a Timer</Button>
        </Link>
      </div>
    );
  }

  const isCompleted = runningState.status === "completed";

  return (
    <div className="flex flex-col min-h-screen p-4 bg-gray-950">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-4">
        <Link href="/app/timer">
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
            ← Back
          </Button>
        </Link>
        <div className="text-gray-400 text-sm">{runningState.presetName ?? "Timer"}</div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleFullScreen}
          className="text-gray-400 hover:text-white"
          title="Toggle fullscreen"
        >
          ⛶
        </Button>
      </div>

      {/* Timer display */}
      <div className="flex-1 flex flex-col justify-center">
        <TimerDisplay />

        {isCompleted && (
          <div className="text-center mt-6">
            <div className="text-2xl font-bold text-white mb-2">Session Complete! 🎉</div>
            <div className="flex justify-center gap-4 mt-4">
              <Button
                onClick={() => {
                  const store = useTimerStore.getState();
                  store.restartTimer();
                  // Restart the engine
                  if (runningState) {
                    startTimer({
                      name: runningState.presetName ?? "Timer",
                      mode: runningState.mode,
                      segments: runningState.segments.map((s, i) => ({ ...s, position: i })),
                      repeatCount: runningState.totalCycles,
                    });
                  }
                }}
              >
                Run Again
              </Button>
              <Link href="/app/timer">
                <Button variant="outline" className="text-gray-900">New Timer</Button>
              </Link>
            </div>
          </div>
        )}

        {!isCompleted && <TimerControls />}
      </div>

      {/* Bottom: segment list preview */}
      <div className="mt-6">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {runningState.segments.map((seg, i) => (
            <div
              key={i}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                i === runningState.currentSegmentIndex
                  ? "bg-white text-gray-900 scale-110"
                  : "bg-white/10 text-white/60"
              }`}
              style={{
                backgroundColor: i === runningState.currentSegmentIndex ? "white" : undefined,
                border: `2px solid ${seg.color ?? "#3b82f6"}`,
              }}
            >
              {seg.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
