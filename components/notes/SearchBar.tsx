"use client";

import { Search } from "lucide-react";

interface Props {
  value: string;
  onChange: (
    value: string
  ) => void;
}

export default function SearchBar({
  value,
  onChange,
}: Props) {
  return (
    <div className="relative">
      <Search
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
      />

      <input
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        placeholder="Search notes..."
        className="w-full rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 py-3 pl-11 pr-4 outline-none transition focus:ring-2 focus:ring-zinc-400"
      />
    </div>
  );
}