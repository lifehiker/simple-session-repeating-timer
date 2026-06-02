"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface RepeatCountInputProps {
  value: number;
  onChange: (value: number) => void;
}

export function RepeatCountInput({ value, onChange }: RepeatCountInputProps) {
  const decrement = () => {
    if (value > 1) onChange(value - 1);
    if (value === 1) onChange(0); // 0 means infinite
  };

  const increment = () => {
    if (value === 0) onChange(2);
    else onChange(Math.min(value + 1, 999));
  };

  return (
    <div className="space-y-2">
      <Label>Repeat count (0 = infinite)</Label>
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={decrement}
          className="w-10 h-10 p-0 text-lg"
        >
          −
        </Button>
        <Input
          type="number"
          min={0}
          max={999}
          value={value}
          onChange={(e) => {
            const v = parseInt(e.target.value, 10);
            if (!isNaN(v) && v >= 0 && v <= 999) onChange(v);
          }}
          className="w-20 text-center"
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={increment}
          className="w-10 h-10 p-0 text-lg"
        >
          +
        </Button>
        <span className="text-sm text-gray-500">
          {value === 0 ? "∞ cycles" : `${value} cycle${value !== 1 ? "s" : ""}`}
        </span>
      </div>
    </div>
  );
}
