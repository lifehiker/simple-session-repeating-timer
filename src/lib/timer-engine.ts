import { RunningSegment, TimerStatus, TimerMode } from "@/types/timer";

export interface TimerState {
  status: TimerStatus;
  mode: TimerMode;
  currentSegmentIndex: number;
  currentCycle: number;
  totalCycles: number;
  remainingSeconds: number;
  segments: RunningSegment[];
}

export type TickCallback = (state: TimerState) => void;
export type SegmentChangeCallback = (segment: RunningSegment, index: number, cycle: number) => void;
export type CompleteCallback = () => void;

export class TimerEngine {
  private intervalId: ReturnType<typeof setInterval> | null = null;
  private lastTick: number = 0;

  private segments: RunningSegment[];
  private mode: TimerMode;
  private totalCycles: number;

  private currentSegmentIndex: number = 0;
  private currentCycle: number = 1;
  private remainingSeconds: number = 0;
  private status: TimerStatus = "idle";

  public onTick: TickCallback | null = null;
  public onSegmentChange: SegmentChangeCallback | null = null;
  public onComplete: CompleteCallback | null = null;

  constructor(segments: RunningSegment[], mode: TimerMode, totalCycles: number = 0) {
    this.segments = segments;
    this.mode = mode;
    this.totalCycles = totalCycles;
    this.remainingSeconds = segments[0]?.durationSeconds ?? 0;
  }

  getState(): TimerState {
    return {
      status: this.status,
      mode: this.mode,
      currentSegmentIndex: this.currentSegmentIndex,
      currentCycle: this.currentCycle,
      totalCycles: this.totalCycles,
      remainingSeconds: this.remainingSeconds,
      segments: this.segments,
    };
  }

  start() {
    if (this.status === "running") return;
    if (this.status === "completed") return;

    this.status = "running";
    this.lastTick = Date.now();

    this.intervalId = setInterval(() => {
      const now = Date.now();
      const elapsed = Math.floor((now - this.lastTick) / 1000);
      if (elapsed > 0) {
        this.lastTick = now;
        this.tick(elapsed);
      }
    }, 500);

    this.onTick?.(this.getState());
  }

  pause() {
    if (this.status !== "running") return;
    this.status = "paused";
    this.clearInterval();
    this.onTick?.(this.getState());
  }

  resume() {
    if (this.status !== "paused") return;
    this.status = "running";
    this.lastTick = Date.now();
    this.intervalId = setInterval(() => {
      const now = Date.now();
      const elapsed = Math.floor((now - this.lastTick) / 1000);
      if (elapsed > 0) {
        this.lastTick = now;
        this.tick(elapsed);
      }
    }, 500);
    this.onTick?.(this.getState());
  }

  skipNext() {
    if (this.status === "completed") return;
    this.advanceSegment();
    this.onTick?.(this.getState());
  }

  goPrevious() {
    if (this.status === "completed") return;
    if (this.currentSegmentIndex > 0) {
      this.currentSegmentIndex--;
      this.remainingSeconds = this.segments[this.currentSegmentIndex].durationSeconds;
    } else if (this.currentCycle > 1) {
      this.currentCycle--;
      this.currentSegmentIndex = this.segments.length - 1;
      this.remainingSeconds = this.segments[this.currentSegmentIndex].durationSeconds;
    } else {
      // Restart first segment
      this.remainingSeconds = this.segments[0].durationSeconds;
    }
    this.onTick?.(this.getState());
  }

  restart() {
    this.clearInterval();
    this.currentSegmentIndex = 0;
    this.currentCycle = 1;
    this.remainingSeconds = this.segments[0]?.durationSeconds ?? 0;
    this.status = "idle";
    this.onTick?.(this.getState());
  }

  destroy() {
    this.clearInterval();
  }

  private tick(elapsed: number) {
    this.remainingSeconds -= elapsed;

    while (this.remainingSeconds <= 0) {
      this.advanceSegment();
      if (this.status === "completed") break;
    }

    this.onTick?.(this.getState());
  }

  private advanceSegment() {
    const nextSegmentIndex = this.currentSegmentIndex + 1;

    if (nextSegmentIndex < this.segments.length) {
      // Move to next segment in current cycle
      this.currentSegmentIndex = nextSegmentIndex;
      this.remainingSeconds = this.segments[nextSegmentIndex].durationSeconds;
      this.onSegmentChange?.(
        this.segments[nextSegmentIndex],
        nextSegmentIndex,
        this.currentCycle
      );
    } else if (this.mode === "REPEATING") {
      // Finished all segments in one cycle
      const isInfinite = this.totalCycles === 0;
      const hasMoreCycles = isInfinite || this.currentCycle < this.totalCycles;

      if (hasMoreCycles) {
        this.currentCycle++;
        this.currentSegmentIndex = 0;
        this.remainingSeconds = this.segments[0].durationSeconds;
        this.onSegmentChange?.(this.segments[0], 0, this.currentCycle);
      } else {
        this.complete();
      }
    } else {
      // SESSION mode: done after all segments
      this.complete();
    }
  }

  private complete() {
    this.status = "completed";
    this.remainingSeconds = 0;
    this.clearInterval();
    this.onComplete?.();
  }

  private clearInterval() {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}
