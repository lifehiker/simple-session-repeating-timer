import type { Metadata } from "next";
import { SeoLandingPage } from "@/components/seo/landing-page";

export const metadata: Metadata = {
  title: "Presentation Timer - Simple Visible Timer with Named Segments",
  description: "A clean presentation timer for speakers. Create named talk segments, Q&A blocks, large display timing, and spoken alerts in seconds.",
};

export default function Page() {
  return <SeoLandingPage title="Presentation timer with named talk segments" keyword="presentation timer" description="Keep talks, rehearsals, panels, and Q&A blocks on schedule with a large countdown, next-segment preview, saved presets, and transition alerts." useCases={["Break a talk into intro, sections, warning blocks, and Q&A.", "Run the timer fullscreen on a laptop, tablet, or room display.", "Use spoken alerts so you do not need to stare at the clock.", "Save a recurring talk format as a reusable preset."]} />;
}
