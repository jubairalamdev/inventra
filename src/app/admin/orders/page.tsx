"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useSession } from "@/lib/auth-client";

const API = process.env.NEXT_PUBLIC_API_URL;
const STATUS_COLORS: Record<string, string> = {
  confirmed: "bg-yellow-100 text-yellow-700 border-yellow-200",
  shipped: "bg-blue-100 text-blue-700 border-blue-200",
  delivered: "bg-green-100 text-green-700 border-green-200",
  cancelled: "bg-red-100 text-red-700 border-red-200",
};

export default function AdminOrdersPage() {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const token = session?.session?.token;

  const { data, isLoading } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: async () => {
      const res = await fetch(`${API}/orders/admin`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch orders");
      return res.json() as Promise<{ orders: any[] }>;
    },
    enabled: !!token,
  });

  const statusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const res = await fetch(`${API}/orders/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Failed to update status");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-orders"] });
      toast.success("Order status updated");
    },
    onError: (err: any) => toast.error(err.message),
  });

  function formatDate(d: string) {
    return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Orders</h1>
          <p className="text-text-muted mt-1">Manage customer orders</p>
        </div>
      </div>

      <div className="rounded-xl border border-border-light bg-white overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border-light text-left text-sm text-text-muted">
              <th className="px-5 py-3 font-medium">Order ID</th>
              <th className="px-5 py-3 font-medium">Customer</th>
              <th className="px-5 py-3 font-medium">Items</th>
              <th className="px-5 py-3 font-medium">Total</th>
              <th className="px-5 py-3 font-medium">Date</th>
              <th className="px-5 py-3 font-medium">Status</th>
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
              : data?.orders.map((order: any) => (
                  <tr key={order._id} className="border-b border-border-light text-sm text-text-primary hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-4 font-mono text-xs">{order._id.slice(-8)}</td>
                    <td className="px-5 py-4">{order.userId?._id?.slice(-8) || "N/A"}</td>
                    <td className="px-5 py-4">{order.items.length}</td>
                    <td className="px-5 py-4">${order.total.toFixed(2)}</td>
                    <td className="px-5 py-4 text-text-muted">{formatDate(order.createdAt)}</td>
                    <td className="px-5 py-4">
                      <select
                        value={order.status}
                        onChange={(e) => statusMutation.mutate({ id: order._id, status: e.target.value })}
                        disabled={statusMutation.isPending}
                        className={`rounded-full border px-2.5 py-1 text-xs font-medium capitalize focus:outline-none ${STATUS_COLORS[order.status] || "bg-gray-100 text-gray-700"}`}
                      >
                        <option value="confirmed">Confirmed</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
