import type { Metadata } from "next";
import { SeoLandingPage } from "@/components/seo/landing-page";

export const metadata: Metadata = {
  title: "Classroom Timer - Simple Visible Timer with Named Segments",
  description: "A classroom visual timer for rotations, group work, cleanup, and study blocks with named segments and large readable display mode.",
};

export default function Page() {
  return <SeoLandingPage title="Classroom timer students can read from their seats" keyword="visual timer for classroom" description="Create station rotations, group work timers, cleanup blocks, and focus sessions with clear segment names and classroom-friendly display." useCases={["Station rotation templates with named stations.", "Large countdown display for projector or tablet use.", "Sound and speech options for transitions.", "Reusable presets for daily classroom routines."]} />;
}
