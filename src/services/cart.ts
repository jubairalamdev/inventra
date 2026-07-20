import { api } from "./http";

export interface CartItem {
  productId: string;
  quantity: number;
  price: number;
  name: string;
  product?: {
    _id: string;
    name: string;
    price: number;
    images?: string[];
    stock: number;
  };
}

export const cartService = {
  get: () => api<{ items: CartItem[] }>("/cart"),
  add: (productId: string, quantity = 1) =>
    api<{ items: CartItem[] }>("/cart/add", {
      method: "POST",
      body: JSON.stringify({ productId, quantity }),
    }),
  update: (productId: string, quantity: number) =>
    api<{ items: CartItem[] }>("/cart/update", {
      method: "PUT",
      body: JSON.stringify({ productId, quantity }),
    }),
  remove: (productId: string) =>
    api<{ items: CartItem[] }>(`/cart/remove/${productId}`, { method: "DELETE" }),
};
