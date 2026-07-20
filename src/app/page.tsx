"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import ProductCard, { ProductCardSkeleton } from "@/components/cards/ProductCard";
import Image from "next/image";

const API = process.env.NEXT_PUBLIC_API_URL;

const categoryMeta: Record<string, { icon: string; desc: string; color: string }> = {
  Keyboards: { icon: "⌨️", desc: "Mechanical, wireless, custom builds", color: "from-violet-500/20 to-purple-500/20" },
  Mice: { icon: "🖱️", desc: "Esports, MMO, ergonomic designs", color: "from-pink-500/20 to-rose-500/20" },
  Headsets: { icon: "🎧", desc: "Wireless, noise-cancelling, surround", color: "from-cyan-500/20 to-blue-500/20" },
  Controllers: { icon: "🎮", desc: "Console & PC gamepads", color: "from-amber-500/20 to-orange-500/20" },
  Mousepads: { icon: "🧩", desc: "Desk mats, hard pads, RGB", color: "from-emerald-500/20 to-teal-500/20" },
  Chairs: { icon: "🪑", desc: "Ergonomic gaming chairs", color: "from-purple-500/20 to-indigo-500/20" },
  Monitors: { icon: "🖥️", desc: "Gaming monitors, high refresh rate", color: "from-blue-500/20 to-indigo-500/20" },
  Speakers: { icon: "🔊", desc: "Gaming speakers, soundbars", color: "from-cyan-500/20 to-teal-500/20" },
  Webcams: { icon: "📷", desc: "Streaming cameras, accessories", color: "from-gray-500/20 to-slate-500/20" },
  "Capture Cards": { icon: "🎬", desc: "Streaming capture devices", color: "from-red-500/20 to-rose-500/20" },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const benefits = [
  { icon: "🚀", title: "Free Shipping", desc: "Free shipping on all orders over $50. Fast delivery worldwide." },
  { icon: "🛡️", title: "2-Year Warranty", desc: "Every product comes with a comprehensive 2-year manufacturer warranty." },
  { icon: "💬", title: "24/7 Support", desc: "Our gaming experts are available around the clock to help you." },
  { icon: "🔄", title: "30-Day Returns", desc: "Not satisfied? Return any item within 30 days for a full refund." },
  { icon: "⭐", title: "Price Match", desc: "Found a better price? We'll match it and beat it by 5%." },
  { icon: "🔒", title: "Secure Checkout", desc: "256-bit SSL encryption for all your transactions and data." },
];

const testimonials = [
  { name: "Alex Chen", handle: "@alexgaming", text: "The Phantom X keyboard is absolutely insane. Best mechanical I've ever used. The build quality is unmatched.", rating: 5, role: "Pro Streamer" },
  { name: "Sarah Kim", handle: "@sarahk", text: "Got the Quantum headset and it's a game changer. The 7.1 surround sound is incredible for competitive FPS.", rating: 5, role: "Esports Player" },
  { name: "Marcus Johnson", handle: "@marcj", text: "Been buying from Inventra for 2 years. Always top-tier products and lightning fast shipping. Highly recommend.", rating: 5, role: "PC Enthusiast" },
];

export default function HomePage() {
  const { data, isLoading } = useQuery({
    queryKey: ["home-featured"],
    queryFn: async () => {
      const res = await fetch(`${API}/products?sort=rating&limit=3`);
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json() as Promise<{ items: any[]; nextCursor: string | null; categories: string[]; brands: string[] }>;
    },
  });

  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gaming-purple/5 via-white to-gaming-cyan/5">
        <motion.div
          className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-center">
            <motion.div className="flex-1 text-center lg:text-left" variants={itemVariants}>
              <motion.p
                className="mb-4 inline-block rounded-full bg-gaming-purple/10 px-4 py-1.5 text-sm font-medium text-gaming-purple"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                🎮 New Drops Every Week
              </motion.p>
              <h1 className="text-5xl font-bold tracking-tight text-text-primary sm:text-6xl lg:text-7xl">
                Level Up Your
                <br />
                <span className="bg-gradient-to-r from-gaming-purple to-gaming-pink bg-clip-text text-transparent">Battlestation</span>
              </h1>
              <motion.p
                className="mt-4 max-w-xl text-lg text-text-muted leading-relaxed"
                variants={itemVariants}
              >
                Premium gaming gadgets, peripherals, and accessories for the ultimate setup.
                Hand-picked for performance, durability, and style.
              </motion.p>
              <motion.div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start" variants={itemVariants}>
                <Link
                  href="/shop"
                  className="group relative overflow-hidden rounded-xl bg-gaming-purple px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-gaming-purple/25 transition-all hover:shadow-xl hover:shadow-gaming-purple/30"
                >
                  <span className="relative z-10">Shop Now</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-gaming-pink to-gaming-purple"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
                <Link
                  href="/#categories"
                  className="rounded-xl border-2 border-border-light bg-white px-8 py-3.5 text-sm font-semibold text-text-primary shadow-sm transition-all hover:border-gaming-purple/30 hover:bg-gray-50 hover:shadow-md"
                >
                  Explore Categories
                </Link>
              </motion.div>
              <motion.div className="mt-8 flex items-center gap-6 text-sm text-text-muted" variants={itemVariants}>
                <span>🔥 10K+ Happy Gamers</span>
                <span>⭐ 4.8 Avg Rating</span>
                <span>🚀 Free Shipping</span>
              </motion.div>
            </motion.div>

            <motion.div
              className="flex-1 flex items-center justify-center"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.div
                className="relative"
                animate={{ y: [0, -18, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="relative h-64 w-64 sm:h-80 sm:w-80 lg:h-120 lg:w-120">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gaming-purple/20 via-gaming-pink/10 to-gaming-cyan/20 blur-3xl" />
                  <div className="relative flex h-full w-full items-center justify-center">
                    <motion.span
                      className="text-[10rem] sm:text-[12rem] lg:text-[14rem] leading-none select-none"
                      animate={{ rotate: [0, -5, 5, -3, 0] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Image src="/controller.png" alt="Gaming Controller" width={600} height={600} className="h-auto w-auto" />
                    </motion.span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ─── AI Features ─── */}
      <section className="relative overflow-hidden bg-gradient-to-r from-gaming-purple/5 via-white to-gaming-cyan/5 border-t border-border-light">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block rounded-full bg-gaming-purple/10 px-4 py-1.5 text-sm font-medium text-gaming-purple mb-4">Powered by AI</span>
            <h2 className="text-3xl font-bold text-text-primary sm:text-4xl">
              Smarter Shopping with <span className="text-gaming-purple">AI</span>
            </h2>
            <p className="mt-3 text-text-muted max-w-xl mx-auto">
              Our AI engine helps you discover the perfect gear and makes managing your store effortless.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2">
            <motion.div
              className="rounded-2xl border border-border-light bg-white p-8 shadow-sm hover:shadow-md transition-shadow"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gaming-purple/10">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gaming-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456Z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-text-primary">AI Product Recommendations</h3>
                  <p className="text-sm text-text-muted">Personalized picks just for you</p>
                </div>
              </div>
              <p className="text-text-muted leading-relaxed">
                Browse our catalog and let AI suggest complementary products you'll love. Our recommendation engine analyzes product categories, ratings, and pricing to surface the best gear to pair with your setup — so you never miss the perfect match.
              </p>
              <Link
                href="/shop"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-gaming-purple hover:text-gaming-purple/80 transition-colors"
              >
                Try AI recommendations <span>→</span>
              </Link>
            </motion.div>

            <motion.div
              className="rounded-2xl border border-border-light bg-white p-8 shadow-sm hover:shadow-md transition-shadow"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gaming-purple/10">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gaming-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-text-primary">AI Product Generation</h3>
                  <p className="text-sm text-text-muted">Create listings in seconds</p>
                </div>
              </div>
              <p className="text-text-muted leading-relaxed">
                Store owners can generate complete product listings with a single click. Just enter a product name and optional keywords — our AI writes the description, specs, tags, and suggests a price. Perfect for quickly populating your catalog or drafting new arrivals.
              </p>
              <Link
                href="/admin/products/add"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-gaming-purple hover:text-gaming-purple/80 transition-colors"
              >
                Try AI generation <span>→</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Why Choose Us ─── */}
      <motion.section
        className="relative bg-white border-t border-border-light"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <motion.h2
            className="text-3xl font-bold text-text-primary text-center mb-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Why Choose <span className="text-gaming-purple">Inventra</span>
          </motion.h2>
          <motion.p
            className="text-text-muted text-center mb-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            We go the extra mile for every gamer
          </motion.p>
          <motion.div
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {benefits.map((b) => (
              <motion.div
                key={b.title}
                variants={itemVariants}
                whileHover={{ scale: 1.03, y: -4 }}
                className="rounded-xl border border-border-light bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <span className="text-3xl">{b.icon}</span>
                <h3 className="mt-3 text-lg font-semibold text-text-primary">{b.title}</h3>
                <p className="mt-1.5 text-sm text-text-muted leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ─── Categories ─── */}
      <motion.section
        id="categories"
        className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.h2
          className="text-3xl font-bold text-text-primary text-center mb-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Shop by Category
        </motion.h2>
        <motion.p className="text-text-muted text-center mb-10" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
          Find exactly what your setup needs
        </motion.p>
        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {(data?.categories ?? []).map((cat: string) => {
            const meta = categoryMeta[cat] || { icon: "📦", desc: "Browse our collection", color: "from-gray-500/20 to-slate-500/20" };
            return (
              <motion.div
                key={cat}
                variants={itemVariants}
                whileHover={{ scale: 1.03, y: -4 }}
              >
                <Link
                  href={`/shop?category=${cat}`}
                  className={`block rounded-xl border border-border-light bg-white p-6 shadow-sm transition-all hover:shadow-md bg-gradient-to-br ${meta.color}`}
                >
                  <span className="text-3xl">{meta.icon}</span>
                  <h3 className="mt-3 text-lg font-semibold text-text-primary">{cat}</h3>
                  <p className="text-sm text-text-muted mt-1">{meta.desc}</p>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.section>

      {/* ─── Customer Testimonials ─── */}
      <motion.section
        className="relative bg-gradient-to-r from-gaming-purple/5 via-white to-gaming-cyan/5 border-y border-border-light"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <motion.h2
            className="text-3xl font-bold text-text-primary text-center mb-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            What Gamers Say
          </motion.h2>
          <motion.p className="text-text-muted text-center mb-10" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            Trusted by thousands of gamers worldwide
          </motion.p>
          <motion.div
            className="grid gap-6 md:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {testimonials.map((t) => (
              <motion.div
                key={t.name}
                variants={itemVariants}
                whileHover={{ y: -6 }}
                className="rounded-xl border border-border-light bg-white p-6 shadow-sm"
              >
                <div className="flex items-center gap-1 text-gaming-amber text-sm mb-3">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <p className="text-sm text-text-primary leading-relaxed mb-4">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-gaming-purple to-gaming-pink flex items-center justify-center text-white text-sm font-bold">
                    {t.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text-primary">{t.name}</p>
                    <p className="text-xs text-text-muted">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ─── Brand Partners ─── */}
      <motion.section
        className="relative bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <motion.p
            className="text-center text-sm font-medium uppercase tracking-widest text-text-muted mb-8"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Trusted by leading gaming brands
          </motion.p>
          <motion.div
            className="flex flex-wrap items-center justify-center gap-8 sm:gap-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {["Razer", "Corsair", "SteelSeries", "Logitech", "HyperX", "ASUS ROG"].map((brand, i) => (
              <motion.div
                key={brand}
                variants={itemVariants}
                whileHover={{ scale: 1.1 }}
                className="text-xl sm:text-2xl font-bold text-gray-300 hover:text-gaming-purple transition-colors select-none"
              >
                {brand}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ─── Featured Products ─── */}
      <motion.section
        id="deals"
        className="relative bg-gradient-to-r from-gaming-purple/5 via-white to-gaming-cyan/5 border-y border-border-light"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <motion.h2
            className="text-3xl font-bold text-text-primary text-center mb-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Featured Products
          </motion.h2>
          <motion.p className="text-text-muted text-center mb-10" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            Our top picks for competitive gamers
          </motion.p>
          <motion.div
            className="grid gap-6 lg:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {isLoading
              ? Array.from({ length: 3 }).map((_, i) => <ProductCardSkeleton key={i} />)
              : data?.items?.map((item: any) => (
                  <ProductCard key={item._id} {...item} />
                ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ─── Stats / Community ─── */}
      <motion.section
        className="relative bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <motion.div
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {[
              { value: "10K+", label: "Happy Gamers", icon: "👥" },
              { value: "500+", label: "Products", icon: "📦" },
              { value: "50+", label: "Brands", icon: "🏷️" },
              { value: "99%", label: "Satisfaction", icon: "💯" },
            ].map((s) => (
              <motion.div
                key={s.label}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="text-center rounded-xl border border-border-light bg-white p-6 shadow-sm"
              >
                <span className="text-4xl block mb-3">{s.icon}</span>
                <p className="text-3xl font-bold text-text-primary">{s.value}</p>
                <p className="text-sm text-text-muted mt-1">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ─── Newsletter / CTA ─── */}
      <motion.section
        className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <motion.div
          className="relative rounded-2xl bg-gradient-to-r from-gaming-purple via-gaming-pink to-gaming-cyan p-8 sm:p-12 text-center overflow-hidden"
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white">Stay in the Game</h2>
            <p className="text-white/80 mt-2 mb-6 max-w-md mx-auto">
              Get notified about new drops, exclusive deals, and restocks before anyone else.
            </p>
            <form className="mx-auto flex max-w-md gap-3" action="#">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 backdrop-blur-sm"
              />
              <button className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-gaming-purple hover:bg-white/90 transition-all shadow-lg">
                Subscribe
              </button>
            </form>
          </div>
        </motion.div>
      </motion.section>
    </>
  );
}
