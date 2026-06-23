import type { Metadata } from "next";
import { STARTER_TEMPLATES } from "@/lib/templates";
import { TemplatePage } from "@/components/seo/template-page";

export const metadata: Metadata = { title: "Study Session Timer Template", description: "A repeating study session timer template with focus and break blocks." };
export default function Page() {
  return <TemplatePage template={STARTER_TEMPLATES[4]} description="Use this focus routine preset for study blocks, writing sessions, practice, or Pomodoro-style cycles." />;
}
