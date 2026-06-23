import type { Metadata } from "next";
import { SeoLandingPage } from "@/components/seo/landing-page";

export const metadata: Metadata = {
  title: "Workout Interval Timer - Named Work and Rest Intervals",
  description: "A workout interval timer with named segments, repeat cycles, large display mode, and spoken work/rest transitions.",
};

export default function Page() {
  return <SeoLandingPage title="Workout interval timer with named work and rest blocks" keyword="workout timer with named intervals" description="Run warmups, work/rest intervals, circuits, cooldowns, and drills without the clutter of overbuilt fitness timer apps." useCases={["Create work, rest, station, and cooldown segments.", "Repeat rounds with a fixed cycle count.", "Use colors to distinguish intensity or stations.", "Keep the timer readable on a phone, tablet, or wall display."]} />;
}
