import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Repeating Timer – Routine Timer with Named Segments | SessionTimer",
  description:
    "A repeating timer for recurring routines. Create a sequence of named segments and repeat them for N cycles. Perfect for drills, laundry, study sessions, and workouts.",
};

export default function RepeatingTimerPage() {
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
          Repeating Timer for Routines & Drills
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Build a sequence of named segments, set a repeat count, and let it run. Save your
          routine as a preset and reuse it every day. Perfect for anything you do on a schedule.
        </p>

        <Link href="/app/timer" className="inline-block mb-12">
          <Button size="lg">Build a Repeating Timer</Button>
        </Link>

        <h2 className="text-2xl font-bold text-gray-900 mb-6">Common repeating timer uses</h2>
        <div className="grid sm:grid-cols-2 gap-6 mb-12">
          {[
            { emoji: "📚", title: "Study Sessions", desc: "25 min Focus + 5 min Break, repeated 4 times. Classic Pomodoro or your own variation." },
            { emoji: "💪", title: "Workout Drills", desc: "Work + Rest cycles repeated for any number of rounds. Not branded as HIIT, works for any sport." },
            { emoji: "🏫", title: "Classroom Rotations", desc: "Station 1 → Station 2 → Station 3, repeated so every group visits every station." },
            { emoji: "🔄", title: "Any Daily Routine", desc: "Laundry, cooking timers, practice drills, warm-up sets — anything you repeat every day." },
          ].map((f) => (
            <div key={f.title} className="border rounded-xl p-6">
              <div className="text-2xl mb-2">{f.emoji}</div>
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
