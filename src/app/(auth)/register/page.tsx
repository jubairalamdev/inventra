"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import { useAuth } from "@/hooks/useAuth";

export default function RegisterPage() {
  const router = useRouter();
  const { user, register } = useAuth();

  if (user) {
    router.replace("/shop");
    return null;
  }

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    setLoading(true);
    try {
      await register(email, password, name);
      toast.success("Account created!");
      router.push("/shop");
    } catch (err: any) {
      toast.error(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-md items-center px-4 py-16">
      <div className="w-full rounded-2xl border border-border-light bg-white p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-text-primary text-center mb-2">Create Account</h1>
        <p className="text-text-muted text-center mb-8">Join Inventra Gaming today</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required
            className="w-full rounded-xl border border-border-light bg-gray-50 px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-gaming-purple" />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required
            className="w-full rounded-xl border border-border-light bg-gray-50 px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-gaming-purple" />
          <input type="password" placeholder="Password (min 8 characters)" value={password} onChange={(e) => setPassword(e.target.value)} required
            className="w-full rounded-xl border border-border-light bg-gray-50 px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-gaming-purple" />
          <button type="submit" disabled={loading}
            className="w-full rounded-xl bg-gaming-purple py-3 text-sm font-semibold text-white hover:bg-gaming-purple/90 disabled:opacity-50 transition-all">
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-text-muted">
          Already have an account? <Link href="/login" className="text-gaming-purple hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
}
