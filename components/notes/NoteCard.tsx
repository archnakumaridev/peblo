"use client";

import Link from "next/link";

import { Trash2 } from "lucide-react";

import { Note } from "@/types";

interface Props {
  note: Note;
  active?: boolean;

  onDelete?: (
    id: string
  ) => void;
  
}

export default function NoteCard({
  note,
  active,
  onDelete,

}: Props) {
  return (
    <Link
      href={`/notes/${note.id}`}
      className={`block rounded-2xl border p-4 transition-all ${
        active
          ? "border-zinc-900 bg-zinc-100 dark:border-white dark:bg-zinc-900"
          : "border-transparent hover:bg-zinc-100 dark:hover:bg-zinc-900"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-semibold">
            {note.title ||
              "Untitled Note"}
          </h3>

          <p className="mt-2 line-clamp-2 text-sm text-zinc-500">
            {note.content ||
              "No content"}
          </p>
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();

            onDelete?.(note.id);
          }}
          className="rounded-lg p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800"
        >
          <Trash2 size={16} />
        </button>
      </div>

      {/* Tags */}
      <div className="mt-4 flex flex-wrap gap-2">
        {note.tags?.map((tag) => (
          <span
            key={tag.id}
            className="rounded-full bg-zinc-100 dark:bg-zinc-800 px-2 py-1 text-xs"
          >
            {tag.name}
          </span>
        ))}
      </div>
    </Link>
  );
}