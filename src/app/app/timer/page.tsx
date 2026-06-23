import type { Metadata } from "next";
import { TimerBuilder } from "@/components/timer/timer-builder";

export const metadata: Metadata = {
  title: "Timer Builder",
};

export default function TimerBuilderPage() {
  return (
    <div className="mx-auto max-w-3xl p-4 sm:p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-950">Build your timer</h1>
        <p className="mt-2 text-zinc-600">
          Add named segments, choose session or repeating mode, then start or save the setup.
        </p>
      </div>
      <TimerBuilder />
    </div>
  );
}
