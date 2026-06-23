"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignupPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());
    const response = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      setLoading(false);
      setError(data.error ?? "Could not create account.");
      return;
    }
    const result = await signIn("credentials", {
      email: payload.email,
      password: payload.password,
      redirect: false,
    });
    setLoading(false);
    if (result?.error) {
      router.push("/login");
      return;
    }
    router.push("/app");
  }

  return (
    <main className="grid min-h-screen place-items-center bg-zinc-50 px-4">
      <div className="w-full max-w-md rounded-md border bg-white p-6 shadow-sm">
        <Link href="/" className="text-lg font-semibold text-blue-600">SessionTimer</Link>
        <h1 className="mt-6 text-2xl font-semibold">Create your timer account</h1>
        <p className="mt-1 text-sm text-zinc-600">No credit card required. Save presets across devices.</p>
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div className="space-y-2"><Label htmlFor="name">Name</Label><Input id="name" name="name" /></div>
          <div className="space-y-2"><Label htmlFor="email">Email</Label><Input id="email" name="email" type="email" required /></div>
          <div className="space-y-2"><Label htmlFor="password">Password</Label><Input id="password" name="password" type="password" minLength={8} required /></div>
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          <Button className="w-full" disabled={loading}>{loading ? "Creating account..." : "Create account"}</Button>
        </form>
        <Button variant="outline" className="mt-3 w-full" onClick={() => signIn("google", { callbackUrl: "/app" })}>
          Continue with Google
        </Button>
        <p className="mt-5 text-center text-sm text-zinc-600">Already have an account? <Link className="font-medium text-zinc-950" href="/login">Sign in</Link></p>
        <p className="mt-3 text-center text-sm text-zinc-600"><Link className="font-medium text-blue-700" href="/app/timer">Use guest mode instead</Link></p>
      </div>
    </main>
  );
}
