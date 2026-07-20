"use client";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "@/lib/auth-client";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell,
} from "recharts";

const API = process.env.NEXT_PUBLIC_API_URL;

const COLORS = ["#7C3AED", "#EC4899", "#06B6D4", "#F59E0B", "#10B981", "#EF4444"];

export default function AdminAnalyticsPage() {
  const { data: session } = useSession();
  const token = session?.session?.token;

  const { data } = useQuery({
    queryKey: ["admin-analytics"],
    queryFn: async () => {
      const res = await fetch(`${API}/analytics`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch analytics");
      return res.json();
    },
    enabled: !!token,
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-text-primary mb-8">Analytics</h1>

      <div className="grid gap-6 sm:grid-cols-3 mb-8">
        {[
          { label: "Total Products", value: data?.totalProducts ?? 0, color: "text-gaming-purple" },
          { label: "Total Orders", value: data?.totalOrders ?? 0, color: "text-gaming-pink" },
          { label: "Revenue", value: `$${(data?.totalRevenue ?? 0).toFixed(2)}`, color: "text-gaming-emerald" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-border-light bg-white p-5">
            <p className="text-sm text-text-muted mb-1">{s.label}</p>
            <p className={`text-3xl font-bold text-text-primary ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2 mb-8">
        <div className="rounded-xl border border-border-light bg-white p-5">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Orders by Day (Last 30)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={(data?.ordersByDay || []).map((d: any) => ({ ...d, date: d._id }))}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="date" stroke="#6B7280" fontSize={11} />
              <YAxis stroke="#6B7280" fontSize={11} />
              <Tooltip contentStyle={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 8 }} />
              <Line type="monotone" dataKey="count" stroke="#7C3AED" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="rounded-xl border border-border-light bg-white p-5">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Revenue by Day</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={(data?.ordersByDay || []).map((d: any) => ({ ...d, date: d._id }))}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="date" stroke="#6B7280" fontSize={11} />
              <YAxis stroke="#6B7280" fontSize={11} />
              <Tooltip contentStyle={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 8 }} />
              <Bar dataKey="revenue" fill="#7C3AED" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border-light bg-white p-5">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Products by Category</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={(data?.categoryBreakdown || []).map((c: any) => ({ name: c._id, value: c.count }))}
                dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={({ name }) => name}>
                {(data?.categoryBreakdown || []).map((_: any, i: number) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 8 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="rounded-xl border border-border-light bg-white p-5">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Orders by Status</h3>
          <div className="space-y-3">
            {(data?.ordersByStatus || []).map((s: any) => (
              <div key={s._id} className="flex items-center justify-between">
                <span className="text-sm text-text-primary capitalize">{s._id}</span>
                <span className="text-sm font-semibold text-text-primary">{s.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
