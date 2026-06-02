import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Simple Session & Repeating Timer – Visible Timer for Teachers, Speakers & Coaches",
  description:
    "A clean visible timer with named segments and repeating routines. Perfect for classrooms, presentations, workouts, and any structured session. Free to use.",
};

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="font-bold text-xl text-blue-600">
            SessionTimer
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600">
            <Link href="/pricing" className="hover:text-gray-900">Pricing</Link>
            <Link href="/app/timer" className="hover:text-gray-900">Templates</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">Sign In</Button>
            </Link>
            <Link href="/app/timer">
              <Button size="sm">Start Free Timer</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20 bg-gradient-to-b from-blue-50 to-white">
        <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-100">Free to use · No signup required</Badge>
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 max-w-3xl leading-tight">
          The Visible Timer for{" "}
          <span className="text-blue-600">Teachers, Speakers &amp; Coaches</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl">
          Create named timer segments, set repeating routines, and run a
          full-screen display readable from across the room. Built for real
          sessions, not generic countdowns.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/app/timer">
            <Button size="lg" className="text-base px-8 py-6">
              Start Free Timer
            </Button>
          </Link>
          <Link href="/app/timer">
            <Button size="lg" variant="outline" className="text-base px-8 py-6">
              Browse Templates
            </Button>
          </Link>
        </div>

        {/* Demo visual */}
        <div className="mt-16 w-full max-w-2xl bg-gray-900 rounded-2xl p-8 text-white shadow-2xl">
          <div className="text-sm text-gray-400 mb-2">Classroom Rotation · Cycle 1 of 3</div>
          <div className="text-8xl font-mono font-bold text-white mb-2">08:42</div>
          <div className="text-2xl font-semibold text-blue-400 mb-1">Station 1</div>
          <div className="text-sm text-gray-400">Next: Station 2 · 10:00</div>
          <div className="mt-4 bg-gray-700 rounded-full h-2">
            <div className="bg-blue-500 h-2 rounded-full" style={{ width: "13%" }}></div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Everything you need for structured sessions
          </h2>
          <p className="text-center text-gray-500 mb-12 max-w-xl mx-auto">
            Designed for people who run sessions in front of others and need a
            timer that actually works for them.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "🖥️",
                title: "Large Display",
                desc: "Massive countdown readable from across any room. Works in full-screen mode on any device.",
              },
              {
                icon: "🏷️",
                title: "Named Segments",
                desc: "Label each part of your session. No more guessing which phase you're in.",
              },
              {
                icon: "🔁",
                title: "Repeating Routines",
                desc: "Set a sequence to repeat N times or run indefinitely. Perfect for intervals and drills.",
              },
              {
                icon: "🔊",
                title: "Spoken Alerts",
                desc: "Hear the segment name announced at each transition. Never miss a cue.",
              },
            ].map((feature) => (
              <div key={feature.title} className="text-center p-6">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-500">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Built for your context
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "🏫",
                title: "Classrooms",
                desc: "Station rotations, group work, Q&A, clean-up time. Students can see it from their desks.",
                link: "/classroom-timer",
              },
              {
                icon: "🎤",
                title: "Presentations",
                desc: "Intro, main talk, Q&A segments. Stay on time without watching your phone.",
                link: "/presentation-timer",
              },
              {
                icon: "💪",
                title: "Workouts",
                desc: "Work/rest intervals, circuit training, warm-up and cool-down. Repeat for any number of rounds.",
                link: "/interval-timer",
              },
              {
                icon: "📚",
                title: "Study Sessions",
                desc: "Focus and break blocks, Pomodoro-style routines, research sessions.",
                link: "/repeating-timer",
              },
            ].map((useCase) => (
              <Link href={useCase.link} key={useCase.title}>
                <div className="bg-white rounded-xl p-6 border hover:border-blue-300 hover:shadow-md transition-all cursor-pointer h-full">
                  <div className="text-3xl mb-3">{useCase.icon}</div>
                  <h3 className="font-semibold text-gray-900 mb-2">{useCase.title}</h3>
                  <p className="text-sm text-gray-500">{useCase.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Teaser */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Free to start, Pro for power users
          </h2>
          <p className="text-gray-500 mb-8">
            Build and run timers for free. Upgrade to Pro for unlimited presets,
            spoken alerts, and advanced display options.
          </p>
          <div className="grid sm:grid-cols-2 gap-6 text-left mb-8">
            <div className="border rounded-xl p-6">
              <div className="font-semibold text-lg mb-1">Free</div>
              <div className="text-3xl font-bold mb-4">$0</div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>✓ Unlimited timer runs</li>
                <li>✓ Up to 3 saved presets</li>
                <li>✓ Sound alerts</li>
                <li>✓ Large display mode</li>
                <li>✓ 1 repeating timer</li>
              </ul>
            </div>
            <div className="border-2 border-blue-500 rounded-xl p-6 relative">
              <Badge className="absolute -top-3 right-4 bg-blue-600">Popular</Badge>
              <div className="font-semibold text-lg mb-1">Pro</div>
              <div className="text-3xl font-bold mb-1">
                $3.99<span className="text-base font-normal text-gray-500">/mo</span>
              </div>
              <div className="text-sm text-gray-500 mb-4">or $24.99/year</div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>✓ Unlimited presets</li>
                <li>✓ Unlimited repeating timers</li>
                <li>✓ Spoken segment alerts</li>
                <li>✓ Advanced display themes</li>
                <li>✓ Priority support</li>
              </ul>
            </div>
          </div>
          <Link href="/pricing">
            <Button variant="outline">See full comparison</Button>
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-blue-600 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to run your first session?</h2>
        <p className="text-blue-100 mb-8">No signup required. Build your timer in 30 seconds.</p>
        <Link href="/app/timer">
          <Button size="lg" variant="secondary" className="text-base px-8 py-6">
            Start Free Timer →
          </Button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t bg-gray-50 py-10 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <div className="font-semibold text-gray-700">SessionTimer</div>
          <div className="flex gap-6">
            <Link href="/pricing" className="hover:text-gray-700">Pricing</Link>
            <Link href="/presentation-timer" className="hover:text-gray-700">Presentation Timer</Link>
            <Link href="/classroom-timer" className="hover:text-gray-700">Classroom Timer</Link>
            <Link href="/interval-timer" className="hover:text-gray-700">Interval Timer</Link>
          </div>
          <div>© 2026 SessionTimer. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
