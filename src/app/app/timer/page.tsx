import { TimerBuilder } from "@/components/timer/timer-builder";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Timer Builder – SessionTimer",
};

export default function TimerBuilderPage() {
  return (
    <div className="p-6 max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Build Your Timer</h1>
        <p className="text-gray-500 mt-1">
          Add segments, choose a mode, then start or save your timer.
        </p>
      </div>

      <TimerBuilder />
    </div>
  );
}
