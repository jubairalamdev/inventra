"use client";

import Link from "next/link";
import { useState } from "react";
import GlowWrapper from "@/components/common/GlowWrapper";

const models = [
  { id: "gpt-4", name: "GPT-4", provider: "OpenAI", desc: "Multi-modal reasoning & code generation" },
  { id: "gemini", name: "Gemini 2.0", provider: "Google", desc: "Multimodal understanding across text, image, audio" },
  { id: "claude", name: "Claude", provider: "Anthropic", desc: "Safe, interpretable AI with large context" },
];

const features = [
  { icon: "⚡", title: "Agentic Execution", desc: "Deploy autonomous AI agents that plan, reason, and execute complex multi-step tasks with tool-calling capabilities." },
  { icon: "🧠", title: "Real-time Memory Sync", desc: "Persistent memory across sessions. Agents recall past interactions, user preferences, and learned behaviors instantly." },
  { icon: "🔧", title: "External Tool Engines", desc: "Connect any API, database, or service. Agents dynamically discover and invoke tools to complete tasks." },
];

const categories = [
  { name: "Natural Language", count: 48, color: "from-cyber-violet/30" },
  { name: "Computer Vision", count: 36, color: "from-electric-cyan/30" },
  { name: "Data Analytics", count: 29, color: "from-radiant-emerald/30" },
  { name: "Code Generation", count: 42, color: "from-cyber-violet/20" },
  { name: "Speech & Audio", count: 18, color: "from-electric-cyan/20" },
  { name: "Recommendation", count: 24, color: "from-radiant-emerald/20" },
];

const testimonials = [
  { quote: "Inventra's agent pipeline cut our deployment time from weeks to hours. The memory sync feature is a game-changer.", name: "Sarah Chen", role: "CTO", company: "DataForge AI" },
  { quote: "We evaluated every AI catalog platform. Inventra's tool engine integration was the only one that worked out of the box.", name: "Marcus Rivera", role: "Lead Engineer", company: "NovaTech Solutions" },
  { quote: "The latency metrics and real-time monitoring gave us the confidence to put AI agents in production.", name: "Priya Sharma", role: "VP AI", company: "CloudSphere" },
];

const insights = [
  { title: "The Rise of Agentic Workflows in Enterprise AI", excerpt: "How autonomous agents are reshaping business processes and why 2025 is the year of agent deployment.", date: "May 12, 2025", tag: "Industry" },
  { title: "Benchmarking Multi-Provider LLM Performance", excerpt: "A comprehensive comparison of latency, cost, and accuracy across OpenAI, Google, and Anthropic models.", date: "April 28, 2025", tag: "Engineering" },
  { title: "Building Resilient Tool-Using Agents", excerpt: "Best practices for designing agents that gracefully handle API failures, rate limits, and unexpected inputs.", date: "April 15, 2025", tag: "Tutorial" },
];

export default function HomePage() {
  const [selectedModel, setSelectedModel] = useState(models[0].id);
  const [email, setEmail] = useState("");

  return (
    <div className="flex flex-col">
      {/* 1. Hero Section */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-slate-deep">
        <div className="absolute inset-0 bg-gradient-radial from-cyber-violet/10 via-transparent to-transparent blur-3xl" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 w-full">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <span className="inline-block rounded-full bg-cyber-violet/20 px-4 py-1.5 text-sm font-medium text-cyber-violet mb-6">
                AI Agent Marketplace
              </span>
              <h1 className="text-4xl font-bold tracking-tight text-text-crisp sm:text-5xl lg:text-6xl">
                Discover & Deploy
                <span className="block text-cyber-violet">Production-Grade AI Agents</span>
              </h1>
              <p className="mt-6 max-w-lg text-lg text-text-muted">
                Browse, test, and integrate hundreds of pre-built AI agents. Open-source models, zero-config deployment, real-time monitoring.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/explore"
                  className="rounded-full bg-cyber-violet px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-cyber-violet/90 hover:scale-105"
                >
                  Explore Catalog
                  <span className="ml-2">→</span>
                </Link>
                <Link
                  href="#features"
                  className="rounded-full border border-white/20 px-8 py-3.5 text-sm font-semibold text-text-crisp transition-all hover:bg-white/10"
                >
                  View Features
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="rounded-2xl border border-white/10 bg-dark-card/50 p-6 backdrop-blur-sm">
                <h3 className="text-sm font-medium text-text-muted mb-4">Interactive Model Selector</h3>
                <div className="flex gap-2 mb-6">
                  {models.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setSelectedModel(m.id)}
                      className={`rounded-lg px-4 py-2 text-sm transition-all ${
                        selectedModel === m.id
                          ? "bg-cyber-violet text-white"
                          : "bg-white/5 text-text-muted hover:bg-white/10"
                      }`}
                    >
                      {m.name}
                    </button>
                  ))}
                </div>
                {models.find((m) => m.id === selectedModel) && (
                  <div className="space-y-2">
                    <p className="text-lg font-semibold text-text-crisp">{models.find((m) => m.id === selectedModel)!.name}</p>
                    <p className="text-sm text-cyber-violet">{models.find((m) => m.id === selectedModel)!.provider}</p>
                    <p className="text-sm text-text-muted">{models.find((m) => m.id === selectedModel)!.desc}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Core Features Grid */}
      <section id="features" className="bg-slate-deep/50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block rounded-full bg-cyber-violet/20 px-4 py-1.5 text-sm font-medium text-cyber-violet mb-4">
              Platform Capabilities
            </span>
            <h2 className="text-3xl font-bold text-text-crisp sm:text-4xl">
              Built for AI Engineers, by AI Engineers
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.title}
                className="group rounded-2xl border border-white/10 bg-dark-card/30 p-8 transition-all hover:-translate-y-1 hover:border-cyber-violet/50 hover:shadow-lg hover:shadow-cyber-violet/5"
              >
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-cyber-violet/10 text-2xl mb-5">{f.icon}</span>
                <h3 className="text-xl font-semibold text-text-crisp mb-3">{f.title}</h3>
                <p className="text-text-muted leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Live Platform Metrics */}
      <section className="bg-slate-deep py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block rounded-full bg-cyber-violet/20 px-4 py-1.5 text-sm font-medium text-cyber-violet mb-4">
              Live Platform Metrics
            </span>
            <h2 className="text-3xl font-bold text-text-crisp sm:text-4xl">
              Real-Time Platform Statistics
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { label: "Executions Today", value: "1,247,893", suffix: "+12%", color: "text-cyber-violet" },
              { label: "Avg Latency", value: "142ms", suffix: "-8%", color: "text-radiant-emerald" },
              { label: "Token Volume", value: "8.4B", suffix: "+24%", color: "text-electric-cyan" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-white/10 bg-dark-card/30 p-8 text-center">
                <p className="text-sm text-text-muted mb-2">{stat.label}</p>
                <p className={`text-4xl font-bold text-text-crisp mb-1 ${stat.color}`}>{stat.value}</p>
                <p className="text-sm text-text-muted">{stat.suffix} from last week</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Interactive Category Showcase */}
      <GlowWrapper color="violet" className="bg-slate-deep/50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block rounded-full bg-cyber-violet/20 px-4 py-1.5 text-sm font-medium text-cyber-violet mb-4">
              Browse by Category
            </span>
            <h2 className="text-3xl font-bold text-text-crisp sm:text-4xl">
              AI Agent Classifications
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                href={`/explore?category=${cat.name.toLowerCase().replace(/\s+/g, "-")}`}
                className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${cat.color} to-transparent p-8 transition-all hover:-translate-y-1 hover:shadow-lg`}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-slate-deep/80 to-transparent" />
                <div className="relative z-10">
                  <h3 className="text-xl font-semibold text-text-crisp mb-2">{cat.name}</h3>
                  <p className="text-sm text-text-muted">{cat.count} agents</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </GlowWrapper>

      {/* 5. Verified Client Testimonials */}
      <section className="bg-slate-deep py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block rounded-full bg-cyber-violet/20 px-4 py-1.5 text-sm font-medium text-cyber-violet mb-4">
              Testimonials
            </span>
            <h2 className="text-3xl font-bold text-text-crisp sm:text-4xl">
              Trusted by AI Teams Worldwide
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((t) => (
              <div key={t.name} className="rounded-2xl border border-white/10 bg-dark-card/30 p-8">
                <div className="mb-6">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-500 text-lg">★</span>
                  ))}
                </div>
                <p className="text-text-muted leading-relaxed mb-6 italic">&ldquo;{t.quote}&rdquo;</p>
                <div>
                  <p className="font-semibold text-text-crisp">{t.name}</p>
                  <p className="text-sm text-text-muted">{t.role}, {t.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Curated Industry Insights */}
      <section className="bg-slate-deep/50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block rounded-full bg-cyber-violet/20 px-4 py-1.5 text-sm font-medium text-cyber-violet mb-4">
              Insights
            </span>
            <h2 className="text-3xl font-bold text-text-crisp sm:text-4xl">
              Curated Industry Insights
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {insights.map((post) => (
              <div key={post.title} className="group rounded-2xl border border-white/10 bg-dark-card/30 overflow-hidden transition-all hover:-translate-y-1 hover:border-cyber-violet/50">
                <div className="h-48 bg-gradient-to-br from-cyber-violet/20 to-electric-cyan/20" />
                <div className="p-6">
                  <span className="inline-block rounded-full bg-cyber-violet/20 px-3 py-1 text-xs font-medium text-cyber-violet mb-3">
                    {post.tag}
                  </span>
                  <h3 className="text-lg font-semibold text-text-crisp mb-2 group-hover:text-cyber-violet transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-text-muted mb-4">{post.excerpt}</p>
                  <p className="text-xs text-text-muted">{post.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Dynamic CTA & Newsletter */}
      <GlowWrapper color="emerald" className="bg-slate-deep py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-text-crisp sm:text-4xl mb-4">
            Ready to Deploy Your First AI Agent?
          </h2>
          <p className="text-lg text-text-muted mb-8 max-w-xl mx-auto">
            Join thousands of developers building with Inventra. Get early access to new models, features, and community events.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert(`Subscribed with ${email}`);
              setEmail("");
            }}
            className="flex max-w-md mx-auto gap-3"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 rounded-full border border-white/10 bg-dark-card/50 px-6 py-3.5 text-sm text-text-crisp placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-cyber-violet"
            />
            <button
              type="submit"
              className="rounded-full bg-radiant-emerald px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-radiant-emerald/90 hover:scale-105"
            >
              Subscribe
            </button>
          </form>
          <p className="mt-4 text-xs text-text-muted">
            No spam. Unsubscribe anytime. Read our{" "}
            <Link href="/" className="text-cyber-violet hover:underline">Privacy Policy</Link>.
          </p>
        </div>
      </GlowWrapper>
    </div>
  );
}
