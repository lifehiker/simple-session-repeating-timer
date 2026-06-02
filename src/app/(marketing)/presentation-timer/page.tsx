import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Presentation Timer – Simple Visible Timer with Named Segments | SessionTimer",
  description:
    "A clean presentation timer for speakers and trainers. Create named segments (Intro, Main Talk, Q&A), large display mode readable from stage, and spoken alerts.",
};

export default function PresentationTimerPage() {
  return (
    <div className="min-h-screen">
      <header className="border-b bg-white">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="font-bold text-xl text-blue-600">SessionTimer</Link>
          <Link href="/app/timer"><Button>Start Free Timer</Button></Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Presentation Timer with Named Segments
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          A clean, visible timer built for speakers, trainers, and presenters. Create named
          segments like Intro, Main Talk, and Q&amp;A — then display a large countdown your
          audience can read from anywhere in the room.
        </p>

        <div className="flex gap-4 mb-12">
          <Link href="/app/timer">
            <Button size="lg">Start Presentation Timer</Button>
          </Link>
          <Link href="/pricing">
            <Button size="lg" variant="outline">See Pricing</Button>
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 gap-8 mb-12">
          {[
            { title: "Named Segments", desc: "Label each part of your talk — Introduction, Main Content, Q&A, Wrap-up. Know exactly what's coming." },
            { title: "Large Display", desc: "Full-screen mode with enormous countdown digits. Readable from the back of any room or conference hall." },
            { title: "Sound Cues", desc: "Optional beep at each segment transition so you can stay focused on your audience." },
            { title: "Reusable Presets", desc: "Save your presentation timing as a preset and reuse it for every rehearsal and performance." },
          ].map((f) => (
            <div key={f.title} className="border rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-sm text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-blue-50 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Perfect for TED-style talks, conference presentations, and training sessions
          </h2>
          <p className="text-gray-600 mb-6">
            Unlike generic phone timers, SessionTimer lets you map out your entire presentation
            as named time blocks. You see what&apos;s coming, your audience sees the time, and you
            both stay on track.
          </p>
          <Link href="/app/timer">
            <Button>Try it free — no signup needed</Button>
          </Link>
        </div>
      </main>

      <footer className="border-t bg-gray-50 py-8 px-4 text-center text-sm text-gray-500">
        <Link href="/">← Back to SessionTimer</Link>
      </footer>
    </div>
  );
}
