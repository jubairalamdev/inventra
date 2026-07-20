"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ProductCard, { ProductCardSkeleton } from "@/components/cards/ProductCard";

interface Product {
  _id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  category: string;
  tags: string[];
  rating: number;
}

export default function ExplorePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minRating, setMinRating] = useState("");
  const [sort, setSort] = useState("newest");
  const [cursor, setCursor] = useState<string | null>(null);

  const params = new URLSearchParams();
  if (search) params.set("search", search);
  if (category) params.set("category", category);
  if (minPrice) params.set("minPrice", minPrice);
  if (maxPrice) params.set("maxPrice", maxPrice);
  if (minRating) params.set("minRating", minRating);
  if (sort) params.set("sort", sort);
  if (cursor) params.set("cursor", cursor);
  params.set("limit", "12");

  const { data, isLoading } = useQuery({
    queryKey: ["items", search, category, minPrice, maxPrice, minRating, sort, cursor],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/items?${params}`);
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json() as Promise<{ items: Product[]; nextCursor: string | null }>;
    },
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text-crisp">Explore AI Agents</h1>
        <p className="text-text-muted mt-1">Browse our catalog of production-ready AI agents</p>
      </div>

      <div className="flex flex-wrap gap-4 mb-8 items-end">
        <div className="flex-1 min-w-[200px]">
          <label className="text-sm text-text-muted block mb-1">Search</label>
          <input
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCursor(null); }}
            placeholder="Search agents..."
            className="w-full rounded-xl border border-white/10 bg-dark-card/50 px-4 py-2.5 text-sm text-text-crisp placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-cyber-violet"
          />
        </div>

        <div>
          <label className="text-sm text-text-muted block mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => { setCategory(e.target.value); setCursor(null); }}
            className="rounded-xl border border-white/10 bg-dark-card/50 px-4 py-2.5 text-sm text-text-crisp focus:outline-none focus:ring-2 focus:ring-cyber-violet"
          >
            <option value="">All</option>
            <option value="nlp">NLP</option>
            <option value="vision">Computer Vision</option>
            <option value="data">Data Analytics</option>
            <option value="code">Code Generation</option>
            <option value="speech">Speech & Audio</option>
            <option value="recommendation">Recommendation</option>
          </select>
        </div>

        <div>
          <label className="text-sm text-text-muted block mb-1">Min Price</label>
          <input
            type="number"
            value={minPrice}
            onChange={(e) => { setMinPrice(e.target.value); setCursor(null); }}
            placeholder="$0"
            className="w-24 rounded-xl border border-white/10 bg-dark-card/50 px-3 py-2.5 text-sm text-text-crisp placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-cyber-violet"
          />
        </div>

        <div>
          <label className="text-sm text-text-muted block mb-1">Max Price</label>
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => { setMaxPrice(e.target.value); setCursor(null); }}
            placeholder="$999"
            className="w-24 rounded-xl border border-white/10 bg-dark-card/50 px-3 py-2.5 text-sm text-text-crisp placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-cyber-violet"
          />
        </div>

        <div>
          <label className="text-sm text-text-muted block mb-1">Min Rating</label>
          <select
            value={minRating}
            onChange={(e) => { setMinRating(e.target.value); setCursor(null); }}
            className="rounded-xl border border-white/10 bg-dark-card/50 px-4 py-2.5 text-sm text-text-crisp focus:outline-none focus:ring-2 focus:ring-cyber-violet"
          >
            <option value="">Any</option>
            <option value="4">4+ ★</option>
            <option value="3">3+ ★</option>
            <option value="2">2+ ★</option>
          </select>
        </div>

        <div>
          <label className="text-sm text-text-muted block mb-1">Sort By</label>
          <select
            value={sort}
            onChange={(e) => { setSort(e.target.value); setCursor(null); }}
            className="rounded-xl border border-white/10 bg-dark-card/50 px-4 py-2.5 text-sm text-text-crisp focus:outline-none focus:ring-2 focus:ring-cyber-violet"
          >
            <option value="newest">Newest</option>
            <option value="rating">Highest Rated</option>
            <option value="price">Lowest Price</option>
            <option value="downloads">Most Downloaded</option>
          </select>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {isLoading
          ? Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)
          : data?.items.map((item) => <ProductCard key={item._id} {...item} />)}
      </div>

      {data && data.items.length === 0 && (
        <p className="text-center text-text-muted py-20">No agents found matching your filters.</p>
      )}

      {data && data.nextCursor && (
        <div className="flex justify-center mt-10">
          <button
            onClick={() => setCursor(data.nextCursor)}
            className="rounded-full border border-white/20 px-8 py-3 text-sm font-medium text-text-crisp transition-all hover:bg-white/10"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
