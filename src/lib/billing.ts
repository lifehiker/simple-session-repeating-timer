import { prisma } from "@/lib/prisma";

export const FREE_PRESET_LIMIT = 3;
export const FREE_REPEATING_LIMIT = 1;

const PRO_STATUSES = new Set(["active", "trialing"]);
const PRO_TIERS = new Set(["pro"]);

export async function getSubscription(userId: string) {
  return prisma.subscription.findUnique({ where: { userId } });
}

export async function ensureSubscription(userId: string) {
  const existing = await getSubscription(userId);
  if (existing) return existing;

  return prisma.subscription.create({
    data: {
      userId,
      tier: "free",
      status: "inactive",
    },
  });
}

export async function hasProAccess(userId: string): Promise<boolean> {
  try {
    const subscription = await getSubscription(userId);
    if (!subscription) return false;
    if (!PRO_TIERS.has(subscription.tier)) return false;
    if (!PRO_STATUSES.has(subscription.status)) return false;
    if (subscription.currentPeriodEnd && subscription.currentPeriodEnd < new Date()) {
      return false;
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
  if (await hasProAccess(userId)) return true;
  const count = await getUserPresetCount(userId);
  return count < FREE_PRESET_LIMIT;
}

export function tierForPriceId(priceId?: string | null) {
  if (!priceId) return "free";
  if (
    priceId === process.env.STRIPE_PRO_PRICE_ID ||
    priceId === process.env.STRIPE_PRO_ANNUAL_PRICE_ID
  ) {
    return "pro";
  }
  return "free";
}
