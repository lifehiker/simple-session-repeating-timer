import { AppNav } from "@/components/nav/app-nav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <AppNav />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
