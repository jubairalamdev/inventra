"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { toast } from "react-toastify";
import { useSession } from "@/lib/auth-client";
import { useState } from "react";

const API = process.env.NEXT_PUBLIC_API_URL;
const CATEGORIES = ["Keyboards", "Mice", "Headsets", "Controllers", "Mousepads", "Chairs", "Monitors", "Speakers", "Webcams", "Capture Cards"];

export default function ManageProductsPage() {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const token = session?.session?.token;
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  const [editForm, setEditForm] = useState({
    name: "",
    description: "",
    longDescription: "",
    price: "",
    category: "Keyboards",
    brand: "",
    stock: "0",
    image_url: "",
    tags: "",
    specs: "{}",
  });

  function openEdit(product: any) {
    setEditingProduct(product);
    setEditForm({
      name: product.name || "",
      description: product.description || "",
      longDescription: product.longDescription || "",
      price: String(product.price || ""),
      category: product.category || "Keyboards",
      brand: product.brand || "",
      stock: String(product.stock ?? 0),
      image_url: product.image_url || "",
      tags: (product.tags || []).join(", "),
      specs: JSON.stringify(product.specs || {}, null, 2),
    });
  }

  function closeEdit() {
    setEditingProduct(null);
  }

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

  const editMutation = useMutation({
    mutationFn: async () => {
      const specs = editForm.specs ? JSON.parse(editForm.specs) : {};
      const res = await fetch(`${API}/products/${editingProduct._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          name: editForm.name,
          description: editForm.description,
          longDescription: editForm.longDescription,
          price: Number(editForm.price),
          category: editForm.category,
          brand: editForm.brand,
          stock: Number(editForm.stock),
          image_url: editForm.image_url,
          tags: editForm.tags.split(",").map((t: string) => t.trim()).filter(Boolean),
          specs,
        }),
      });
      if (!res.ok) throw new Error("Failed to update product");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      toast.success("Product updated!");
      closeEdit();
    },
    onError: (err: any) => toast.error(err.message),
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
                        <button onClick={() => openEdit(item)}
                          className="rounded-lg border border-border-light px-3 py-1.5 text-xs text-gaming-purple hover:bg-gaming-purple/5">Edit</button>
                        <button onClick={() => setDeleteId(item._id)}
                          className="rounded-lg border border-red-200 px-3 py-1.5 text-xs text-red-500 hover:bg-red-50">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/30 backdrop-blur-sm overflow-y-auto py-10">
          <div className="rounded-xl border border-border-light bg-white w-full max-w-2xl mx-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-border-light px-6 py-4">
              <div>
                <h2 className="text-lg font-semibold text-text-primary">Edit Product</h2>
                <p className="text-sm text-text-muted mt-0.5">Update the product fields below. Changes are saved immediately.</p>
              </div>
              <button onClick={closeEdit} className="rounded-lg p-1.5 text-text-muted hover:bg-gray-100">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">Name</label>
                  <input value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} placeholder="Product name"
                    className="w-full rounded-lg border border-border-light bg-white px-3 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-gaming-purple" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">Category</label>
                  <select value={editForm.category} onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                    className="w-full rounded-lg border border-border-light bg-white px-3 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-gaming-purple">
                    {CATEGORIES.map((c) => (<option key={c} value={c}>{c}</option>))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">Price</label>
                  <input type="number" value={editForm.price} onChange={(e) => setEditForm({ ...editForm, price: e.target.value })} placeholder="0.00"
                    className="w-full rounded-lg border border-border-light bg-white px-3 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-gaming-purple" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">Brand</label>
                  <input value={editForm.brand} onChange={(e) => setEditForm({ ...editForm, brand: e.target.value })} placeholder="Brand name"
                    className="w-full rounded-lg border border-border-light bg-white px-3 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-gaming-purple" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">Stock</label>
                  <input type="number" value={editForm.stock} onChange={(e) => setEditForm({ ...editForm, stock: e.target.value })} placeholder="0"
                    className="w-full rounded-lg border border-border-light bg-white px-3 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-gaming-purple" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">Image URL</label>
                  <input type="url" value={editForm.image_url} onChange={(e) => setEditForm({ ...editForm, image_url: e.target.value })} placeholder="https://..."
                    className="w-full rounded-lg border border-border-light bg-white px-3 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-gaming-purple" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">Tags (comma separated)</label>
                <input value={editForm.tags} onChange={(e) => setEditForm({ ...editForm, tags: e.target.value })} placeholder="tag1, tag2"
                  className="w-full rounded-lg border border-border-light bg-white px-3 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-gaming-purple" />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">Short Description</label>
                <textarea value={editForm.description} onChange={(e) => setEditForm({ ...editForm, description: e.target.value })} rows={2}
                  className="w-full rounded-lg border border-border-light bg-white px-3 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-gaming-purple" />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">Long Description</label>
                <textarea value={editForm.longDescription} onChange={(e) => setEditForm({ ...editForm, longDescription: e.target.value })} rows={4}
                  className="w-full rounded-lg border border-border-light bg-white px-3 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-gaming-purple" />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">Specs (JSON)</label>
                <textarea value={editForm.specs} onChange={(e) => setEditForm({ ...editForm, specs: e.target.value })} rows={4}
                  className="w-full rounded-lg border border-border-light bg-white px-3 py-2.5 font-mono text-xs text-text-primary focus:outline-none focus:ring-2 focus:ring-gaming-purple" />
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 border-t border-border-light px-6 py-4">
              <button onClick={closeEdit} className="rounded-lg border border-border-light px-4 py-2 text-sm text-text-primary hover:bg-gray-50">
                Cancel
              </button>
              <button onClick={() => editMutation.mutate()} disabled={editMutation.isPending}
                className="rounded-lg bg-gaming-purple px-4 py-2 text-sm font-semibold text-white hover:bg-gaming-purple/90 disabled:opacity-50">
                {editMutation.isPending ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}

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
