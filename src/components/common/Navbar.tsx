"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";

const loggedOutLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/#categories", label: "Categories" },
  { href: "/#deals", label: "Deals" },
];

const loggedInLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/orders", label: "My Orders" },
  { href: "/support", label: "Support" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();
  const isLoggedIn = !!user;
  const isAdmin = user?.role === "admin";

  const links = isLoggedIn ? loggedInLinks : loggedOutLinks;

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <nav className="sticky top-0 z-50 border-b border-border-light bg-white/20 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 backdrop-blur-2xl sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-text-primary"
        >
          <Image src="/logo-big.png" alt="Inventra Logo" width={150} height={50} className="h-10 w-auto" />
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-lg font-medium transition-colors ${
                pathname === link.href
                  ? "text-gaming-purple"
                  : "text-text-muted hover:text-text-primary"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/cart"
            className="relative text-text-muted hover:text-text-primary transition-colors"
            aria-label="Cart"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
          </Link>
          {isLoggedIn ? (
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 rounded-full bg-gaming-purple px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-gaming-purple/80"
              >
                Welcome, {user?.fullName}
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-3.5 w-3.5 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 top-full mt-1.5 w-44 rounded-lg border border-border-light bg-white py-1 shadow-lg">
                  <Link
                    href={isAdmin ? "/admin/orders" : "/orders"}
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center px-4 py-2 text-sm text-text-muted transition-colors hover:bg-gray-50 hover:text-text-primary"
                  >
                    Orders
                  </Link>
                  {isAdmin && (
                    <Link
                      href="/admin/products"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center px-4 py-2 text-sm text-text-muted transition-colors hover:bg-gray-50 hover:text-text-primary"
                    >
                      Products
                    </Link>
                  )}
                  <div className="my-1 border-t border-border-light" />
                  <button
                    type="button"
                    onClick={() => { logout(); setDropdownOpen(false); }}
                    className="flex w-full items-center px-4 py-2 text-sm text-red-500 transition-colors hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="rounded-lg border border-border-light px-4 py-1.5 text-sm text-text-primary transition-colors hover:bg-gray-100"
              >
                Log in
              </Link>
              <Link
                href="/register"
                className="rounded-lg bg-gaming-purple px-4 py-1.5 text-sm text-white transition-colors hover:bg-gaming-purple/80"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        <button
          type="button"
          className="text-text-muted hover:text-text-primary md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-border-light bg-white px-4 pb-4 md:hidden">
          <div className="flex flex-col gap-3 pt-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`text-sm transition-colors ${
                  pathname === link.href
                    ? "text-gaming-purple"
                    : "text-text-muted hover:text-text-primary"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/cart"
              onClick={() => setMobileOpen(false)}
              className="text-sm text-text-muted hover:text-text-primary"
            >
              Cart
            </Link>
            <div className="border-t border-border-light pt-3">
              {isLoggedIn ? (
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setMobileOpen(false);
                  }}
                  className="text-sm text-text-muted hover:text-text-primary"
                >
                  Log out
                </button>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link href="/login" className="rounded-lg border border-border-light px-4 py-1.5 text-sm text-text-primary hover:bg-gray-100">
                    Log in
                  </Link>
                  <Link href="/register" className="rounded-lg bg-gaming-purple px-4 py-1.5 text-sm text-white hover:bg-gaming-purple/80">
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
