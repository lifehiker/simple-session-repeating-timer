"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/app", label: "Dashboard", icon: "🏠" },
  { href: "/app/timer", label: "New Timer", icon: "⏱️" },
  { href: "/app/presets", label: "My Presets", icon: "📋" },
  { href: "/app/settings", label: "Settings", icon: "⚙️" },
  { href: "/pricing", label: "Upgrade", icon: "⭐" },
];

export function AppNav() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <aside className="w-56 min-h-screen bg-gray-50 border-r flex flex-col">
      <div className="p-4 border-b">
        <Link href="/" className="font-bold text-lg text-blue-600">
          SessionTimer
        </Link>
      </div>

      <nav className="flex-1 p-3">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                )}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t">
        {session?.user ? (
          <div>
            <div className="text-xs text-gray-500 mb-2 truncate">{session.user.email}</div>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-gray-600"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              Sign out
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="text-xs text-gray-500">Guest mode</div>
            <Link href="/login" className="block">
              <Button size="sm" variant="outline" className="w-full">
                Sign In
              </Button>
            </Link>
            <Link href="/signup" className="block">
              <Button size="sm" className="w-full">
                Sign Up Free
              </Button>
            </Link>
          </div>
        )}
      </div>
    </aside>
  );
}
