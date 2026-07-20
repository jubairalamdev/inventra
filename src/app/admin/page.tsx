"use client";

import Link from "next/link";

const CARDS = [
  { label: "Products", href: "/admin/products", desc: "Manage product catalog", color: "text-gaming-purple" },
  { label: "Orders", href: "/admin/orders", desc: "View and update orders", color: "text-gaming-pink" },
];

export default function AdminDashboard() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-text-primary mb-2">Dashboard</h1>
      <p className="text-text-muted mb-8">Welcome to the admin panel.</p>
      <div className="grid gap-6 sm:grid-cols-2">
        {CARDS.map((c) => (
          <Link key={c.href} href={c.href}
            className="rounded-xl border border-border-light bg-white p-6 hover:shadow-md transition-shadow">
            <p className={`text-2xl font-bold ${c.color} mb-1`}>{c.label}</p>
            <p className="text-sm text-text-muted">{c.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
