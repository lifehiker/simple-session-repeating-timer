import type { Metadata } from "next";
import { BlogPost } from "@/components/seo/blog-post";

export const metadata: Metadata = { title: "Interval Timer Not Fitness: A Cleaner Timer for Teaching and Speaking", description: "Interval timers are useful beyond HIIT. Use named segments for teaching, speaking, coaching, chores, and study routines." };
export default function Page() {
  return <BlogPost title="Interval timer not fitness: a cleaner timer for teaching and speaking" intro="Intervals are useful for far more than workouts, but many interval apps are visually noisy and strongly fitness-branded." sections={[{ heading: "Neutral routines need neutral UI", body: "Teachers, facilitators, presenters, and coaches often need simple named blocks without gym-specific screens or clutter." }, { heading: "Segments beat alarms", body: "Named segments make it clear whether the room is in setup, work time, discussion, rest, or cleanup." }, { heading: "Presets reduce setup", body: "Reusable routines keep daily class blocks, speaking formats, and drills ready to run." }]} />;
}
