"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import Link from "next/link";

interface Product {
  _id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  category: string;
  tags: string[];
  rating: number;
  downloads: number;
  telemetry: Record<string, any>;
}

export default function ItemDetailPage() {
  const { id } = useParams<{ id: string }>();

  const { data: item, isLoading } = useQuery({
    queryKey: ["item", id],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/items/${id}`);
      if (!res.ok) throw new Error("Not found");
      return res.json() as Promise<Product>;
    },
  });

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 animate-pulse">
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="h-96 rounded-2xl bg-white/5" />
          <div className="space-y-4">
            <div className="h-8 w-3/4 rounded bg-white/5" />
            <div className="h-4 w-1/4 rounded bg-white/5" />
            <div className="h-24 w-full rounded bg-white/5" />
          </div>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="flex flex-col items-center justify-center py-32">
        <p className="text-text-muted text-lg">Product not found</p>
        <Link href="/explore" className="text-cyber-violet hover:underline mt-4">Back to catalog</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Link href="/explore" className="text-sm text-text-muted hover:text-text-crisp transition-colors mb-6 inline-block">
        ← Back to catalog
      </Link>

      <div className="grid gap-12 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-cyber-violet/10 to-electric-cyan/10 h-96 flex items-center justify-center">
          <span className="text-8xl opacity-20">◆</span>
        </div>

        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="rounded-full bg-cyber-violet/20 px-4 py-1 text-xs font-medium text-cyber-violet">
              {item.category}
            </span>
            <span className="text-yellow-500">{'★'.repeat(Math.round(item.rating))}{'☆'.repeat(5 - Math.round(item.rating))}</span>
            <span className="text-sm text-text-muted">({item.downloads || 0} downloads)</span>
          </div>

          <h1 className="text-3xl font-bold text-text-crisp mb-4">{item.title}</h1>
          <p className="text-text-muted mb-6">{item.shortDescription}</p>

          <div className="flex items-center gap-4 mb-8">
            <span className="text-3xl font-bold text-text-crisp">${item.price.toFixed(2)}</span>
            <button className="rounded-full bg-cyber-violet px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-cyber-violet/90">
              Deploy Now →
            </button>
          </div>

          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {item.tags.map((t) => (
                <span key={t} className="rounded-full bg-white/5 px-3 py-1 text-xs text-text-muted">{t}</span>
              ))}
            </div>
          )}

          <div className="rounded-2xl border border-white/10 bg-dark-card/30 p-6 mb-6">
            <h3 className="text-lg font-semibold text-text-crisp mb-4">Technical Specifications</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><span className="text-text-muted">Category</span><p className="text-text-crisp">{item.category}</p></div>
              <div><span className="text-text-muted">Rating</span><p className="text-text-crisp">{item.rating.toFixed(1)} / 5</p></div>
              <div><span className="text-text-muted">Downloads</span><p className="text-text-crisp">{item.downloads || 0}</p></div>
              <div><span className="text-text-muted">Model ID</span><p className="text-text-crisp text-xs truncate">{item._id}</p></div>
            </div>
          </div>

          <div className="prose prose-invert max-w-none">
            <h3 className="text-lg font-semibold text-text-crisp mb-2">Description</h3>
            <div className="text-text-muted whitespace-pre-line leading-relaxed">
              {item.fullDescription || item.shortDescription}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
