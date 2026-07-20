import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border-light bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-4">
          <div>
            <Link
          href="/"
          className="text-xl font-bold tracking-tight text-text-primary"
        >
          <Image src="/logo-big.png" alt="Inventra Logo" width={150} height={50} className="h-10 w-auto" />
        </Link>
            <p className="text-sm text-text-muted lg:w-60 mt-5">Premium gaming gadgets for the modern battlestation.</p>
          </div>
          <div>
            <h4 className="font-semibold text-text-primary mb-3">Navigation</h4>
            <div className="flex flex-col gap-2">
              <Link href="/shop" className="text-sm text-text-muted hover:text-gaming-purple">Shop</Link>
              <Link href="/cart" className="text-sm text-text-muted hover:text-gaming-purple">Cart</Link>
              <Link href="/orders" className="text-sm text-text-muted hover:text-gaming-purple">Orders</Link>
              <Link href="/support" className="text-sm text-text-muted hover:text-gaming-purple">Support</Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-text-primary mb-3">Categories</h4>
            <div className="flex flex-col gap-2">
              <Link href="/shop?category=Keyboards" className="text-sm text-text-muted hover:text-gaming-purple">Keyboards</Link>
              <Link href="/shop?category=Mice" className="text-sm text-text-muted hover:text-gaming-purple">Mice</Link>
              <Link href="/shop?category=Headsets" className="text-sm text-text-muted hover:text-gaming-purple">Headsets</Link>
              <Link href="/shop?category=Controllers" className="text-sm text-text-muted hover:text-gaming-purple">Controllers</Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-text-primary mb-3">Contact</h4>
            <div className="flex flex-col gap-2 text-sm text-text-muted">
              <span>support@inventra.com</span>
              <span>+1 (555) 123-4567</span>
              <span>123 Gaming Lane, SF</span>
              <div className="flex gap-3 mt-1">
                <span className="text-text-muted">Twitter</span>
                <span className="text-text-muted">Instagram</span>
                <span className="text-text-muted">GitHub</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-border-light pt-6 text-center">
          <p className="text-sm text-text-muted">&copy; {new Date().getFullYear()} Inventra Gaming. All rights reserved by Jubair Alam.</p>
        </div>
      </div>
    </footer>
  );
}
