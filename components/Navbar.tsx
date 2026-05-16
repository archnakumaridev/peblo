"use client";

import Link from "next/link";

import ThemeToggle from "./ui/Themetoggle";
import Button from "./ui/Button";
export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/50 dark:border-zinc-800/50 backdrop-blur-xl bg-white/70 dark:bg-black/70">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight"
        >
          Peblo
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm">
          <a
            href="#features"
            className="text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition"
          >
            Features
          </a>

          <a
            href="#ai"
            className="text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition"
          >
            AI
          </a>

          <a
            href="#dashboard"
            className="text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition"
          >
            Dashboard
          </a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          <Link href="/login">
            <Button className="rounded-xl">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}