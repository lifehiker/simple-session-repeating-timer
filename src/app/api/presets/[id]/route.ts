import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { presetInputSchema } from "@/lib/validators/timer";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const preset = await prisma.preset.findFirst({
    where: { id, userId: session.user.id },
    include: { segments: { orderBy: { position: "asc" } } },
  });

  if (!preset) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(preset);
}

export async function PUT(req: NextRequest, { params }: Params) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const body = await req.json();
    const parsed = presetInputSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Validation error" },
        { status: 400 }
      );
    }

    const existing = await prisma.preset.findFirst({
      where: { id, userId: session.user.id },
    });

    if (!existing) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const { name, mode, repeatCount, segments } = parsed.data;

    // Delete old segments and recreate
    await prisma.segment.deleteMany({ where: { presetId: id } });

    const preset = await prisma.preset.update({
      where: { id },
      data: {
        name,
        mode,
        repeatCount: mode === "REPEATING" ? repeatCount : null,
        segments: {
          create: segments.map((s) => ({
            name: s.name,
            durationSeconds: s.durationSeconds,
            color: s.color ?? "#3b82f6",
            position: s.position,
          })),
        },
      },
      include: { segments: { orderBy: { position: "asc" } } },
    });

    return NextResponse.json(preset);
  } catch (err) {
    console.error("[preset PUT] error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const existing = await prisma.preset.findFirst({
    where: { id, userId: session.user.id },
  });

  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await prisma.preset.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
