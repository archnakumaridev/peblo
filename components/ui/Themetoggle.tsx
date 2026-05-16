"use client";

import { useEffect, useState } from "react";

import {
  Moon,
  Sun,
} from "lucide-react";

import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const {
    theme,
    setTheme,
  } = useTheme();

  const [mounted, setMounted] =
    useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <button className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-2">
        <div className="h-[18px] w-[18px]" />
      </button>
    );
  }

  return (
    <button
      onClick={() =>
        setTheme(
          theme === "dark"
            ? "light"
            : "dark"
        )
      }
      className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-2 transition hover:bg-zinc-100 dark:hover:bg-zinc-900"
    >
      {theme === "dark" ? (
        <Sun size={18} />
      ) : (
        <Moon size={18} />
      )}
    </button>
  );
}