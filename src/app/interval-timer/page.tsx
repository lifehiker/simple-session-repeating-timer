import type { Metadata } from "next";
import { SeoLandingPage } from "@/components/seo/landing-page";

export const metadata: Metadata = {
  title: "Interval Timer - Simple Visible Timer with Named Segments",
  description: "A simple interval timer with named work/rest segments, repeat cycles, large display mode, sound alerts, and spoken transitions.",
};

export default function Page() {
  return <SeoLandingPage title="A simple interval timer that is not locked to fitness" keyword="interval timer" description="Build work/rest, drill, class rotation, study, or facilitation intervals with names, colors, and repeat counts." useCases={["Repeat one or more named segments for fixed cycles.", "Use infinite repeat mode until you manually stop.", "Save common interval routines as presets.", "Use sound or speech when the room is busy."]} />;
}
