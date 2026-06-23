import type { Metadata } from "next";
import { BlogPost } from "@/components/seo/blog-post";

export const metadata: Metadata = { title: "Repeating Timer with Voice for Drills and Routines", description: "Use a repeating timer with voice announcements for drills, class rotations, practice, workouts, and recurring routines." };
export default function Page() {
  return <BlogPost title="Repeating timer with voice for drills and routines" intro="Voice announcements help when people are moving, teaching, presenting, or focused away from the screen." sections={[{ heading: "Announce the next segment", body: "Browser text-to-speech can read segment names like Work, Rest, Q&A, or Station 2 so users do not need to watch the timer constantly." }, { heading: "Repeat the whole sequence", body: "A useful repeating timer repeats a named sequence, not just one anonymous countdown." }, { heading: "Use graceful fallbacks", body: "Speech support depends on the browser. The app keeps sound alerts and visual transitions available even when voices are unavailable." }]} />;
}
