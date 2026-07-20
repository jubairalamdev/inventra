import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border-light bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <h3 className="text-lg font-bold text-text-primary mb-3">
              <span className="text-gaming-purple">Inventra</span> Gaming
            </h3>
            <p className="text-sm text-text-muted">Premium gaming gadgets for the modern battlestation.</p>
          </div>
          <div>
            <h4 className="font-semibold text-text-primary mb-3">Shop</h4>
            <div className="flex flex-col gap-2">
              <Link href="/shop" className="text-sm text-text-muted hover:text-gaming-purple">All Products</Link>
              <Link href="/shop?category=Keyboards" className="text-sm text-text-muted hover:text-gaming-purple">Keyboards</Link>
              <Link href="/shop?category=Mice" className="text-sm text-text-muted hover:text-gaming-purple">Mice</Link>
              <Link href="/shop?category=Headsets" className="text-sm text-text-muted hover:text-gaming-purple">Headsets</Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-text-primary mb-3">Support</h4>
            <div className="flex flex-col gap-2">
              <Link href="/support" className="text-sm text-text-muted hover:text-gaming-purple">Help Desk</Link>
              <Link href="/orders" className="text-sm text-text-muted hover:text-gaming-purple">Track Order</Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-border-light pt-6 text-center">
          <p className="text-sm text-text-muted">&copy; {new Date().getFullYear()} Inventra Gaming. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
