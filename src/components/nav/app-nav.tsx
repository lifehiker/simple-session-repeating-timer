"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { List, LogOut, Settings, Timer, Home, Sparkles } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { href: "/app", label: "Dashboard", icon: Home },
  { href: "/app/timer", label: "New Timer", icon: Timer },
  { href: "/app/presets", label: "Presets", icon: List },
  { href: "/app/settings", label: "Settings", icon: Settings },
  { href: "/pricing", label: "Upgrade", icon: Sparkles },
];

export function AppNav() {
  const pathname = usePathname();
  const { data } = useSession();

  return (
    <aside className="hidden min-h-screen w-60 shrink-0 border-r bg-white px-4 py-5 lg:block">
      <Link href="/app" className="flex items-center gap-2 px-2 text-lg font-semibold">
        <span className="grid size-8 place-items-center rounded-md bg-blue-600 text-sm text-white">ST</span>
        SessionTimer
      </Link>
      <nav className="mt-8 space-y-1">
        {links.map((link) => {
          const Icon = link.icon;
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950",
                active && "bg-blue-600 text-white hover:bg-blue-600 hover:text-white"
              )}
            >
              <Icon className="size-4" />
              {link.label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-8 rounded-md border bg-zinc-50 p-3 text-sm">
        <div className="font-medium">{data?.user?.name ?? "Guest mode"}</div>
        <div className="truncate text-zinc-500">{data?.user?.email ?? "Local presets on this device"}</div>
        {data?.user ? (
          <Button variant="ghost" size="sm" className="mt-3 w-full justify-start px-2" onClick={() => signOut({ callbackUrl: "/" })}>
            <LogOut className="size-4" />
            Sign out
          </Button>
        ) : (
          <Button asChild variant="outline" size="sm" className="mt-3 w-full">
            <Link href="/login">Sign in</Link>
          </Button>
        )}
      </div>
    </aside>
  );
}
