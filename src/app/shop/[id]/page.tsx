"use client";

import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useSession } from "@/lib/auth-client";
import { useState } from "react";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { data: session } = useSession();
  const token = session?.session?.token;
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await fetch(`${API}/products/${id}`);
      if (!res.ok) throw new Error("Not found");
      return res.json();
    },
  });

  const addToCart = useMutation({
    mutationFn: async () => {
      const res = await fetch(`${API}/cart/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ productId: id, quantity: qty }),
      });
      if (!res.ok) throw new Error("Failed to add to cart");
    },
    onSuccess: () => {
      toast.success("Added to cart!");
    },
    onError: () => toast.error("Please log in to add items to cart"),
  });

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 animate-pulse">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="h-96 rounded-xl bg-gray-100" />
          <div className="space-y-4">
            <div className="h-8 w-3/4 rounded bg-gray-100" />
            <div className="h-6 w-1/4 rounded bg-gray-100" />
            <div className="h-4 w-full rounded bg-gray-100" />
            <div className="h-4 w-full rounded bg-gray-100" />
            <div className="h-4 w-2/3 rounded bg-gray-100" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) return <div className="text-center py-20 text-text-muted">Product not found</div>;

  const images = product.images?.length ? product.images : [null];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <button onClick={() => router.back()} className="text-sm text-text-muted hover:text-gaming-purple mb-4 flex items-center gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </button>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Images */}
        <div>
          <div className="aspect-square rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden">
            {images[activeImg] ? (
              <img src={images[activeImg]} alt={product.name} className="h-full w-full object-cover" />
            ) : (
              <span className="text-8xl opacity-20">🎮</span>
            )}
          </div>
          {images.length > 1 && (
            <div className="flex gap-2 mt-3">
              {images.map((_: string, i: number) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`w-16 h-16 rounded-lg border-2 overflow-hidden ${i === activeImg ? 'border-gaming-purple' : 'border-border-light'}`}
                >
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center text-xs text-text-muted">
                    {i + 1}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="rounded-full bg-gaming-purple/10 px-3 py-0.5 text-sm font-medium text-gaming-purple">{product.category}</span>
            {product.brand && <span className="text-sm text-text-muted">{product.brand}</span>}
          </div>

          <h1 className="text-3xl font-bold text-text-primary mb-2">{product.name}</h1>

          <div className="flex items-center gap-2 mb-4">
            <span className="text-gaming-amber">{'★'.repeat(Math.round(product.rating))}</span>
            <span className="text-sm text-text-muted">{product.rating.toFixed(1)} rating</span>
          </div>

          <p className="text-3xl font-bold text-text-primary mb-4">${product.price.toFixed(2)}</p>
          <p className={`text-sm mb-4 ${product.stock > 0 ? 'text-gaming-emerald' : 'text-red-500'}`}>
            {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
          </p>

          <p className="text-text-muted mb-6">{product.description}</p>

          {/* Technical Specs */}
          {product.specs && Object.keys(product.specs).length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-text-primary mb-3">Technical Specifications</h3>
              <div className="rounded-xl border border-border-light overflow-hidden">
                <table className="w-full text-sm">
                  <tbody>
                    {Object.entries(product.specs).map(([key, val], i) => (
                      <tr key={key} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                        <td className="px-4 py-2.5 font-medium text-text-primary w-1/3">{key}</td>
                        <td className="px-4 py-2.5 text-text-muted">{val as string}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Long Description */}
          {product.longDescription && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-text-primary mb-2">About This Product</h3>
              <div className="text-sm text-text-muted whitespace-pre-line">{product.longDescription}</div>
            </div>
          )}

          {/* Tags */}
          {product.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {product.tags.map((t: string) => (
                <span key={t} className="rounded-full bg-gray-100 px-3 py-1 text-xs text-text-muted">{t}</span>
              ))}
            </div>
          )}

          {/* Add to Cart */}
          {product.stock > 0 && (
            <div className="flex items-center gap-4">
              <div className="flex items-center rounded-lg border border-border-light">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-2 text-text-muted hover:text-text-primary">-</button>
                <span className="px-3 py-2 text-sm font-medium text-text-primary border-x border-border-light">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="px-3 py-2 text-text-muted hover:text-text-primary">+</button>
              </div>
              <button
                onClick={() => addToCart.mutate()}
                disabled={addToCart.isPending}
                className="flex-1 rounded-xl bg-gaming-purple px-6 py-3 text-sm font-semibold text-white hover:bg-gaming-purple/90 disabled:opacity-50 transition-all"
              >
                {addToCart.isPending ? "Adding..." : "Add to Cart"}
              </button>
            </div>
          )}

          {/* Reviews */}
          {product.reviews?.length > 0 && (
            <div className="mt-8 pt-6 border-t border-border-light">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Reviews ({product.reviews.length})</h3>
              <div className="space-y-4">
                {product.reviews.map((r: any, i: number) => (
                  <div key={i} className="border-b border-border-light pb-4 last:border-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-text-primary">{r.userName}</span>
                      <span className="text-gaming-amber text-sm">{'★'.repeat(r.rating)}</span>
                    </div>
                    <p className="text-sm text-text-muted">{r.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
