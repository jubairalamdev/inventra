import { api } from "./http";

export interface GeneratePayload {
  title?: string;
  category?: string;
  keywords?: string;
  tone?: string;
}

export interface GenerateResponse {
  title: string;
  description: string;
  category: string;
  tags: string[];
  price: number;
  technicalSpecs: Record<string, string>;
  useCases: string[];
}

export interface RecommendPayload {
  query: string;
  limit?: number;
}

export interface RecommendResponse {
  recommendations: Array<{
    _id: string;
    title: string;
    category: string;
    price: number;
    rating: number;
    matchScore: number;
  }>;
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
