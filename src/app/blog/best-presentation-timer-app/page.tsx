import type { Metadata } from "next";
import { BlogPost } from "@/components/seo/blog-post";

export const metadata: Metadata = { title: "Best Presentation Timer App for Rehearsals and Live Talks", description: "What to look for in a presentation timer app: readable display, named segments, warnings, Q&A blocks, and reusable presets." };
export default function Page() {
  return <BlogPost title="Best presentation timer app for rehearsals and live talks" intro="A good presentation timer is less about stopwatch precision and more about helping a speaker stay aware without breaking flow." sections={[{ heading: "Use named sections", body: "Most talks have an intro, a main point, a demo, a close, and Q&A. Named timer segments make those blocks visible instead of forcing you to remember what a generic countdown means." }, { heading: "Make it readable", body: "A room-facing timer should use large type, strong contrast, and a clear next-section preview. Tiny phone alarms are not enough for rehearsals, panels, or workshops." }, { heading: "Save your formats", body: "If you give similar talks repeatedly, save the segment structure once and adjust durations as needed." }]} />;
}
