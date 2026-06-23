import type { Metadata } from "next";
import { SeoLandingPage } from "@/components/seo/landing-page";

export const metadata: Metadata = {
  title: "Repeating Timer - Simple Visible Timer with Named Segments",
  description: "A repeating timer for routines with named segments, cycles, large display mode, presets, and optional voice announcements.",
};

export default function Page() {
  return <SeoLandingPage title="Repeating timer for recurring routines" keyword="repeating timer" description="Set a sequence once and repeat it for drills, rotations, focus sessions, practice blocks, or household routines." useCases={["Repeat a full sequence for any number of cycles.", "Choose zero cycles for repeat-until-stopped routines.", "Run saved routines from any device after signing in.", "Keep the UI clean enough for classrooms and presentations."]} />;
}
