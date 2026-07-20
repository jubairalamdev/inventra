"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { toast } from "react-toastify";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function CartPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const token = session?.session?.token;

  const { data, isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const res = await fetch(`${API}/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch cart");
      return res.json() as Promise<{ items: any[] }>;
    },
    enabled: !!token,
  });

  const updateQty = useMutation({
    mutationFn: async ({ productId, quantity }: { productId: string; quantity: number }) => {
      const res = await fetch(`${API}/cart/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ productId, quantity }),
      });
      if (!res.ok) throw new Error("Failed to update");
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cart"] }),
    onError: () => toast.error("Failed to update quantity"),
  });

  const removeItem = useMutation({
    mutationFn: async (productId: string) => {
      const res = await fetch(`${API}/cart/remove/${productId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to remove");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Item removed");
    },
    onError: () => toast.error("Failed to remove item"),
  });

  if (!session) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="text-3xl font-bold text-text-primary mb-4">Your Cart</h1>
        <p className="text-text-muted mb-6">Please log in to view your cart.</p>
        <Link href="/login" className="rounded-xl bg-gaming-purple px-6 py-2.5 text-sm font-semibold text-white hover:bg-gaming-purple/90">Log In</Link>
      </div>
    );
  }

  const items = data?.items || [];
  const total = items.reduce((sum: number, i: any) => sum + (i.product?.price || i.price) * i.quantity, 0);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <h1 className="text-3xl font-bold text-text-primary mb-8">Shopping Cart</h1>

      {isLoading ? (
        <div className="space-y-4 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 rounded-xl bg-gray-100" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-text-muted text-lg mb-4">Your cart is empty</p>
          <Link href="/shop" className="rounded-xl bg-gaming-purple px-6 py-2.5 text-sm font-semibold text-white hover:bg-gaming-purple/90">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {items.map((item: any) => {
              const p = item.product || item;
              return (
                <div key={item.productId} className="flex items-center gap-4 rounded-xl border border-border-light bg-white p-4">
                  <div className="h-20 w-20 rounded-lg bg-gray-100 flex items-center justify-center shrink-0 overflow-hidden">
                    {p.image_url ? (
                      <img src={p.image_url} alt={p.name} className="h-full w-full object-cover" />
                    ) : (
                      <span className="text-2xl opacity-20">🎮</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link href={`/shop/${item.productId}`} className="font-semibold text-text-primary hover:text-gaming-purple line-clamp-1">
                      {p.name || p.title}
                    </Link>
                    <p className="text-sm text-text-muted">${(p.price).toFixed(2)} each</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQty.mutate({ productId: item.productId, quantity: Math.max(1, item.quantity - 1) })}
                      className="w-8 h-8 rounded-lg border border-border-light text-text-muted hover:text-text-primary"
                    >-</button>
                    <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQty.mutate({ productId: item.productId, quantity: item.quantity + 1 })}
                      className="w-8 h-8 rounded-lg border border-border-light text-text-muted hover:text-text-primary"
                    >+</button>
                  </div>
                  <p className="w-20 text-right font-semibold text-text-primary">${(p.price * item.quantity).toFixed(2)}</p>
                  <button
                    onClick={() => removeItem.mutate(item.productId)}
                    className="text-text-muted hover:text-red-500 transition-colors"
                    aria-label="Remove"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              );
            })}
          </div>

          <div className="mt-8 rounded-xl border border-border-light bg-white p-6">
            <div className="flex items-center justify-between text-lg font-bold text-text-primary mb-4">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button
              onClick={() => router.push("/checkout")}
              className="w-full rounded-xl bg-gaming-purple py-3 text-sm font-semibold text-white hover:bg-gaming-purple/90 transition-all"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
