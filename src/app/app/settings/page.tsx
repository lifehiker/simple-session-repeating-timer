"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useTimerStore } from "@/stores/timer-store";
import { getVoices, isSpeechAvailable, speak } from "@/lib/speech";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export default function SettingsPage() {
  const { data: session } = useSession();
  const { settings, updateSettings } = useTimerStore();
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    if (!isSpeechAvailable()) return;
    const loadVoices = () => setVoices(getVoices());
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  async function openPortal() {
    const response = await fetch("/api/stripe/portal", { method: "POST" });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || !data.url) {
      toast.error(data.error ?? "Billing portal is not configured.");
      return;
    }
    window.location.href = data.url;
  }

  return (
    <div className="mx-auto max-w-4xl p-4 sm:p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-950">Settings</h1>
        <p className="mt-2 text-zinc-600">Control transition sounds, spoken alerts, and billing access.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Alerts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="flex items-center justify-between rounded-md border p-3">
              <div>
                <Label htmlFor="sound-alerts">Sound alerts</Label>
                <p className="text-sm text-zinc-500">Play a short tone when segments change.</p>
              </div>
              <Switch id="sound-alerts" checked={settings.soundEnabled} onCheckedChange={(soundEnabled) => updateSettings({ soundEnabled })} />
            </div>

            <div className="flex items-center justify-between rounded-md border p-3">
              <div>
                <Label htmlFor="speech-alerts">Spoken alerts</Label>
                <p className="text-sm text-zinc-500">Announce the next segment name with browser speech.</p>
              </div>
              <Switch id="speech-alerts" checked={settings.speechEnabled} onCheckedChange={(speechEnabled) => updateSettings({ speechEnabled })} />
            </div>

            <div className="space-y-2">
              <Label>Voice</Label>
              <Select
                value={settings.voiceName || "default"}
                onValueChange={(voiceName) =>
                  updateSettings({ voiceName: !voiceName || voiceName === "default" ? "" : voiceName })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Browser default" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Browser default</SelectItem>
                  {voices.map((voice) => (
                    <SelectItem key={`${voice.name}-${voice.lang}`} value={voice.name}>
                      {voice.name} ({voice.lang})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" onClick={() => speak("Next segment", settings.voiceName || undefined)} disabled={!isSpeechAvailable()}>
                Test voice
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account and billing</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <Row label="Account" value={session?.user?.email ?? "Guest mode"} />
            <Row label="Saved data" value={session?.user ? "Cloud presets" : "Local browser presets"} />
            <div className="rounded-md bg-zinc-100 p-3 text-zinc-700">
              Stripe is optional. If credentials are missing, the app still runs and billing routes return a clear setup message.
            </div>
            <Button onClick={openPortal} variant="outline" className="w-full">
              Open billing portal
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 rounded-md border p-3">
      <span className="text-zinc-500">{label}</span>
      <strong className="text-right">{value}</strong>
    </div>
  );
}
