import { api } from "./http";

export interface Product {
  _id: string;
  name: string;
  description: string;
  longDescription?: string;
  price: number;
  category: string;
  brand?: string;
  images?: string[];
  stock: number;
  rating: number;
  specs?: Record<string, string>;
  reviews?: Array<{ userId: string; userName: string; rating: number; comment: string }>;
  tags?: string[];
  createdAt?: string;
}

export interface ProductsResponse {
  items: Product[];
  nextCursor?: string;
  categories: string[];
  brands: string[];
}

export const productsService = {
  list: (params?: Record<string, string>) => {
    const sp = new URLSearchParams(params || {});
    return api<ProductsResponse>(`/products?${sp.toString()}`);
  },
  getById: (id: string) => api<Product>(`/products/${id}`),
  create: (data: Record<string, unknown>) =>
    api<Product>("/products", { method: "POST", body: JSON.stringify(data) }),
  update: (id: string, data: Record<string, unknown>) =>
    api<Product>(`/products/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  delete: (id: string) =>
    api<{ message: string }>(`/products/${id}`, { method: "DELETE" }),
};
