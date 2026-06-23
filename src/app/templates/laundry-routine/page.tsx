import type { Metadata } from "next";
import { STARTER_TEMPLATES } from "@/lib/templates";
import { TemplatePage } from "@/components/seo/template-page";

export const metadata: Metadata = { title: "Laundry Routine Timer Template", description: "A laundry routine timer template with wash, dry, and fold segments." };
export default function Page() {
  return <TemplatePage template={STARTER_TEMPLATES[3]} description="Use this household routine preset for wash, dry, fold, and other recurring chore timers." />;
}
