"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useTimerStore } from "@/stores/timer-store";
import { getVoices, speak, isSpeechAvailable } from "@/lib/speech";
import { playTransitionSound } from "@/lib/audio";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function SettingsPage() {
  const { data: session } = useSession();
  const { settings, updateSettings } = useTimerStore();
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [speechAvailable, setSpeechAvailable] = useState(false);

  useEffect(() => {
    setSpeechAvailable(isSpeechAvailable());
    const loadVoices = () => setVoices(getVoices());
    loadVoices();
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, []);

  function testSound() {
    playTransitionSound();
  }

  function testSpeech() {
    speak("Segment starting now!", settings.voiceName || undefined);
  }

  return (
    <div className="p-6 max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Settings</h1>

      {/* Alert Settings */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-base">Alert Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Sound Alerts */}
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium">Sound Alerts</Label>
              <p className="text-sm text-gray-500 mt-0.5">Play a beep sound at segment transitions</p>
            </div>
            <div className="flex items-center gap-3">
              <Switch
                checked={settings.soundEnabled}
                onCheckedChange={(checked) => updateSettings({ soundEnabled: checked })}
              />
              {settings.soundEnabled && (
                <Button variant="outline" size="sm" onClick={testSound}>
                  Test
                </Button>
              )}
            </div>
          </div>

          <Separator />

          {/* Spoken Alerts */}
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium flex items-center gap-2">
                Spoken Alerts
                <Badge variant="secondary" className="text-xs">Pro</Badge>
              </Label>
              <p className="text-sm text-gray-500 mt-0.5">
                Announce segment names using text-to-speech
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Switch
                checked={settings.speechEnabled}
                onCheckedChange={(checked) => {
                  if (!speechAvailable) return;
                  updateSettings({ speechEnabled: checked });
                }}
                disabled={!speechAvailable}
              />
              {settings.speechEnabled && speechAvailable && (
                <Button variant="outline" size="sm" onClick={testSpeech}>
                  Test
                </Button>
              )}
            </div>
          </div>

          {!speechAvailable && (
            <p className="text-xs text-amber-600 bg-amber-50 rounded p-2">
              Speech synthesis is not available in your browser.
            </p>
          )}

          {/* Voice selector */}
          {speechAvailable && settings.speechEnabled && voices.length > 0 && (
            <div className="space-y-2">
              <Label>Voice</Label>
              <Select
                value={settings.voiceName || "default"}
                onValueChange={(v: string | null) => updateSettings({ voiceName: (v ?? "") === "default" ? "" : (v ?? "") })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Default voice" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default voice</SelectItem>
                  {voices.map((v) => (
                    <SelectItem key={v.name} value={v.name}>
                      {v.name} ({v.lang})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Account */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-base">Account</CardTitle>
        </CardHeader>
        <CardContent>
          {session?.user ? (
            <div className="space-y-4">
              <div>
                <div className="font-medium text-gray-900">{session.user.name}</div>
                <div className="text-sm text-gray-500">{session.user.email}</div>
              </div>
              <Button
                variant="outline"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-gray-600">
                You&apos;re using SessionTimer as a guest. Create an account to save presets across devices.
              </p>
              <div className="flex gap-3">
                <Link href="/signup">
                  <Button size="sm">Create Account</Button>
                </Link>
                <Link href="/login">
                  <Button size="sm" variant="outline">Sign In</Button>
                </Link>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Billing */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Billing</CardTitle>
        </CardHeader>
        <CardContent>
          {session?.user ? (
            <div className="space-y-4">
              <div>
                <div className="font-medium text-gray-900">Free Plan</div>
                <div className="text-sm text-gray-500">Up to 3 saved presets</div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 text-sm">
                <p className="font-semibold text-blue-900 mb-1">Upgrade to Pro</p>
                <p className="text-blue-700 mb-3">Unlimited presets, spoken alerts, and more.</p>
                <Link href="/pricing">
                  <Button size="sm">See Pro Plans</Button>
                </Link>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-500">
              Sign in to manage your subscription.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
