"use client";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

const usageData = [
  { name: "Mon", executions: 2400, tokens: 4.2, latency: 145 },
  { name: "Tue", executions: 3200, tokens: 5.8, latency: 132 },
  { name: "Wed", executions: 2800, tokens: 4.9, latency: 158 },
  { name: "Thu", executions: 4500, tokens: 8.1, latency: 121 },
  { name: "Fri", executions: 5100, tokens: 9.3, latency: 138 },
  { name: "Sat", executions: 3800, tokens: 6.7, latency: 142 },
  { name: "Sun", executions: 2900, tokens: 5.2, latency: 135 },
];

const categoryData = [
  { name: "NLP", value: 48 },
  { name: "Vision", value: 36 },
  { name: "Code", value: 42 },
  { name: "Data", value: 29 },
  { name: "Speech", value: 18 },
  { name: "Rec", value: 24 },
];

export default function AnalyticsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text-crisp">Analytics</h1>
        <p className="text-text-muted mt-1">Platform usage and performance metrics</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-3 mb-8">
        {[
          { label: "Total Executions", value: "24,700", change: "+12%", color: "text-cyber-violet" },
          { label: "Avg Latency", value: "139ms", change: "-8%", color: "text-radiant-emerald" },
          { label: "Token Volume", value: "44.2B", change: "+24%", color: "text-electric-cyan" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-white/10 bg-dark-card/30 p-6">
            <p className="text-sm text-text-muted mb-1">{s.label}</p>
            <p className={`text-3xl font-bold text-text-crisp ${s.color}`}>{s.value}</p>
            <p className="text-sm text-text-muted mt-1">{s.change} this week</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2 mb-8">
        <div className="rounded-2xl border border-white/10 bg-dark-card/30 p-6">
          <h3 className="text-lg font-semibold text-text-crisp mb-4">Daily Executions</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={usageData}>
              <defs>
                <linearGradient id="colorExec" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip
                contentStyle={{ background: "#1e293b", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12 }}
                labelStyle={{ color: "#f8fafc" }}
              />
              <Area type="monotone" dataKey="executions" stroke="#6366f1" fill="url(#colorExec)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-2xl border border-white/10 bg-dark-card/30 p-6">
          <h3 className="text-lg font-semibold text-text-crisp mb-4">Latency Trend (ms)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={usageData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip
                contentStyle={{ background: "#1e293b", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12 }}
                labelStyle={{ color: "#f8fafc" }}
              />
              <Line type="monotone" dataKey="latency" stroke="#10b981" strokeWidth={2} dot={{ fill: "#10b981" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-dark-card/30 p-6">
          <h3 className="text-lg font-semibold text-text-crisp mb-4">Assets by Category</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip
                contentStyle={{ background: "#1e293b", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12 }}
                labelStyle={{ color: "#f8fafc" }}
              />
              <Bar dataKey="value" fill="#06b6d4" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-2xl border border-white/10 bg-dark-card/30 p-6">
          <h3 className="text-lg font-semibold text-text-crisp mb-4">Token Usage (B)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={usageData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip
                contentStyle={{ background: "#1e293b", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12 }}
                labelStyle={{ color: "#f8fafc" }}
              />
              <Bar dataKey="tokens" fill="#6366f1" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
