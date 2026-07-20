"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";

interface Props {
  category?: string;
}

export default function RecommendationSidebar({ category }: Props) {
  const { data: session } = useSession();

  const { data, isLoading } = useQuery({
    queryKey: ["recommend", category],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ai/recommend`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.session?.token}`,
        },
        body: JSON.stringify({ category, limit: 4 }),
      });
      if (!res.ok) return { recommendations: [] };
      return res.json() as Promise<{ recommendations: { _id: string; name: string; price: number; rating: number; category: string; images?: string[] }[] }>;
    },
    enabled: !!session?.session?.token,
  });

  const items = data?.recommendations || [];

  return (
    <div className="rounded-xl border border-border-light bg-white p-5">
      <h3 className="text-lg font-semibold text-text-primary mb-4">AI Recommendations</h3>

      {isLoading && (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse h-16 rounded-lg bg-gray-100" />
          ))}
        </div>
      )}

      {!isLoading && items.length === 0 && (
        <p className="text-sm text-text-muted">Browse products to get personalized recommendations.</p>
      )}

      {items.length > 0 && (
        <div className="space-y-3">
          {items.map((item) => (
            <Link
              key={item._id}
              href={`/shop/${item._id}`}
              className="flex items-center gap-3 rounded-lg border border-border-light p-3 transition-all hover:bg-gray-50"
            >
              <div className="h-12 w-12 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                <span className="text-lg opacity-30">🎮</span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-text-primary truncate">{item.name}</p>
                <div className="flex items-center justify-between mt-0.5">
                  <span className="text-xs text-text-muted">{item.category}</span>
                  <span className="text-xs font-semibold text-text-primary">${item.price.toFixed(2)}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
