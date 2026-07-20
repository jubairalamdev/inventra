"use client";

import type { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "@/hooks/useAuth";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

const queryClient = new QueryClient();

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <ToastContainer
          position="bottom-right"
          theme="light"
          autoClose={3000}
        />
      </AuthProvider>
    </QueryClientProvider>
  );
}
