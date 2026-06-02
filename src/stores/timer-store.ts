"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { PresetInput, RunningSessionState, TimerMode } from "@/types/timer";
import { TimerEngine, TimerState } from "@/lib/timer-engine";

interface TimerSettings {
  soundEnabled: boolean;
  speechEnabled: boolean;
  voiceName: string;
}

interface TimerStore {
  // Running timer state
  runningState: RunningSessionState | null;
  engine: TimerEngine | null;

  // Builder draft
  builderDraft: PresetInput;

  // Settings
  settings: TimerSettings;

  // Actions
  setBuilderDraft: (draft: Partial<PresetInput>) => void;
  resetBuilderDraft: () => void;
  loadPresetToDraft: (preset: PresetInput) => void;

  startTimer: (preset: PresetInput) => void;
  pauseTimer: () => void;
  resumeTimer: () => void;
  skipSegment: () => void;
  prevSegment: () => void;
  restartTimer: () => void;
  stopTimer: () => void;
  syncEngineState: (state: TimerState) => void;

  updateSettings: (settings: Partial<TimerSettings>) => void;
}

const DEFAULT_DRAFT: PresetInput = {
  name: "My Timer",
  mode: "SESSION" as TimerMode,
  segments: [
    { name: "Segment 1", durationSeconds: 5 * 60, color: "#3b82f6", position: 0 },
  ],
};

export const useTimerStore = create<TimerStore>()(
  persist(
    (set, get) => ({
      runningState: null,
      engine: null,

      builderDraft: { ...DEFAULT_DRAFT, segments: [...DEFAULT_DRAFT.segments] },

      settings: {
        soundEnabled: true,
        speechEnabled: false,
        voiceName: "",
      },

      setBuilderDraft: (draft) =>
        set((state) => ({
          builderDraft: { ...state.builderDraft, ...draft },
        })),

      resetBuilderDraft: () =>
        set({
          builderDraft: {
            ...DEFAULT_DRAFT,
            segments: [...DEFAULT_DRAFT.segments],
          },
        }),

      loadPresetToDraft: (preset) =>
        set({
          builderDraft: {
            name: preset.name,
            mode: preset.mode,
            repeatCount: preset.repeatCount,
            segments: preset.segments.map((s, i) => ({ ...s, position: i })),
          },
        }),

      startTimer: (preset) => {
        const { engine: existingEngine } = get();
        if (existingEngine) existingEngine.destroy();

        const engine = new TimerEngine(
          preset.segments,
          preset.mode,
          preset.mode === "REPEATING" ? (preset.repeatCount ?? 0) : 1
        );

        const initialState = engine.getState();
        set({
          engine,
          runningState: {
            status: "idle",
            mode: preset.mode,
            segments: preset.segments,
            currentSegmentIndex: initialState.currentSegmentIndex,
            currentCycle: initialState.currentCycle,
            totalCycles: initialState.totalCycles,
            remainingSeconds: initialState.remainingSeconds,
            presetName: preset.name,
          },
        });

        engine.onTick = (state) => get().syncEngineState(state);
        engine.onSegmentChange = () => {
          // Audio/speech handled in component
        };
        engine.onComplete = () => {
          set((s) => ({
            runningState: s.runningState
              ? { ...s.runningState, status: "completed" }
              : null,
          }));
        };

        engine.start();
        set((state) => ({
          runningState: state.runningState
            ? { ...state.runningState, status: "running" }
            : null,
        }));
      },

      pauseTimer: () => {
        get().engine?.pause();
        set((state) => ({
          runningState: state.runningState
            ? { ...state.runningState, status: "paused" }
            : null,
        }));
      },

      resumeTimer: () => {
        get().engine?.resume();
        set((state) => ({
          runningState: state.runningState
            ? { ...state.runningState, status: "running" }
            : null,
        }));
      },

      skipSegment: () => get().engine?.skipNext(),
      prevSegment: () => get().engine?.goPrevious(),

      restartTimer: () => {
        get().engine?.restart();
        set((state) => ({
          runningState: state.runningState
            ? {
                ...state.runningState,
                status: "idle",
                currentSegmentIndex: 0,
                currentCycle: 1,
                remainingSeconds:
                  state.runningState.segments[0]?.durationSeconds ?? 0,
              }
            : null,
        }));
      },

      stopTimer: () => {
        const { engine } = get();
        if (engine) engine.destroy();
        set({ engine: null, runningState: null });
      },

      syncEngineState: (state: TimerState) => {
        set((s) => ({
          runningState: s.runningState
            ? {
                ...s.runningState,
                status: state.status,
                currentSegmentIndex: state.currentSegmentIndex,
                currentCycle: state.currentCycle,
                remainingSeconds: state.remainingSeconds,
              }
            : null,
        }));
      },

      updateSettings: (settings) =>
        set((state) => ({
          settings: { ...state.settings, ...settings },
        })),
    }),
    {
      name: "ssrt-timer-store",
      partialize: (state) => ({
        builderDraft: state.builderDraft,
        settings: state.settings,
      }),
    }
  )
);
