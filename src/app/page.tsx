import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, BellRing, Maximize2, Mic, Repeat, Tags } from "lucide-react";
import { MarketingNav } from "@/components/marketing-nav";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Visual Session Timer - Simple Visible Timer with Named Segments",
  description:
    "A clean visual timer for teachers, speakers, coaches, and routines. Create named segments, repeating intervals, presets, and spoken alerts in seconds.",
};

export default function HomePage() {
  return (
    <main className="bg-white text-zinc-950">
      <MarketingNav />
      <section className="border-b bg-gradient-to-b from-blue-50 to-white">
        <div className="mx-auto grid min-h-[calc(100vh-72px)] max-w-7xl items-center gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_560px] lg:px-8">
          <div>
            <Badge variant="secondary" className="mb-4">No signup required</Badge>
            <h1 className="max-w-4xl text-4xl font-semibold tracking-tight sm:text-6xl">A visible session timer for real rooms and routines</h1>
            <p className="mt-5 max-w-2xl text-lg text-zinc-600">
              Build named segments, repeat interval routines, save presets, and run a full-screen timer that teachers, speakers, coaches, and groups can read from across the room.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg"><Link href="/app/timer">Start free timer <ArrowRight className="size-4" /></Link></Button>
              <Button asChild size="lg" variant="outline"><Link href="/templates">Browse templates</Link></Button>
            </div>
          </div>
          <div className="rounded-md bg-zinc-950 p-5 text-white shadow-2xl">
            <div className="mb-4 flex items-center justify-between text-sm text-zinc-400">
              <span>Classroom Rotation</span>
              <span>Cycle 1 of 3</span>
            </div>
            <div className="rounded-md bg-blue-600 p-8 text-center">
              <div className="font-mono text-7xl font-bold tabular-nums sm:text-8xl">08:42</div>
              <div className="mt-4 text-3xl font-semibold">Station 1</div>
              <div className="mt-3 text-blue-100">Next: Station 2</div>
              <div className="mt-8 h-2 rounded-full bg-white/25">
                <div className="h-2 w-[28%] rounded-full bg-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <Feature icon={<Maximize2 />} title="Large display" text="A high-contrast countdown with current segment, next segment, color, and progress." />
        <Feature icon={<Tags />} title="Named segments" text="Label warmups, group work, Q&A, rest, wash, fold, or any part of a routine." />
        <Feature icon={<Repeat />} title="Repeating mode" text="Run one sequence once, repeat it for a fixed number of cycles, or repeat until stopped." />
        <Feature icon={<BellRing />} title="Sound and speech" text="Use transition tones and optional browser text-to-speech announcements." />
      </section>

      <section className="border-y bg-zinc-50 px-4 py-14">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-semibold tracking-tight">Built for everyday structured sessions</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              ["Classrooms", "/classroom-timer", "Station rotations, group work, clean-up, and independent practice blocks."],
              ["Presentations", "/presentation-timer", "Introductions, core talk sections, warnings, and Q&A timing."],
              ["Workouts", "/workout-interval-timer", "Work/rest intervals with neutral, non-fitness-only timer controls."],
              ["Study routines", "/repeating-timer", "Focus and break cycles with saved presets and spoken transitions."],
            ].map(([title, href, text]) => (
              <Link key={href} href={href} className="rounded-md border bg-white p-5 transition hover:border-blue-300 hover:shadow-sm">
                <h3 className="font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-zinc-600">{text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 text-center">
        <Mic className="mx-auto mb-4 size-8 text-blue-600" />
        <h2 className="text-3xl font-semibold tracking-tight">Start in guest mode, save when you are ready</h2>
        <p className="mt-3 text-zinc-600">Run unlimited manual timers immediately. Create an account only when you want cloud presets across devices.</p>
        <Button asChild size="lg" className="mt-7"><Link href="/app/timer">Build a timer</Link></Button>
      </section>
    </main>
  );
}

function Feature({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="rounded-md border p-5">
      <div className="mb-3 text-blue-600 [&_svg]:size-5">{icon}</div>
      <h2 className="font-semibold">{title}</h2>
      <p className="mt-2 text-sm text-zinc-600">{text}</p>
    </div>
  );
}
