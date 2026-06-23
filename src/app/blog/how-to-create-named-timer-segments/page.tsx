import type { Metadata } from "next";
import { BlogPost } from "@/components/seo/blog-post";

export const metadata: Metadata = { title: "How to Create Named Timer Segments for Any Routine", description: "A practical guide to creating named timer segments for sessions, repeating routines, classes, talks, and workouts." };
export default function Page() {
  return <BlogPost title="How to create named timer segments for any routine" intro="A named timer segment should describe the action people need to take during that block." sections={[{ heading: "Start with the workflow", body: "List what actually happens in order: setup, warmup, work, review, break, Q&A, cleanup, or any domain-specific activity." }, { heading: "Choose readable labels", body: "Short segment names work best on a large display. Use names that people in the room already understand." }, { heading: "Add color only when it helps", body: "Colors are most useful when they signal different types of activity, such as work, rest, warning, or transition." }]} />;
}
