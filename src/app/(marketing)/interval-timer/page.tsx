import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Interval Timer – Simple Repeating Timer with Named Intervals | SessionTimer",
  description:
    "A simple interval timer that isn't built for HIIT. Create named intervals, repeat them for any number of cycles, and display a large countdown. Free to use.",
};

export default function IntervalTimerPage() {
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
          Simple Interval Timer — Not Just for HIIT
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          A clean interval timer for teachers, coaches, and anyone who needs to repeat
          a sequence of named intervals. Set Work and Rest, Drill and Break, Station 1
          and Station 2 — then repeat for as many cycles as you need.
        </p>

        <Link href="/app/timer" className="inline-block mb-12">
          <Button size="lg">Start Interval Timer Free</Button>
        </Link>

        <div className="grid sm:grid-cols-2 gap-8 mb-12">
          {[
            { title: "Named Intervals", desc: "Give each interval a real name — Work, Rest, Drill, Break, Practice, Review. Not just 'Round 1'." },
            { title: "Repeat Cycles", desc: "Set how many cycles to run, or keep it running until you stop. Works for 3 rounds or 30." },
            { title: "Clean Display", desc: "Large, simple countdown. No cluttered HIIT-style UI. Just the time and the interval name." },
            { title: "Any Routine", desc: "Workout intervals, classroom station rotations, rehearsal rounds, drill sequences — all in one tool." },
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
