import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-text-primary mb-4">About Inventra</h1>
      <p className="text-text-muted text-lg mb-10">Your destination for premium gaming gear.</p>

      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-semibold text-text-primary mb-4">Our Story</h2>
          <p className="text-text-muted leading-relaxed">
            Inventra was founded by a team of competitive gamers who were tired of mediocre hardware.
            We set out to curate the best gaming peripherals, accessories, and gear from around the world —
            tested, reviewed, and ready for your battlestation. From mechanical keyboards to high-precision
            mice, every product we stock meets our standards for performance, durability, and design.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-text-primary mb-4">Our Mission</h2>
          <p className="text-text-muted leading-relaxed">
            We believe great gear unlocks great gameplay. Our mission is to make professional-grade gaming
            equipment accessible to every player, whether you are climbing the ranked ladder, streaming to
            thousands, or enjoying your favorite single-player story. We partner with top brands and
            emerging manufacturers to bring you the best value at every price point.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-text-primary mb-4">Why Choose Us</h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { title: "Curated Selection", desc: "Every product is tested by real gamers before it hits the shelf." },
              { title: "Fast Shipping", desc: "Free shipping on orders over $50. Tracked delivery worldwide." },
              { title: "2-Year Warranty", desc: "We stand behind every product with a comprehensive warranty." },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-border-light bg-white p-5">
                <h3 className="font-semibold text-text-primary mb-2">{item.title}</h3>
                <p className="text-sm text-text-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-text-primary mb-4">Our Team</h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { name: "Jubair Alam", role: "Founder & CEO" },
              { name: "Sarah Chen", role: "Head of Product" },
              { name: "Mike Rodriguez", role: "Lead Engineer" },
            ].map((member) => (
              <div key={member.name} className="rounded-xl border border-border-light bg-white p-5 text-center">
                <div className="mx-auto mb-3 h-16 w-16 rounded-full bg-gaming-purple/10 flex items-center justify-center text-2xl font-bold text-gaming-purple">
                  {member.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <h3 className="font-semibold text-text-primary">{member.name}</h3>
                <p className="text-sm text-text-muted">{member.role}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="mt-12 text-center">
        <Link href="/shop" className="rounded-xl bg-gaming-purple px-6 py-2.5 text-sm font-semibold text-white hover:bg-gaming-purple/90">
          Browse Products
        </Link>
      </div>
    </div>
  );
}
