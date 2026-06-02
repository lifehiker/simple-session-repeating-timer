"use client";

import { TimerMode } from "@/types/timer";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ModeToggleProps {
  mode: TimerMode;
  onChange: (mode: TimerMode) => void;
}

export function ModeToggle({ mode, onChange }: ModeToggleProps) {
  return (
    <div className="flex rounded-lg border p-1 gap-1 bg-gray-50">
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => onChange("SESSION")}
        className={cn(
          "flex-1 rounded-md text-sm font-medium transition-all",
          mode === "SESSION"
            ? "bg-white shadow text-gray-900"
            : "text-gray-500 hover:text-gray-700"
        )}
      >
        Session
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => onChange("REPEATING")}
        className={cn(
          "flex-1 rounded-md text-sm font-medium transition-all",
          mode === "REPEATING"
            ? "bg-white shadow text-gray-900"
            : "text-gray-500 hover:text-gray-700"
        )}
      >
        Repeating
      </Button>
    </div>
  );
}
