"use client";

import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";

interface UpgradeModalProps {
  open: boolean;
  onClose: () => void;
  reason?: string;
}

export function UpgradeModal({ open, onClose, reason }: UpgradeModalProps) {
  const router = useRouter();

  function handleUpgrade() {
    trackEvent("upgrade_clicked", { reason: reason ?? "generic" });
    onClose();
    router.push("/pricing");
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            ⭐ Upgrade to Pro
          </DialogTitle>
          <DialogDescription>
            {reason ?? "You've reached the free tier limit."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-blue-50 rounded-lg p-4 text-sm space-y-2">
            <p className="font-semibold text-blue-900">Pro unlocks:</p>
            <ul className="space-y-1 text-blue-800">
              <li>✓ Unlimited saved presets</li>
              <li>✓ Unlimited repeating timers</li>
              <li>✓ Spoken segment alerts</li>
              <li>✓ Advanced display themes</li>
            </ul>
          </div>

          <div className="flex gap-3">
            <Button onClick={handleUpgrade} className="flex-1">
              See Pro Plans
            </Button>
            <Button variant="outline" onClick={onClose}>
              Maybe later
            </Button>
          </div>

          <p className="text-xs text-gray-400 text-center">
            $3.99/month or $24.99/year. Cancel anytime.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
