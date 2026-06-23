import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { canCreatePreset } from "@/lib/billing";
import { presetInputSchema } from "@/lib/validators/timer";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const presets = await prisma.preset.findMany({
    where: { userId: session.user.id, isTemplate: false },
    include: { segments: { orderBy: { position: "asc" } } },
    orderBy: { updatedAt: "desc" },
  });

  return NextResponse.json(presets);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const parsed = presetInputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Validation error" },
      { status: 400 }
    );
  }

  if (!(await canCreatePreset(session.user.id))) {
    return NextResponse.json(
      {
        error: "Free tier limit reached. Upgrade to Pro for unlimited presets.",
        code: "PRESET_LIMIT",
      },
      { status: 403 }
    );
  }

  const { name, mode, repeatCount, segments } = parsed.data;
  const preset = await prisma.preset.create({
    data: {
      userId: session.user.id,
      name,
      mode,
      repeatCount: mode === "REPEATING" ? repeatCount : null,
      segments: {
        create: segments.map((segment, index) => ({
          name: segment.name,
          durationSeconds: segment.durationSeconds,
          color: segment.color ?? "#3b82f6",
          position: index,
        })),
      },
    },
    include: { segments: { orderBy: { position: "asc" } } },
  });

  return NextResponse.json(preset, { status: 201 });
}
