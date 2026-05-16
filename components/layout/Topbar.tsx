"use client";

import { useUser } from "@/hooks/useUser";

import ThemeToggle from "../ui/Themetoggle";

export default function Topbar() {
  const { user } =
    useUser();

  return (
    <header className="sticky top-0 z-30 hidden h-16 items-center justify-between border-b border-zinc-200 bg-white/80 px-4 backdrop-blur-xl dark:border-zinc-800 dark:bg-black/80 sm:px-6 md:flex">
      {/* Left */}
      <div className="min-w-0">
        <h2 className="truncate text-lg font-semibold">
          Welcome back 👋
        </h2>

        <p className="truncate text-sm text-zinc-500">
          Manage your AI
          workspace
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3 sm:gap-4">
        <ThemeToggle />

        <div className="flex items-center gap-3 rounded-xl border border-zinc-200 px-3 py-2 dark:border-zinc-800">
          <div className="h-9 w-9 rounded-full bg-zinc-900 dark:bg-white" />

          <div className="hidden lg:block">
            <p className="max-w-[140px] truncate text-sm font-medium">
              {user?.name}
            </p>

            <p className="max-w-[180px] truncate text-xs text-zinc-500">
              {user?.email}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}