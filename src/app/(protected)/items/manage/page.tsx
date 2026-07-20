"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { toast } from "react-toastify";

const API = process.env.NEXT_PUBLIC_API_URL;

interface Product {
  _id: string;
  title: string;
  category: string;
  price: number;
  rating: number;
  tags: string[];
}

export default function ManageItemsPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const token = session?.session?.token;

  const { data, isLoading } = useQuery({
    queryKey: ["manage-items"],
    queryFn: async () => {
      const res = await fetch(`${API}/items?limit=50`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json() as Promise<{ items: Product[] }>;
    },
    enabled: !!token,
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`${API}/items/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Delete failed");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["manage-items"] });
      toast.success("Asset deleted");
      setDeleteId(null);
    },
    onError: () => toast.error("Failed to delete asset"),
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-text-crisp">Inventory Management</h1>
          <p className="text-text-muted mt-1">Manage your deployed AI assets</p>
        </div>
        <Link
          href="/items/add"
          className="rounded-xl bg-cyber-violet px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-cyber-violet/90"
        >
          + New Asset
        </Link>
      </div>

      <div className="rounded-2xl border border-white/10 bg-dark-card/30 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10 text-left text-sm text-text-muted">
              <th className="px-6 py-4 font-medium">Title</th>
              <th className="px-6 py-4 font-medium">Category</th>
              <th className="px-6 py-4 font-medium">Price</th>
              <th className="px-6 py-4 font-medium">Rating</th>
              <th className="px-6 py-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="animate-pulse border-b border-white/5">
                    <td className="px-6 py-4"><div className="h-4 w-40 rounded bg-white/5" /></td>
                    <td className="px-6 py-4"><div className="h-4 w-20 rounded bg-white/5" /></td>
                    <td className="px-6 py-4"><div className="h-4 w-16 rounded bg-white/5" /></td>
                    <td className="px-6 py-4"><div className="h-4 w-12 rounded bg-white/5" /></td>
                    <td className="px-6 py-4"><div className="h-4 w-24 rounded bg-white/5" /></td>
                  </tr>
                ))
              : data?.items.map((item) => (
                  <tr key={item._id} className="border-b border-white/5 text-sm text-text-crisp hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-medium">{item.title}</td>
                    <td className="px-6 py-4">
                      <span className="rounded-full bg-cyber-violet/20 px-3 py-0.5 text-xs text-cyber-violet">{item.category}</span>
                    </td>
                    <td className="px-6 py-4">${item.price.toFixed(2)}</td>
                    <td className="px-6 py-4">{item.rating.toFixed(1)}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <Link
                          href={`/items/${item._id}`}
                          className="rounded-lg border border-white/10 px-3 py-1.5 text-xs transition-colors hover:bg-white/10"
                        >
                          View
                        </Link>
                        <button
                          onClick={() => setDeleteId(item._id)}
                          className="rounded-lg border border-red-500/30 px-3 py-1.5 text-xs text-red-400 transition-colors hover:bg-red-500/10"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>

        {data && data.items.length === 0 && (
          <div className="text-center py-16 text-text-muted">
            <p>No assets yet.</p>
            <Link href="/items/add" className="text-cyber-violet hover:underline mt-2 inline-block">Create your first asset</Link>
          </div>
        )}
      </div>

      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="rounded-2xl border border-white/10 bg-dark-card p-8 max-w-sm w-full mx-4">
            <h3 className="text-xl font-semibold text-text-crisp mb-2">Delete Asset</h3>
            <p className="text-text-muted mb-6">Are you sure? This action cannot be undone.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 rounded-xl border border-white/10 py-2.5 text-sm text-text-crisp hover:bg-white/10"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteMutation.mutate(deleteId)}
                disabled={deleteMutation.isPending}
                className="flex-1 rounded-xl bg-red-500 py-2.5 text-sm font-semibold text-white hover:bg-red-600 disabled:opacity-50"
              >
                {deleteMutation.isPending ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
