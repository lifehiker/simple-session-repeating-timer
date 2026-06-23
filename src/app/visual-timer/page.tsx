import type { Metadata } from "next";
import { SeoLandingPage } from "@/components/seo/landing-page";

export const metadata: Metadata = {
  title: "Visual Timer - Simple Visible Timer with Named Segments",
  description: "A visual timer for classrooms, speaking, workouts, and routines with large readable countdowns, colors, segments, and presets.",
};

export default function Page() {
  return <SeoLandingPage title="Visual timer readable from across the room" keyword="visual timer" description="Use color, big type, progress, and next-step previews so groups can understand how much time remains without asking." useCases={["Show the current activity name in large text.", "Use segment colors for quick recognition.", "Preview the next segment so transitions are smoother.", "Run a distraction-free timer without ad-heavy clutter."]} />;
}
