import { api } from "./http";

export interface GeneratePayload {
  name: string;
  category?: string;
  keywords?: string;
}

export interface GenerateResponse {
  description: string;
  longDescription: string;
  tags: string[];
  specs: Record<string, string>;
  price: number;
}

export interface RecommendPayload {
  productId?: string;
  category?: string;
  limit?: number;
}

export interface RecommendResponse {
  recommendations: Product[];
}

interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  description?: string;
  images?: string[];
}

export const aiService = {
  generate: (payload: GeneratePayload) =>
    api<GenerateResponse>("/ai/generate", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  recommend: (payload: RecommendPayload) =>
    api<RecommendResponse>("/ai/recommend", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
};
