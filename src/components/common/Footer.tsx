import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-deep">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-text-muted">
            &copy; {new Date().getFullYear()} Inventra. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/#features"
              className="text-sm text-text-muted hover:text-text-crisp transition-colors"
            >
              Features
            </Link>
            <Link
              href="/#pricing"
              className="text-sm text-text-muted hover:text-text-crisp transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/support"
              className="text-sm text-text-muted hover:text-text-crisp transition-colors"
            >
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
