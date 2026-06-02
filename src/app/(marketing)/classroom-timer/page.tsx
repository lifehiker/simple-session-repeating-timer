import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Classroom Timer – Visual Timer for Teachers | SessionTimer",
  description:
    "A visual classroom timer students can see from their desks. Named segments for activities, station rotations, clean-up time, and transitions. Free for teachers.",
};

export default function ClassroomTimerPage() {
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
          Visual Classroom Timer for Teachers
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          A large, visible timer your students can actually see from their desks. Create
          named activities — Group Work, Discussion, Independent, Clean-Up — and let the
          countdown do the classroom management for you.
        </p>

        <Link href="/app/timer" className="inline-block mb-12">
          <Button size="lg">Start Classroom Timer Free</Button>
        </Link>

        <div className="bg-blue-50 rounded-2xl p-8 mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Built for real classroom workflows</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              "Station rotations (3 groups × 10 min)",
              "Group work + class discussion transitions",
              "Independent work blocks",
              "Timed writing or reading sessions",
              "Clean-up and transition time",
              "Quiz or assessment time limits",
            ].map((item) => (
              <div key={item} className="flex items-start gap-2 text-sm">
                <span className="text-blue-500 mt-0.5">✓</span>
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 mb-12">
          {[
            { title: "Readable from any desk", desc: "Full-screen mode fills the entire display with the countdown. Large enough for any classroom." },
            { title: "No account needed", desc: "Open the link and start your timer. No login required for basic use." },
            { title: "Save your rotations", desc: "Create an account (free) to save your classroom rotation preset and load it daily with one tap." },
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
