import type { Metadata } from "next";
import { STARTER_TEMPLATES } from "@/lib/templates";
import { TemplatePage } from "@/components/seo/template-page";

export const metadata: Metadata = { title: "Presentation Timer Template", description: "A presentation timer template with introduction, main talk, and Q&A segments." };
export default function Page() {
  return <TemplatePage template={STARTER_TEMPLATES[0]} description="Use this preset for talks, rehearsals, demos, and live sessions that need a clear Q&A block." />;
}
