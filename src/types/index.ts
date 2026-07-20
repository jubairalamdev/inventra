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
  createdAt?: string;
  updatedAt?: string;
}

export interface ItemsResponse {
  items: Product[];
  nextCursor?: string;
  total: number;
}

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

export interface UserProfile {
  _id: string;
  name: string;
  email: string;
  role?: string;
  createdAt: string;
}

export interface Ticket {
  id: string;
  subject: string;
  status: "Open" | "In Progress" | "Resolved";
  priority: "High" | "Medium" | "Low";
  date: string;
}
