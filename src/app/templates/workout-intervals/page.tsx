import type { Metadata } from "next";
import { STARTER_TEMPLATES } from "@/lib/templates";
import { TemplatePage } from "@/components/seo/template-page";

export const metadata: Metadata = { title: "Workout Interval Timer Template", description: "A workout interval template with work and rest segments repeated for eight cycles." };
export default function Page() {
  return <TemplatePage template={STARTER_TEMPLATES[2]} description="Use this workout interval preset for simple work/rest cycles, conditioning drills, or circuit stations." />;
}
