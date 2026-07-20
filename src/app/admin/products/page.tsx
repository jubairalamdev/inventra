"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { toast } from "react-toastify";
import { useSession } from "@/lib/auth-client";
import { useState } from "react";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function ManageProductsPage() {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const token = session?.session?.token;
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["admin-products"],
    queryFn: async () => {
      const res = await fetch(`${API}/products?limit=50`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json() as Promise<{ items: any[] }>;
    },
    enabled: !!token,
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`${API}/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Delete failed");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      toast.success("Product deleted");
      setDeleteId(null);
    },
    onError: () => toast.error("Failed to delete product"),
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Manage Products</h1>
          <p className="text-text-muted mt-1">Admin inventory control</p>
        </div>
        <Link href="/admin/products/add" className="rounded-xl bg-gaming-purple px-6 py-2.5 text-sm font-semibold text-white hover:bg-gaming-purple/90">
          + Add Product
        </Link>
      </div>

      <div className="rounded-xl border border-border-light bg-white overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border-light text-left text-sm text-text-muted">
              <th className="px-5 py-3 font-medium">Name</th>
              <th className="px-5 py-3 font-medium">Category</th>
              <th className="px-5 py-3 font-medium">Price</th>
              <th className="px-5 py-3 font-medium">Stock</th>
              <th className="px-5 py-3 font-medium">Rating</th>
              <th className="px-5 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="animate-pulse border-b border-border-light">
                    {[1,2,3,4,5,6].map((j) => (
                      <td key={j} className="px-5 py-4"><div className="h-4 rounded bg-gray-100" /></td>
                    ))}
                  </tr>
                ))
              : data?.items.map((item: any) => (
                  <tr key={item._id} className="border-b border-border-light text-sm text-text-primary hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-4 font-medium">{item.name}</td>
                    <td className="px-5 py-4">
                      <span className="rounded-full bg-gaming-purple/10 px-2.5 py-0.5 text-xs text-gaming-purple">{item.category}</span>
                    </td>
                    <td className="px-5 py-4">${item.price.toFixed(2)}</td>
                    <td className="px-5 py-4">{item.stock}</td>
                    <td className="px-5 py-4">{item.rating?.toFixed(1)}</td>
                    <td className="px-5 py-4">
                      <div className="flex gap-2">
                        <Link href={`/shop/${item._id}`} className="rounded-lg border border-border-light px-3 py-1.5 text-xs hover:bg-gray-50">View</Link>
                        <button onClick={() => setDeleteId(item._id)}
                          className="rounded-lg border border-red-200 px-3 py-1.5 text-xs text-red-500 hover:bg-red-50">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>

      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="rounded-xl border border-border-light bg-white p-6 max-w-sm w-full mx-4 shadow-lg">
            <h3 className="text-lg font-semibold text-text-primary mb-2">Delete Product</h3>
            <p className="text-sm text-text-muted mb-5">Are you sure? This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 rounded-lg border border-border-light py-2 text-sm text-text-primary hover:bg-gray-50">Cancel</button>
              <button onClick={() => deleteMutation.mutate(deleteId)} disabled={deleteMutation.isPending}
                className="flex-1 rounded-lg bg-red-500 py-2 text-sm font-semibold text-white hover:bg-red-600 disabled:opacity-50">
                {deleteMutation.isPending ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
