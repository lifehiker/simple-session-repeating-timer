import type { Metadata } from "next";
import { STARTER_TEMPLATES } from "@/lib/templates";
import { TemplatePage } from "@/components/seo/template-page";

export const metadata: Metadata = { title: "Classroom Rotation Timer Template", description: "A classroom station rotation timer template with named station segments." };
export default function Page() {
  return <TemplatePage template={STARTER_TEMPLATES[1]} description="Use this classroom rotation preset for station work, small groups, labs, or structured activity blocks." />;
}
