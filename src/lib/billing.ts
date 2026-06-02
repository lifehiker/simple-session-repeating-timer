import { prisma } from "@/lib/prisma";

export const FREE_PRESET_LIMIT = 3;
export const FREE_REPEATING_LIMIT = 1;

export async function isPro(userId: string): Promise<boolean> {
  try {
    const subscription = await prisma.subscription.findUnique({
      where: { userId },
    });

    if (!subscription) return false;
    if (subscription.status !== "active") return false;

    if (subscription.currentPeriodEnd) {
      return subscription.currentPeriodEnd > new Date();
    }

    return true;
  } catch {
    return false;
  }
}

export async function getUserPresetCount(userId: string): Promise<number> {
  try {
    return await prisma.preset.count({
      where: { userId, isTemplate: false },
    });
  } catch {
    return 0;
  }
}

export async function canCreatePreset(userId: string): Promise<boolean> {
  const pro = await isPro(userId);
  if (pro) return true;

  const count = await getUserPresetCount(userId);
  return count < FREE_PRESET_LIMIT;
}
