import { PresetInput } from "@/types/timer";

export const STARTER_TEMPLATES: PresetInput[] = [
  {
    name: "Presentation",
    mode: "SESSION",
    segments: [
      {
        name: "Introduction",
        durationSeconds: 5 * 60,
        color: "#3b82f6",
        position: 0,
      },
      {
        name: "Main Talk",
        durationSeconds: 20 * 60,
        color: "#8b5cf6",
        position: 1,
      },
      {
        name: "Q&A",
        durationSeconds: 10 * 60,
        color: "#10b981",
        position: 2,
      },
    ],
  },
  {
    name: "Classroom Rotation",
    mode: "SESSION",
    segments: [
      {
        name: "Station 1",
        durationSeconds: 10 * 60,
        color: "#3b82f6",
        position: 0,
      },
      {
        name: "Station 2",
        durationSeconds: 10 * 60,
        color: "#8b5cf6",
        position: 1,
      },
      {
        name: "Station 3",
        durationSeconds: 10 * 60,
        color: "#10b981",
        position: 2,
      },
    ],
  },
  {
    name: "Workout Intervals",
    mode: "REPEATING",
    repeatCount: 8,
    segments: [
      {
        name: "Work",
        durationSeconds: 40,
        color: "#ef4444",
        position: 0,
      },
      {
        name: "Rest",
        durationSeconds: 20,
        color: "#10b981",
        position: 1,
      },
    ],
  },
  {
    name: "Laundry",
    mode: "SESSION",
    segments: [
      {
        name: "Wash",
        durationSeconds: 30 * 60,
        color: "#3b82f6",
        position: 0,
      },
      {
        name: "Dry",
        durationSeconds: 45 * 60,
        color: "#f59e0b",
        position: 1,
      },
      {
        name: "Fold",
        durationSeconds: 10 * 60,
        color: "#10b981",
        position: 2,
      },
    ],
  },
  {
    name: "Study Session",
    mode: "REPEATING",
    repeatCount: 4,
    segments: [
      {
        name: "Focus",
        durationSeconds: 25 * 60,
        color: "#3b82f6",
        position: 0,
      },
      {
        name: "Break",
        durationSeconds: 5 * 60,
        color: "#10b981",
        position: 1,
      },
    ],
  },
];
