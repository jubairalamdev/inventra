"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function OrdersPage() {
  const { data: session } = useSession();
  const token = session?.session?.token;

  const { data, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await fetch(`${API}/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch orders");
      return res.json() as Promise<{ orders: any[] }>;
    },
    enabled: !!token,
  });

  if (!session) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="text-3xl font-bold text-text-primary mb-4">My Orders</h1>
        <p className="text-text-muted mb-6">Please log in to view your orders.</p>
        <Link href="/login" className="rounded-xl bg-gaming-purple px-6 py-2.5 text-sm font-semibold text-white">Log In</Link>
      </div>
    );
  }

  const orders = data?.orders || [];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <h1 className="text-3xl font-bold text-text-primary mb-8">My Orders</h1>

      {isLoading ? (
        <div className="space-y-4 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-28 rounded-xl bg-gray-100" />
          ))}
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-text-muted text-lg mb-4">No orders yet</p>
          <Link href="/shop" className="rounded-xl bg-gaming-purple px-6 py-2.5 text-sm font-semibold text-white">Start Shopping</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order: any) => (
            <div key={order._id} className="rounded-xl border border-border-light bg-white p-5">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <span className="text-xs text-text-muted font-mono">#{order._id.slice(-8)}</span>
                  <span className="ml-3 text-sm text-text-muted">{new Date(order.createdAt).toLocaleDateString()}</span>
                </div>
                <span className={`rounded-full px-3 py-0.5 text-xs font-medium ${
                  order.status === "confirmed" ? "bg-gaming-purple/10 text-gaming-purple"
                  : "bg-gaming-emerald/10 text-gaming-emerald"
                }`}>
                  {order.status}
                </span>
              </div>
              <div className="text-sm text-text-muted space-y-1">
                {order.items.map((item: any, i: number) => (
                  <div key={i} className="flex justify-between">
                    <span>{item.name} x{item.quantity}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-3 pt-3 border-t border-border-light font-bold text-text-primary">
                <span>Total</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
