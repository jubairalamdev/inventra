"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";

interface Props {
  category: string;
  tags: string[];
}

export default function RecommendationSidebar({ category, tags }: Props) {
  const { data: session } = useSession();

  const { data, isLoading } = useQuery({
    queryKey: ["recommend", category, tags],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ai/recommend`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.session?.token}`,
        },
        body: JSON.stringify({ category, tags, limit: 4 }),
      });
      if (!res.ok) return { items: [] };
      return res.json() as Promise<{ items: { _id: string; title: string; price: number; rating: number; category: string }[] }>;
    },
    enabled: !!session?.session?.token,
  });

  return (
    <div className="rounded-2xl border border-white/10 bg-dark-card/30 p-5">
      <h3 className="text-lg font-semibold text-text-crisp mb-4">AI Recommendations</h3>

      {isLoading && (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse h-16 rounded-xl bg-white/5" />
          ))}
        </div>
      )}

      {data && data.items.length === 0 && !isLoading && (
        <p className="text-sm text-text-muted">Sign in to get personalized recommendations.</p>
      )}

      {data && data.items.length > 0 && (
        <div className="space-y-3">
          {data.items.map((item) => (
            <Link
              key={item._id}
              href={`/items/${item._id}`}
              className="block rounded-xl border border-white/5 bg-white/5 p-3 transition-all hover:bg-white/10"
            >
              <p className="text-sm font-medium text-text-crisp truncate">{item.title}</p>
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-text-muted">{item.category}</span>
                <span className="text-xs font-medium text-text-crisp">${item.price.toFixed(2)}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
