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
  reviews?: Review[];
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Review {
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt?: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
  price: number;
  name: string;
  product?: Product;
}

export interface Order {
  _id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: "confirmed" | "shipped" | "delivered" | "cancelled";
  shippingAddress: Address;
  createdAt: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface Ticket {
  _id: string;
  subject: string;
  description: string;
  status: "Open" | "In Progress" | "Resolved";
  priority: "High" | "Medium" | "Low";
  createdAt: string;
}

export interface Analytics {
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  ordersByStatus: Array<{ _id: string; count: number }>;
  ordersByDay: Array<{ _id: string; count: number; revenue: number }>;
  categoryBreakdown: Array<{ _id: string; count: number }>;
}
