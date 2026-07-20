"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";

interface Props {
  category?: string;
}

export default function RecommendationSidebar({ category }: Props) {
  const { data: session } = useSession();

  const { data, isLoading, isError, error } = useQuery({
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
      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: "Request failed" }));
        throw new Error(err.error || "Request failed");
      }
      return res.json() as Promise<{ recommendations: { _id: string; name: string; price: number; rating: number; category: string; images?: string[] }[] }>;
    },
    enabled: !!session?.session?.token,
    retry: false,
  });

  const items = data?.recommendations || [];

  return (
    <div className="rounded-xl border border-border-light bg-white p-5">
      <div className="flex items-center gap-2 mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gaming-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456Z" />
        </svg>
        <h3 className="text-lg font-semibold text-text-primary">AI Picks</h3>
      </div>

      {isLoading && (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse h-16 rounded-lg bg-gray-100" />
          ))}
        </div>
      )}

      {isError && (
        <div className="rounded-lg bg-amber-50 border border-amber-200 p-3">
          <p className="text-xs text-amber-700">
            AI recommendations are currently unavailable. Showing top-rated picks instead.
          </p>
        </div>
      )}

      {!isLoading && !isError && items.length === 0 && (
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
