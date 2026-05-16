"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface Props {
  title: string;
  href: string;
  icon: LucideIcon;
}

export default function SidebarItem({
  title,
  href,
  icon: Icon,
}: Props) {
  const pathname = usePathname();

  const active = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
        active
          ? "bg-zinc-900 text-white dark:bg-white dark:text-black"
          : "text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900 dark:text-zinc-400"
      )}
    >
      <Icon size={18} />
      {title}
    </Link>
  );
}