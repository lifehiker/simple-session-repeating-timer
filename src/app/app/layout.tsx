import Link from "next/link";
import { AppNav } from "@/components/nav/app-nav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="border-b bg-white px-4 py-3 lg:hidden">
        <div className="flex items-center justify-between">
          <Link href="/app" className="font-semibold text-blue-600">SessionTimer</Link>
          <div className="flex gap-3 text-sm">
            <Link href="/app/timer">Build</Link>
            <Link href="/app/presets">Presets</Link>
            <Link href="/app/settings">Settings</Link>
          </div>
        </div>
      </div>
      <div className="flex">
        <AppNav />
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
