import Link from "next/link";

const categories = [
  { name: "Keyboards", icon: "⌨️", desc: "Mechanical, wireless, custom" },
  { name: "Mice", icon: "🖱️", desc: "Esports, MMO, ergonomic" },
  { name: "Headsets", icon: "🎧", desc: "Wireless, noise-cancelling" },
  { name: "Controllers", icon: "🎮", desc: "Console & PC gamepads" },
  { name: "Mousepads", icon: "🧩", desc: "Desk mats, hard pads" },
  { name: "Chairs", icon: "🪑", desc: "Ergonomic gaming chairs" },
];

const featured = [
  { name: "Phantom X Pro Mechanical Keyboard", brand: "Corsair", price: 189.99, rating: 4.8, badge: "Bestseller" },
  { name: "Apex Wireless Gaming Mouse", brand: "Razer", price: 129.99, rating: 4.7, badge: "New" },
  { name: "Quantum 7.1 Surround Headset", brand: "SteelSeries", price: 159.99, rating: 4.9, badge: "Top Rated" },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-gaming-purple/5 via-white to-gaming-cyan/5">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-5xl font-bold tracking-tight text-text-primary sm:text-6xl">
              Level Up Your
              <span className="text-gaming-purple"> Setup</span>
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-text-muted">
              Premium gaming gadgets, peripherals, and accessories for the ultimate battlestation.
              Hand-picked for performance and style.
            </p>
            <div className="mt-8 flex gap-4">
              <Link
                href="/shop"
                className="rounded-xl bg-gaming-purple px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-gaming-purple/90 transition-all"
              >
                Shop Now
              </Link>
              <Link
                href="/#categories"
                className="rounded-xl border border-border-light px-8 py-3 text-sm font-semibold text-text-primary hover:bg-gray-50 transition-all"
              >
                Explore Categories
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-text-primary text-center mb-2">Shop by Category</h2>
        <p className="text-text-muted text-center mb-10">Find exactly what your setup needs</p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={`/shop?category=${cat.name}`}
              className="rounded-xl border border-border-light bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md hover:border-gaming-purple/30"
            >
              <span className="text-3xl">{cat.icon}</span>
              <h3 className="mt-3 text-lg font-semibold text-text-primary">{cat.name}</h3>
              <p className="text-sm text-text-muted mt-1">{cat.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section id="deals" className="bg-white border-t border-border-light">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-text-primary text-center mb-2">Featured Products</h2>
          <p className="text-text-muted text-center mb-10">Our top picks for gamers</p>
          <div className="grid gap-6 lg:grid-cols-3">
            {featured.map((item) => (
              <div key={item.name} className="rounded-xl border border-border-light bg-white overflow-hidden shadow-sm">
                <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <span className="text-5xl opacity-20">🎮</span>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="rounded-full bg-gaming-purple/10 px-2.5 py-0.5 text-xs font-medium text-gaming-purple">{item.brand}</span>
                    <span className="rounded-full bg-gaming-amber/10 px-2.5 py-0.5 text-xs font-medium text-gaming-amber">{item.badge}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary">{item.name}</h3>
                  <div className="flex items-center mt-2 gap-1">
                    <span className="text-gaming-amber text-sm">{'★'.repeat(Math.round(item.rating))}</span>
                    <span className="text-xs text-text-muted">({item.rating})</span>
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-border-light">
                    <span className="text-xl font-bold text-text-primary">${item.price.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-r from-gaming-purple/10 to-gaming-cyan/10 p-8 sm:p-12 text-center">
          <h2 className="text-2xl font-bold text-text-primary">Stay in the Game</h2>
          <p className="text-text-muted mt-2 mb-6">Get notified about new drops, deals, and restocks.</p>
          <form className="mx-auto flex max-w-md gap-3" action="#">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-xl border border-border-light bg-white px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-gaming-purple"
            />
            <button className="rounded-xl bg-gaming-purple px-6 py-2.5 text-sm font-semibold text-white hover:bg-gaming-purple/90 transition-all">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
