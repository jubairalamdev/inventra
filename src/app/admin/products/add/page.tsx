"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useSession } from "@/lib/auth-client";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function AddProductPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const token = session?.session?.token;

  const [form, setForm] = useState({
    name: "",
    description: "",
    longDescription: "",
    price: "",
    category: "Keyboards",
    brand: "",
    stock: "0",
    specs: "{}",
    tags: "",
  });
  const [aiFields, setAiFields] = useState<Record<string, any> | null>(null);

  const generateProduct = useMutation({
    mutationFn: async () => {
      const res = await fetch(`${API}/ai/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ name: form.name, category: form.category, keywords: form.tags }),
      });
      if (!res.ok) throw new Error("AI generation failed");
      return res.json();
    },
    onSuccess: (data) => {
      setAiFields(data);
      setForm((prev) => ({
        ...prev,
        description: data.description || prev.description,
        longDescription: data.longDescription || prev.longDescription,
        price: String(data.price || prev.price),
        tags: data.tags?.join(", ") || prev.tags,
        specs: JSON.stringify(data.specs || {}, null, 2),
      }));
      toast.success("AI description generated!");
    },
    onError: () => toast.error("Failed to generate with AI"),
  });

  const submitProduct = useMutation({
    mutationFn: async () => {
      const specs = form.specs ? JSON.parse(form.specs) : {};
      const res = await fetch(`${API}/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          name: form.name,
          description: form.description,
          longDescription: form.longDescription,
          price: Number(form.price),
          category: form.category,
          brand: form.brand,
          stock: Number(form.stock),
          specs,
          tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
        }),
      });
      if (!res.ok) throw new Error("Failed to create product");
      return res.json();
    },
    onSuccess: () => {
      toast.success("Product added!");
      router.push("/admin/products");
    },
    onError: (err: any) => toast.error(err.message),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.price) {
      toast.error("Name and price are required");
      return;
    }
    submitProduct.mutate();
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <h1 className="text-3xl font-bold text-text-primary mb-8">Add Product</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-text-primary block mb-1">Name *</label>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-xl border border-border-light bg-white px-4 py-3 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-gaming-purple" />
          </div>
          <div>
            <label className="text-sm font-medium text-text-primary block mb-1">Category *</label>
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full rounded-xl border border-border-light bg-white px-4 py-3 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-gaming-purple">
              {["Keyboards", "Mice", "Headsets", "Controllers", "Mousepads", "Chairs", "Monitors", "Speakers", "Webcams", "Capture Cards"].map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-text-primary block mb-1">Price *</label>
            <input type="number" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="w-full rounded-xl border border-border-light bg-white px-4 py-3 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-gaming-purple" />
          </div>
          <div>
            <label className="text-sm font-medium text-text-primary block mb-1">Brand</label>
            <input value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })}
              className="w-full rounded-xl border border-border-light bg-white px-4 py-3 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-gaming-purple" />
          </div>
          <div>
            <label className="text-sm font-medium text-text-primary block mb-1">Stock</label>
            <input type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })}
              className="w-full rounded-xl border border-border-light bg-white px-4 py-3 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-gaming-purple" />
          </div>
          <div>
            <label className="text-sm font-medium text-text-primary block mb-1">Tags (comma separated)</label>
            <input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })}
              className="w-full rounded-xl border border-border-light bg-white px-4 py-3 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-gaming-purple" />
          </div>
        </div>

        <div className="flex justify-end">
          <button type="button" onClick={() => form.name && generateProduct.mutate()} disabled={generateProduct.isPending || !form.name}
            className="rounded-xl border border-gaming-purple/30 text-gaming-purple px-5 py-2.5 text-sm font-semibold hover:bg-gaming-purple/5 disabled:opacity-50 transition-all">
            {generateProduct.isPending ? "Generating..." : "✨ Generate with AI"}
          </button>
        </div>

        <div>
          <label className="text-sm font-medium text-text-primary block mb-1">Short Description</label>
          <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2}
            className="w-full rounded-xl border border-border-light bg-white px-4 py-3 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-gaming-purple" />
        </div>
        <div>
          <label className="text-sm font-medium text-text-primary block mb-1">Long Description</label>
          <textarea value={form.longDescription} onChange={(e) => setForm({ ...form, longDescription: e.target.value })} rows={5}
            className="w-full rounded-xl border border-border-light bg-white px-4 py-3 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-gaming-purple" />
        </div>
        <div>
          <label className="text-sm font-medium text-text-primary block mb-1">Specs (JSON)</label>
          <textarea value={form.specs} onChange={(e) => setForm({ ...form, specs: e.target.value })} rows={5}
            className="w-full rounded-xl border border-border-light bg-white px-4 py-3 font-mono text-xs text-text-primary focus:outline-none focus:ring-2 focus:ring-gaming-purple" />
        </div>

        <button type="submit" disabled={submitProduct.isPending}
          className="w-full rounded-xl bg-gaming-purple py-3 text-sm font-semibold text-white hover:bg-gaming-purple/90 disabled:opacity-50 transition-all">
          {submitProduct.isPending ? "Saving..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}
