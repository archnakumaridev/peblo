"use client";

import { useState } from "react";

import {
  Menu,
  X,
} from "lucide-react";

import { SIDEBAR_ITEMS } from "@/constants/sidebar";

import SidebarItem from "./SidebarItem";

export default function Sidebar() {
  const [open, setOpen] =
    useState(false);

  return (
    <>
      {/* Mobile Topbar */}
      <div className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-zinc-200 bg-white px-4 dark:border-zinc-800 dark:bg-black md:hidden">
        <div>
          <h1 className="text-lg font-bold">
            Peblo
          </h1>

          <p className="text-xs text-zinc-500">
            AI Workspace
          </p>
        </div>

        <button
          onClick={() =>
            setOpen(true)
          }
          className="rounded-xl border border-zinc-200 p-2 dark:border-zinc-800"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Overlay */}
      {open && (
        <div
          onClick={() =>
            setOpen(false)
          }
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-[260px] flex-col border-r border-zinc-200 bg-white px-5 py-6 transition-transform duration-300 dark:border-zinc-800 dark:bg-black md:static md:translate-x-0 ${
          open
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Peblo
            </h1>

            <p className="mt-1 text-sm text-zinc-500">
              AI Workspace
            </p>
          </div>

          <button
            onClick={() =>
              setOpen(false)
            }
            className="rounded-lg p-2 hover:bg-zinc-100 dark:hover:bg-zinc-900 md:hidden"
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-2">
          {SIDEBAR_ITEMS.map(
            (item) => (
              <SidebarItem
                key={item.href}
                {...item}
              />
            )
          )}
        </nav>

        {/* Bottom */}
        <div className="mt-auto">
          <div className="rounded-2xl border border-zinc-200 p-4 dark:border-zinc-800">
            <p className="text-sm font-medium">
              AI summaries
              available
            </p>

            <p className="mt-1 text-xs text-zinc-500">
              Upgrade your
              productivity
              workflow.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}