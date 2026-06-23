import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
  title: {
    default: "SessionTimer | Simple Session and Repeating Timer",
    template: "%s | SessionTimer",
  },
  description: "A clean visible timer for named sessions, repeating routines, large displays, sound alerts, and spoken segment transitions.",
  manifest: "/manifest.json",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head><meta name="theme-color" content="#2563eb" /></head>
      <body className="min-h-full flex flex-col font-sans antialiased bg-background text-foreground">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
