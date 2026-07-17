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
  { href: "/explore", label: "Explore Catalog" },
  { href: "/#features", label: "Features & Benchmarks" },
  { href: "/#pricing", label: "Pricing / API Access" },
];

const loggedInLinks = [
  { href: "/explore", label: "Dashboard / Explore" },
  { href: "/items/add", label: "Create AI Asset" },
  { href: "/items/manage", label: "Manage Inventory" },
  { href: "/analytics", label: "Analytics Panel" },
  { href: "/support", label: "Support Desk" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();
  const isLoggedIn = !!user;

  const links = isLoggedIn ? loggedInLinks : loggedOutLinks;

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-deep/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-text-crisp"
        >
          Inventra
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors ${
                pathname === link.href
                  ? "text-cyber-violet"
                  : "text-text-muted hover:text-text-crisp"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          {isLoggedIn ? (
            <Dropdown>
              <DropdownTrigger>
                <button
                  type="button"
                  className="flex items-center gap-2 outline-none"
                >
                  <Avatar className="bg-cyber-violet" size="sm">
                    <AvatarFallback>
                      {user.fullName
                        ?.split(" ")
                        .map((n: string) => n[0])
                        .join("")
                        .toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownTrigger>
              <DropdownPopover placement="bottom end">
                <DropdownMenu onAction={(key) => key === "logout" && logout()}>
                  <DropdownItem id="profile" textValue="Profile">
                    Profile
                  </DropdownItem>
                  <DropdownItem id="settings" textValue="Settings">
                    Settings
                  </DropdownItem>
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
                className="rounded-lg border border-white/20 px-4 py-1.5 text-sm text-text-crisp transition-colors hover:bg-white/10"
              >
                Log in
              </Link>
              <Link
                href="/register"
                className="rounded-lg bg-cyber-violet px-4 py-1.5 text-sm text-white transition-colors hover:bg-cyber-violet/80"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>

        <button
          type="button"
          className="text-text-muted hover:text-text-crisp md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-white/10 bg-slate-deep px-4 pb-4 md:hidden">
          <div className="flex flex-col gap-3 pt-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`text-sm transition-colors ${
                  pathname === link.href
                    ? "text-cyber-violet"
                    : "text-text-muted hover:text-text-crisp"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-white/10 pt-3">
              {isLoggedIn ? (
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setMobileOpen(false);
                  }}
                  className="text-sm text-text-muted hover:text-text-crisp"
                >
                  Log out
                </button>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link
                    href="/login"
                    className="rounded-lg border border-white/20 px-4 py-1.5 text-sm text-text-crisp transition-colors hover:bg-white/10"
                  >
                    Log in
                  </Link>
                  <Link
                    href="/register"
                    className="rounded-lg bg-cyber-violet px-4 py-1.5 text-sm text-white transition-colors hover:bg-cyber-violet/80"
                  >
                    Get Started
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
