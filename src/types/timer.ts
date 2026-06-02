export type TimerMode = "SESSION" | "REPEATING";

export interface SegmentInput {
  id?: string;
  name: string;
  durationSeconds: number;
  color?: string;
  position: number;
}

export interface PresetInput {
  name: string;
  mode: TimerMode;
  repeatCount?: number;
  segments: SegmentInput[];
}

export interface RunningSegment {
  name: string;
  durationSeconds: number;
  color?: string;
}

export type TimerStatus = "idle" | "running" | "paused" | "completed";

export interface RunningSessionState {
  status: TimerStatus;
  mode: TimerMode;
  segments: RunningSegment[];
  currentSegmentIndex: number;
  currentCycle: number;
  totalCycles: number; // 0 means infinite
  remainingSeconds: number;
  presetName?: string;
}
