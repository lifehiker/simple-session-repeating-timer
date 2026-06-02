"use client";

export function speak(text: string, voiceName?: string): void {
  if (typeof window === "undefined") return;
  if (!window.speechSynthesis) return;

  try {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);

    if (voiceName) {
      const voices = window.speechSynthesis.getVoices();
      const voice = voices.find((v) => v.name === voiceName);
      if (voice) utterance.voice = voice;
    }

    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;

    window.speechSynthesis.speak(utterance);
  } catch {
    // Silent fail
  }
}

export function getVoices(): SpeechSynthesisVoice[] {
  if (typeof window === "undefined") return [];
  if (!window.speechSynthesis) return [];
  return window.speechSynthesis.getVoices();
}

export function isSpeechAvailable(): boolean {
  if (typeof window === "undefined") return false;
  return "speechSynthesis" in window;
}
