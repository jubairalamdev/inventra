"use client";

export const dynamic = 'force-dynamic';

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useSession } from "@/lib/auth-client";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function CheckoutPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const token = session?.session?.token;

  const [address, setAddress] = useState({ street: "", city: "", state: "", zip: "", country: "US" });

  const { data: cart } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const res = await fetch(`${API}/cart`, { headers: { Authorization: `Bearer ${token}` } });
      if (!res.ok) throw new Error("Failed to fetch cart");
      return res.json() as Promise<{ items: any[] }>;
    },
    enabled: !!token,
  });

  const placeOrder = useMutation({
    mutationFn: async () => {
      const res = await fetch(`${API}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ shippingAddress: address }),
      });
      if (!res.ok) throw new Error("Failed to place order");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Order placed!");
      router.push("/orders");
    },
    onError: () => toast.error("Failed to place order"),
  });

  if (!session) {
    router.push("/login");
    return null;
  }

  const items = cart?.items || [];
  const total = items.reduce((sum: number, i: any) => sum + (i.product?.price || i.price) * i.quantity, 0);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <h1 className="text-3xl font-bold text-text-primary mb-8">Checkout</h1>

      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <h2 className="text-lg font-semibold text-text-primary mb-4">Shipping Address</h2>
          <div className="space-y-3">
            <input placeholder="Street Address" value={address.street} onChange={(e) => setAddress({ ...address, street: e.target.value })}
              className="w-full rounded-xl border border-border-light px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-gaming-purple" />
            <div className="grid grid-cols-2 gap-3">
              <input placeholder="City" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })}
                className="w-full rounded-xl border border-border-light px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-gaming-purple" />
              <input placeholder="State" value={address.state} onChange={(e) => setAddress({ ...address, state: e.target.value })}
                className="w-full rounded-xl border border-border-light px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-gaming-purple" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <input placeholder="ZIP Code" value={address.zip} onChange={(e) => setAddress({ ...address, zip: e.target.value })}
                className="w-full rounded-xl border border-border-light px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-gaming-purple" />
              <input placeholder="Country" value={address.country} onChange={(e) => setAddress({ ...address, country: e.target.value })}
                className="w-full rounded-xl border border-border-light px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-gaming-purple" />
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-text-primary mb-4">Order Summary</h2>
          <div className="rounded-xl border border-border-light bg-white p-4 space-y-3">
            {items.map((i: any) => {
              const p = i.product || i;
              return (
                <div key={i.productId} className="flex justify-between text-sm">
                  <span className="text-text-primary">{p.name} x{i.quantity}</span>
                  <span className="text-text-muted">${(p.price * i.quantity).toFixed(2)}</span>
                </div>
              );
            })}
            <div className="border-t border-border-light pt-3 flex justify-between font-bold text-text-primary">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <button
            onClick={() => placeOrder.mutate()}
            disabled={placeOrder.isPending || !address.street || !address.city}
            className="mt-4 w-full rounded-xl bg-gaming-purple py-3 text-sm font-semibold text-white hover:bg-gaming-purple/90 disabled:opacity-50 transition-all"
          >
            {placeOrder.isPending ? "Placing Order..." : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
}
