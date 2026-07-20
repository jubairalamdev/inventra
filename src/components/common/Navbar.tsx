"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownPopover,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react/dropdown";
import { Avatar, AvatarFallback } from "@heroui/react/avatar";
import { useAuth } from "@/hooks/useAuth";

const loggedOutLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/#categories", label: "Categories" },
  { href: "/#deals", label: "Deals" },
];

const loggedInLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/orders", label: "My Orders" },
  { href: "/support", label: "Support" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();
  const isLoggedIn = !!user;
  const isAdmin = user?.role === "admin";

  const links = isLoggedIn ? loggedInLinks : loggedOutLinks;

  return (
    <nav className="sticky top-0 z-50 border-b border-border-light bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-text-primary"
        >
          <span className="text-gaming-purple">Inventra</span>
          <span className="ml-1 text-sm font-normal text-text-muted">Gaming</span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
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
            <Dropdown>
              <DropdownTrigger>
                <div className="flex items-center gap-2 outline-none cursor-pointer">
                  <Avatar className="bg-gaming-purple text-white" size="sm">
                    <AvatarFallback>
                      {user.fullName
                        ?.split(" ")
                        .map((n: string) => n[0])
                        .join("")
                        .toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </DropdownTrigger>
              <DropdownPopover placement="bottom end">
                <DropdownMenu onAction={(key) => key === "logout" && logout()}>
                  <DropdownItem id="profile" textValue="Profile">
                    Profile
                  </DropdownItem>
                  <DropdownItem id="orders" textValue="Orders" href="/orders">
                    Orders
                  </DropdownItem>
                  {isAdmin && (
                    <DropdownItem id="admin" textValue="Admin" href="/admin/products">
                      Admin Panel
                    </DropdownItem>
                  )}
                  <DropdownItem id="logout" textValue="Logout">
                    Logout
                  </DropdownItem>
                </DropdownMenu>
              </DropdownPopover>
            </Dropdown>
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
