import { api } from "./http";

export interface Product {
  _id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  tags: string[];
  technicalSpecs?: Record<string, string>;
  useCases?: string[];
  imageUrl?: string;
}

export interface ItemsResponse {
  items: Product[];
  nextCursor?: string;
  total: number;
}

export const itemsService = {
  list: (params?: { cursor?: string; limit?: number; category?: string; q?: string; sort?: string; order?: string }) => {
    const sp = new URLSearchParams();
    if (params?.cursor) sp.set("cursor", params.cursor);
    if (params?.limit) sp.set("limit", String(params.limit));
    if (params?.category) sp.set("category", params.category);
    if (params?.q) sp.set("q", params.q);
    if (params?.sort) sp.set("sort", params.sort);
    if (params?.order) sp.set("order", params.order);
    const qs = sp.toString();
    return api<ItemsResponse>(`/items${qs ? `?${qs}` : ""}`);
  },

  getById: (id: string) => api<Product>(`/items/${id}`),

  create: (data: Record<string, unknown>) =>
    api<Product>("/items", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id: string, data: Record<string, unknown>) =>
    api<Product>(`/items/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  delete: (id: string) =>
    api<{ message: string }>(`/items/${id}`, { method: "DELETE" }),
};
