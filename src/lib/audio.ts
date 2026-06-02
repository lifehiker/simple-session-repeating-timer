"use client";

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    try {
      audioCtx = new AudioContext();
    } catch {
      return null;
    }
  }
  return audioCtx;
}

export function playBeep(
  frequency: number = 880,
  duration: number = 0.2,
  volume: number = 0.5
): void {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);

    gainNode.gain.setValueAtTime(volume, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + duration);
  } catch {
    // Silent fail
  }
}

export function playTransitionSound(): void {
  playBeep(880, 0.15, 0.5);
  setTimeout(() => playBeep(1100, 0.2, 0.4), 180);
}

export function playCompleteSound(): void {
  playBeep(880, 0.2, 0.5);
  setTimeout(() => playBeep(1100, 0.2, 0.5), 200);
  setTimeout(() => playBeep(1320, 0.4, 0.6), 400);
}
