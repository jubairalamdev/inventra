import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-text-primary mb-4">Contact Us</h1>
      <p className="text-text-muted text-lg mb-10">Have a question or need help? We are here for you.</p>

      <div className="grid gap-8 lg:grid-cols-2">
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-text-primary">Get in Touch</h2>
          <div className="space-y-4">
            <div className="rounded-xl border border-border-light bg-white p-5">
              <h3 className="font-semibold text-text-primary mb-1">Email</h3>
              <p className="text-sm text-text-muted">support@inventra.com</p>
            </div>
            <div className="rounded-xl border border-border-light bg-white p-5">
              <h3 className="font-semibold text-text-primary mb-1">Phone</h3>
              <p className="text-sm text-text-muted">+1 (555) 123-4567</p>
            </div>
            <div className="rounded-xl border border-border-light bg-white p-5">
              <h3 className="font-semibold text-text-primary mb-1">Address</h3>
              <p className="text-sm text-text-muted">123 Gaming Lane, Suite 100<br />San Francisco, CA 94105</p>
            </div>
            <div className="rounded-xl border border-border-light bg-white p-5">
              <h3 className="font-semibold text-text-primary mb-1">Social</h3>
              <div className="flex gap-3 mt-2">
                <span className="text-sm text-text-muted">Twitter / X</span>
                <span className="text-sm text-text-muted">Instagram</span>
                <span className="text-sm text-text-muted">GitHub</span>
                <span className="text-sm text-text-muted">Discord</span>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-text-primary mb-6">Send a Message</h2>
          <div className="rounded-xl border border-border-light bg-white p-6 space-y-4">
            <input type="text" placeholder="Your Name"
              className="w-full rounded-lg border border-border-light bg-gray-50 px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-gaming-purple" />
            <input type="email" placeholder="Your Email"
              className="w-full rounded-lg border border-border-light bg-gray-50 px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-gaming-purple" />
            <input type="text" placeholder="Subject"
              className="w-full rounded-lg border border-border-light bg-gray-50 px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-gaming-purple" />
            <textarea rows={4} placeholder="Your Message"
              className="w-full rounded-lg border border-border-light bg-gray-50 px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-gaming-purple" />
            <button type="submit" className="rounded-xl bg-gaming-purple px-6 py-2.5 text-sm font-semibold text-white hover:bg-gaming-purple/90">
              Send Message
            </button>
          </div>
        </section>
      </div>

      <div className="mt-12 text-center">
        <Link href="/support" className="rounded-xl bg-gaming-purple px-6 py-2.5 text-sm font-semibold text-white hover:bg-gaming-purple/90">
          Visit Support Desk
        </Link>
      </div>
    </div>
  );
}
