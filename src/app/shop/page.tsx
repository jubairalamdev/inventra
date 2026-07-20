"use client";

import { useState, Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams, useRouter } from "next/navigation";
import ProductCard, { ProductCardSkeleton } from "@/components/cards/ProductCard";
import { useSession } from "@/lib/auth-client";
import RecommendationSidebar from "@/components/ai/RecommendationSidebar";

const API = process.env.NEXT_PUBLIC_API_URL;

function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: session } = useSession();
  const token = session?.session?.token;

  const [cursor, setCursor] = useState<string | undefined>();
  const [showRecs, setShowRecs] = useState(false);

  const category = searchParams.get("category") || "";
  const brand = searchParams.get("brand") || "";
  const q = searchParams.get("q") || "";
  const sort = searchParams.get("sort") || "newest";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";

  const params = new URLSearchParams();
  if (category) params.set("category", category);
  if (brand) params.set("brand", brand);
  if (q) params.set("search", q);
  if (sort) params.set("sort", sort);
  if (minPrice) params.set("minPrice", minPrice);
  if (maxPrice) params.set("maxPrice", maxPrice);
  if (cursor) params.set("cursor", cursor);
  params.set("limit", "12");

  const { data, isLoading } = useQuery({
    queryKey: ["shop", category, brand, q, sort, minPrice, maxPrice, cursor],
    queryFn: async () => {
      const res = await fetch(`${API}/products?${params.toString()}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json() as Promise<{ items: any[]; nextCursor: string | null; categories: string[]; brands: string[] }>;
    },
  });

  const updateFilter = (key: string, value: string) => {
    const sp = new URLSearchParams(searchParams.toString());
    if (value) sp.set(key, value);
    else sp.delete(key);
    setCursor(undefined);
    router.push(`/shop?${sp.toString()}`);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-text-primary">Shop Gaming Gadgets</h1>
        {token && (
          <button
            onClick={() => setShowRecs(!showRecs)}
            className="rounded-lg border border-gaming-purple bg-gaming-purple px-4 py-2 text-sm text-white hover:text-white hover:border-gaming-purple/30 transition-all"
          >
            {showRecs ? "Hide Recommendations" : "AI Recommendations"}
          </button>
        )}
      </div>

      {showRecs && token && (
        <div className="mb-8">
          <RecommendationSidebar category={category || undefined} />
        </div>
      )}

      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Filters Sidebar */}
        <aside className="lg:w-64 shrink-0">
          <div className="rounded-xl border border-border-light bg-white p-5 space-y-5 sticky top-24">
            <div>
              <label className="text-sm font-semibold text-text-primary block mb-1.5">Search</label>
              <input
                value={q}
                onChange={(e) => updateFilter("q", e.target.value)}
                placeholder="Search products..."
                className="w-full rounded-lg border border-border-light px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-gaming-purple"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-text-primary block mb-1.5">Category</label>
              <select
                value={category}
                onChange={(e) => updateFilter("category", e.target.value)}
                className="w-full rounded-lg border border-border-light px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-gaming-purple"
              >
                <option value="">All Categories</option>
                {data?.categories.map((c: string) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-semibold text-text-primary block mb-1.5">Brand</label>
              <select
                value={brand}
                onChange={(e) => updateFilter("brand", e.target.value)}
                className="w-full rounded-lg border border-border-light px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-gaming-purple"
              >
                <option value="">All Brands</option>
                {data?.brands.map((b: string) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-semibold text-text-primary block mb-1.5">Price</label>
              <div className="flex gap-2">
                <input
                  type="number" placeholder="Min" value={minPrice}
                  onChange={(e) => updateFilter("minPrice", e.target.value)}
                  className="w-full rounded-lg border border-border-light px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-gaming-purple"
                />
                <input
                  type="number" placeholder="Max" value={maxPrice}
                  onChange={(e) => updateFilter("maxPrice", e.target.value)}
                  className="w-full rounded-lg border border-border-light px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-gaming-purple"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-semibold text-text-primary block mb-1.5">Sort By</label>
              <select
                value={sort}
                onChange={(e) => updateFilter("sort", e.target.value)}
                className="w-full rounded-lg border border-border-light px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-gaming-purple"
              >
                <option value="newest">Newest</option>
                <option value="rating">Highest Rated</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="name">Name</option>
              </select>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {isLoading
              ? Array.from({ length: 6 }).map((_, i) => <ProductCardSkeleton key={i} />)
              : data?.items.map((item: any) => (
                  <ProductCard key={item._id} {...item} />
                ))}
          </div>

          {data && data.items.length === 0 && (
            <div className="text-center py-16 text-text-muted">
              <p className="text-lg">No products found</p>
              <p className="mt-1">Try adjusting your filters</p>
            </div>
          )}

          {data?.nextCursor && (
            <div className="flex justify-center mt-8">
              <button
                onClick={() => setCursor(data.nextCursor!)}
                className="rounded-xl border border-border-light bg-white px-8 py-2.5 text-sm font-semibold text-text-primary hover:bg-gray-50 transition-all"
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-7xl px-4 py-20 text-center text-text-muted">Loading shop...</div>}>
      <ShopContent />
    </Suspense>
  );
}
