import type { Metadata } from "next";
import { SeoLandingPage } from "@/components/seo/landing-page";

export const metadata: Metadata = {
  title: "Speaking Timer - Visible Timer with Voice Alerts",
  description: "A speaking timer with named talk sections, large display mode, next-section previews, and optional spoken segment alerts.",
};

export default function Page() {
  return <SeoLandingPage title="Speaking timer with clear segment cues" keyword="speaking timer with color alerts" description="Structure talks, rehearsals, panels, and workshops with visible timing, colors, and optional spoken transitions." useCases={["Keep an intro, main section, demos, and Q&A on schedule.", "Use a large display instead of a tiny phone timer.", "Hear segment names at transitions.", "Save reusable formats for repeated talks."]} />;
}
