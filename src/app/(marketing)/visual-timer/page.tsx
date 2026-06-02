import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Visual Timer – Large Display Timer for Any Room | SessionTimer",
  description:
    "A visual timer with a massive display readable from across any room. Color-coded segments, named phases, full-screen mode. Free for teachers, coaches, and speakers.",
};

export default function VisualTimerPage() {
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
          Visual Timer — Large Display, Color Coded
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          A clean visual timer with a massive countdown display. Color-code your segments,
          show the current phase name in large text, and put it in full-screen so everyone
          in the room can see it.
        </p>

        <Link href="/app/timer" className="inline-block mb-12">
          <Button size="lg">Launch Visual Timer Free</Button>
        </Link>

        <div className="bg-gray-900 rounded-2xl p-10 text-white text-center mb-12">
          <div className="text-sm text-gray-400 mb-2">Visual Timer Preview</div>
          <div className="text-9xl font-mono font-bold mb-3">14:32</div>
          <div className="text-3xl font-semibold text-green-400">Group Work</div>
          <div className="text-sm text-gray-400 mt-2">Next: Q&amp;A · 5:00</div>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          {[
            { title: "Color Per Segment", desc: "Each segment gets its own color. Students know what phase they're in at a glance." },
            { title: "Full-Screen Mode", desc: "One tap fills the entire screen with the countdown. Works on any device — phone, tablet, laptop." },
            { title: "No App Required", desc: "Runs in any web browser. No download, no installation, no account required to start." },
          ].map((f) => (
            <div key={f.title} className="border rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-sm text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </main>

      <footer className="border-t bg-gray-50 py-8 px-4 text-center text-sm text-gray-500">
        <Link href="/">← Back to SessionTimer</Link>
      </footer>
    </div>
  );
}
