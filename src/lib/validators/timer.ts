import { z } from "zod";

export const segmentInputSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Segment name is required").max(100),
  durationSeconds: z
    .number()
    .int()
    .min(1, "Duration must be at least 1 second")
    .max(86400, "Duration cannot exceed 24 hours"),
  color: z.string().optional().default("#3b82f6"),
  position: z.number().int().min(0),
});

export const presetInputSchema = z.object({
  name: z.string().min(1, "Preset name is required").max(100),
  mode: z.enum(["SESSION", "REPEATING"]),
  repeatCount: z.number().int().min(1).max(999).optional(),
  segments: z
    .array(segmentInputSchema)
    .min(1, "At least one segment is required"),
});

export type SegmentInputSchema = z.infer<typeof segmentInputSchema>;
export type PresetInputSchema = z.infer<typeof presetInputSchema>;
