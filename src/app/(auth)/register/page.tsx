"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signUp } from "@/lib/auth-client";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error: err } = await signUp.email({ name, email, password });
    if (err) {
      setError(err.message || "Registration failed");
      setLoading(false);
      return;
    }
    router.push("/explore");
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-dark-card/50 p-8 backdrop-blur-sm">
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-bold text-text-crisp">Inventra</Link>
          <p className="text-text-muted mt-2">Create your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="text-sm font-medium text-text-crisp">Full Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              required
              className="mt-1 w-full rounded-xl border border-white/10 bg-slate-deep px-4 py-3 text-sm text-text-crisp placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-cyber-violet"
            />
          </div>
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
              placeholder="•••••••• (min 8 chars)"
              required
              minLength={8}
              className="mt-1 w-full rounded-xl border border-white/10 bg-slate-deep px-4 py-3 text-sm text-text-crisp placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-cyber-violet"
            />
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-cyber-violet py-3 text-sm font-semibold text-white transition-all hover:bg-cyber-violet/90 disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-text-muted">
          Already have an account?{" "}
          <Link href="/login" className="text-cyber-violet hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
