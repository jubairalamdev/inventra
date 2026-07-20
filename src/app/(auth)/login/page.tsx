"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "@/lib/auth-client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error: err } = await signIn.email({ email, password });
    if (err) {
      setError(err.message || "Login failed");
      setLoading(false);
      return;
    }
    router.push("/explore");
  };

  const handleGoogle = async () => {
    await signIn.social({ provider: "google", callbackURL: "/explore" });
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-dark-card/50 p-8 backdrop-blur-sm">
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-bold text-text-crisp">Inventra</Link>
          <p className="text-text-muted mt-2">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="text-sm font-medium text-text-crisp">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="mt-1 w-full rounded-xl border border-white/10 bg-slate-deep px-4 py-3 text-sm text-text-crisp placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-cyber-violet"
            />
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-medium text-text-crisp">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="mt-1 w-full rounded-xl border border-white/10 bg-slate-deep px-4 py-3 text-sm text-text-crisp placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-cyber-violet"
            />
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-cyber-violet py-3 text-sm font-semibold text-white transition-all hover:bg-cyber-violet/90 disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10" /></div>
          <div className="relative flex justify-center"><span className="bg-dark-card/50 px-4 text-sm text-text-muted">or continue with</span></div>
        </div>

        <button
          onClick={handleGoogle}
          className="w-full rounded-xl border border-white/10 bg-white/5 py-3 text-sm font-medium text-text-crisp transition-all hover:bg-white/10"
        >
          Google
        </button>

        <p className="mt-6 text-center text-sm text-text-muted">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-cyber-violet hover:underline">Create one</Link>
        </p>
      </div>
    </div>
  );
}
