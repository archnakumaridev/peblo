"use client";

import { useState } from "react";

import { X } from "lucide-react";

import { Tag } from "@/types";

interface Props {
  tags: Tag[];

  onChange?: (
    tags: Tag[]
  ) => void;
}

export default function TagInput({
  tags,
  onChange,
}: Props) {
  const [input, setInput] =
    useState("");

  const addTag = () => {
    const value =
      input.trim();

    if (!value) return;

    // Prevent duplicates
    if (
      tags.some(
        (t) =>
          t.name.toLowerCase() ===
          value.toLowerCase()
      )
    ) {
      setInput("");
      return;
    }

    const newTag: Tag = {
      id: crypto.randomUUID(),
      name: value,
    };

    onChange?.([
      ...tags,
      newTag,
    ]);

    setInput("");
  };

  const removeTag = (
    id: string
  ) => {
    onChange?.(
      tags.filter(
        (tag) =>
          tag.id !== id
      )
    );
  };

  return (
    <div>
      {/* Existing Tags */}
      <div className="mb-3 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <div
            key={tag.id}
            className="flex items-center gap-2 rounded-full bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 text-sm"
          >
            <span>
              #{tag.name}
            </span>

            <button
              onClick={() =>
                removeTag(
                  tag.id
                )
              }
              className="text-zinc-500 transition hover:text-red-500"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>

      {/* Input */}
      <input
        value={input}
        onChange={(e) =>
          setInput(
            e.target.value
          )
        }
        onKeyDown={(e) => {
          if (
            e.key === "Enter"
          ) {
            e.preventDefault();

            addTag();
          }
        }}
        placeholder="Add tag..."
        className="w-full rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-zinc-400"
      />
    </div>
  );
}