"use client";

import {
  createContext,
  useContext,
  useCallback,
  type ReactNode,
} from "react";
import type { AuthUser, AuthContextType } from "@/types/auth";
import { useSession, signIn, signUp, signOut } from "@/lib/auth-client";

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, isPending, refetch } = useSession();

  const user: AuthUser | null = session?.user
    ? {
        id: session.user.id,
        email: session.user.email ?? "",
        fullName: session.user.name ?? "",
        role: (session.user as any).role || "user",
      }
    : null;

  const login = useCallback(
    async (email: string, password: string) => {
      const { error } = await signIn.email({ email, password });
      if (error) throw new Error(error.message || "Login failed");
      await refetch();
    },
    [refetch],
  );

  const register = useCallback(
    async (email: string, password: string, name: string) => {
      const { error } = await signUp.email({ email, password, name });
      if (error) throw new Error(error.message || "Registration failed");
      await refetch();
    },
    [refetch],
  );

  const logout = useCallback(async () => {
    await signOut();
    await refetch();
  }, [refetch]);

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, isLoading: isPending }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
