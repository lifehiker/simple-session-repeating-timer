"use client";

import Link from "next/link";
import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginShell />}>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(event.currentTarget);
    const result = await signIn("credentials", {
      email: form.get("email"),
      password: form.get("password"),
      redirect: false,
    });
    setLoading(false);
    if (result?.error) {
      setError("Invalid email or password.");
      return;
    }
    router.push(params.get("callbackUrl") ?? "/app");
  }

  return (
    <LoginShell>
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div className="space-y-2"><Label htmlFor="email">Email</Label><Input id="email" name="email" type="email" required /></div>
          <div className="space-y-2"><Label htmlFor="password">Password</Label><Input id="password" name="password" type="password" required /></div>
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          <Button className="w-full" disabled={loading}>{loading ? "Signing in..." : "Sign in"}</Button>
        </form>
        <Button variant="outline" className="mt-3 w-full" onClick={() => signIn("google", { callbackUrl: "/app" })}>
          Continue with Google
        </Button>
        <p className="mt-5 text-center text-sm text-zinc-600">No account? <Link className="font-medium text-zinc-950" href="/signup">Create one free</Link></p>
        <p className="mt-3 text-center text-sm text-zinc-600"><Link className="font-medium text-blue-700" href="/app/timer">Continue as guest</Link></p>
    </LoginShell>
  );
}

function LoginShell({ children }: { children?: React.ReactNode }) {
  return (
    <main className="grid min-h-screen place-items-center bg-zinc-50 px-4">
      <div className="w-full max-w-md rounded-md border bg-white p-6 shadow-sm">
        <Link href="/" className="text-lg font-semibold text-blue-600">SessionTimer</Link>
        <h1 className="mt-6 text-2xl font-semibold">Sign in</h1>
        <p className="mt-1 text-sm text-zinc-600">Save presets across devices and manage your timer workspace.</p>
        {children}
      </div>
    </main>
  );
}
