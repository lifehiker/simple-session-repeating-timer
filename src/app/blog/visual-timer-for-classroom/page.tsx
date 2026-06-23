import type { Metadata } from "next";
import { BlogPost } from "@/components/seo/blog-post";

export const metadata: Metadata = { title: "Visual Timer for Classroom Activities Students Can See", description: "How to use a visual classroom timer for rotations, group work, cleanup, and independent practice." };
export default function Page() {
  return <BlogPost title="Visual timer for classroom activities students can see" intro="A classroom timer works best when students can understand the current activity and remaining time without interrupting the teacher." sections={[{ heading: "Name the activity", body: "Labels like Station 1, Cleanup, Silent Reading, and Group Share are easier for students to follow than a bare countdown." }, { heading: "Use repeatable routines", body: "Many class structures repeat daily. Templates make station rotations and focus blocks faster to start." }, { heading: "Keep transitions calm", body: "Sound alerts and optional spoken cues can signal changes while the visible display reinforces what comes next." }]} />;
}
