"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const floatIcons = [
  { icon: "🖱️", x: "10%", y: "15%", delay: 0, duration: 4 },
  { icon: "⌨️", x: "85%", y: "10%", delay: 0.5, duration: 5 },
  { icon: "🎧", x: "90%", y: "70%", delay: 1, duration: 4.5 },
  { icon: "🎮", x: "5%", y: "75%", delay: 0.3, duration: 5.5 },
  { icon: "🕹️", x: "50%", y: "5%", delay: 0.8, duration: 3.8 },
  { icon: "💻", x: "95%", y: "40%", delay: 1.2, duration: 4.2 },
  { icon: "⚡", x: "8%", y: "45%", delay: 0.6, duration: 3.5 },
  { icon: "🔥", x: "75%", y: "85%", delay: 0.9, duration: 4.8 },
];

const categories = [
  { name: "Keyboards", icon: "⌨️", desc: "Mechanical, wireless, custom builds", color: "from-violet-500/20 to-purple-500/20" },
  { name: "Mice", icon: "🖱️", desc: "Esports, MMO, ergonomic designs", color: "from-pink-500/20 to-rose-500/20" },
  { name: "Headsets", icon: "🎧", desc: "Wireless, noise-cancelling, surround", color: "from-cyan-500/20 to-blue-500/20" },
  { name: "Controllers", icon: "🎮", desc: "Console & PC gamepads", color: "from-amber-500/20 to-orange-500/20" },
  { name: "Mousepads", icon: "🧩", desc: "Desk mats, hard pads, RGB", color: "from-emerald-500/20 to-teal-500/20" },
  { name: "Chairs", icon: "🪑", desc: "Ergonomic gaming chairs", color: "from-purple-500/20 to-indigo-500/20" },
];

const featured = [
  { name: "Phantom X Pro Mechanical Keyboard", brand: "Corsair", price: 189.99, rating: 4.8, badge: "Bestseller" },
  { name: "Apex Wireless Gaming Mouse", brand: "Razer", price: 129.99, rating: 4.7, badge: "New Arrival" },
  { name: "Quantum 7.1 Surround Headset", brand: "SteelSeries", price: 159.99, rating: 4.9, badge: "Top Rated" },
];

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
  return (
    <>
      {/* ─── Floating Icons ─── */}
      {floatIcons.map((item) => (
        <motion.span
          key={item.icon}
          className="fixed z-0 pointer-events-none text-3xl sm:text-4xl"
          style={{ left: item.x, top: item.y }}
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: item.duration, repeat: Infinity, delay: item.delay, ease: "easeInOut" }}
        >
          {item.icon}
        </motion.span>
      ))}

      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gaming-purple/5 via-white to-gaming-cyan/5">
        <motion.div
          className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8"
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

            {/* Controller animation */}
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
                <div className="relative h-64 w-64 sm:h-80 sm:w-80 lg:h-96 lg:w-96">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gaming-purple/20 via-gaming-pink/10 to-gaming-cyan/20 blur-3xl" />
                  <div className="relative flex h-full w-full items-center justify-center">
                    <motion.span
                      className="text-[10rem] sm:text-[12rem] lg:text-[14rem] leading-none select-none"
                      animate={{ rotate: [0, -5, 5, -3, 0] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      🎮
                    </motion.span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ─── Why Choose Us ─── */}
      <motion.section
        className="bg-white border-t border-border-light"
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
        className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
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
          {categories.map((cat) => (
            <motion.div
              key={cat.name}
              variants={itemVariants}
              whileHover={{ scale: 1.03, y: -4 }}
            >
              <Link
                href={`/shop?category=${cat.name}`}
                className={`block rounded-xl border border-border-light bg-white p-6 shadow-sm transition-all hover:shadow-md bg-gradient-to-br ${cat.color}`}
              >
                <span className="text-3xl">{cat.icon}</span>
                <h3 className="mt-3 text-lg font-semibold text-text-primary">{cat.name}</h3>
                <p className="text-sm text-text-muted mt-1">{cat.desc}</p>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* ─── Customer Testimonials ─── */}
      <motion.section
        className="bg-gradient-to-r from-gaming-purple/5 via-white to-gaming-cyan/5 border-y border-border-light"
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
        className="bg-white"
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
        className="bg-gradient-to-r from-gaming-purple/5 via-white to-gaming-cyan/5 border-y border-border-light"
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
            {featured.map((item) => (
              <motion.div
                key={item.name}
                variants={itemVariants}
                whileHover={{ y: -6 }}
                className="rounded-xl border border-border-light bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative">
                  <motion.span
                    className="text-5xl opacity-20 select-none"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    🎮
                  </motion.span>
                  <span className="absolute top-3 right-3 rounded-full bg-gaming-amber/10 px-2.5 py-0.5 text-xs font-medium text-gaming-amber border border-gaming-amber/20">
                    {item.badge}
                  </span>
                </div>
                <div className="p-5">
                  <span className="rounded-full bg-gaming-purple/10 px-2.5 py-0.5 text-xs font-medium text-gaming-purple">{item.brand}</span>
                  <h3 className="text-lg font-semibold text-text-primary mt-2">{item.name}</h3>
                  <div className="flex items-center mt-2 gap-1">
                    <span className="text-gaming-amber text-sm">{'★'.repeat(Math.round(item.rating))}</span>
                    <span className="text-xs text-text-muted">({item.rating})</span>
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-border-light">
                    <span className="text-xl font-bold text-text-primary">${item.price.toFixed(2)}</span>
                    <Link href={`/shop?q=${encodeURIComponent(item.name.split(" ").slice(0, 2).join(" "))}`}
                      className="text-sm font-medium text-gaming-purple hover:underline">
                      View →
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ─── Stats / Community ─── */}
      <motion.section
        className="bg-white"
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
                <motion.span
                  className="text-4xl block mb-3"
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {s.icon}
                </motion.span>
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
          className="rounded-2xl bg-gradient-to-r from-gaming-purple via-gaming-pink to-gaming-cyan p-8 sm:p-12 text-center relative overflow-hidden"
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="absolute -top-10 -right-10 text-8xl opacity-10 select-none"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            🎮
          </motion.div>
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
