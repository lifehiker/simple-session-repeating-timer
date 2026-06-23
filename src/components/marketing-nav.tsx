import Link from "next/link";
import { Button } from "@/components/ui/button";

export function MarketingNav() {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-semibold"><span className="grid size-8 place-items-center rounded-md bg-blue-600 text-sm text-white">ST</span>SessionTimer</Link>
        <nav className="hidden items-center gap-6 text-sm text-zinc-600 md:flex">
          <Link href="/presentation-timer">Presentation</Link>
          <Link href="/classroom-timer">Classroom</Link>
          <Link href="/templates">Templates</Link>
          <Link href="/pricing">Pricing</Link>
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost"><Link href="/login">Log in</Link></Button>
          <Button asChild><Link href="/app/timer">Start free timer</Link></Button>
        </div>
      </div>
    </header>
  );
}
