import type { Metadata } from "next";
import { STARTER_TEMPLATES } from "@/lib/templates";
import { TemplatePage } from "@/components/seo/template-page";

export const metadata: Metadata = { title: "Tabata Alternative Timer Template", description: "A flexible Tabata alternative with named work and rest intervals." };
export default function Page() {
  return <TemplatePage template={STARTER_TEMPLATES[2]} description="Use this as a less cluttered Tabata alternative where every work and rest block can be renamed for the activity." />;
}
