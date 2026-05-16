"use client";

import { Plus } from "lucide-react";

import { useRouter } from "next/navigation";

import { Note } from "@/types";

import SearchBar from "./SearchBar";

import NoteCard from "./NoteCard";

interface Props {
  notes: Note[];

  loading: boolean;

  search: string;

  setSearch: (
    value: string
  ) => void;

  createNote: () => Promise<any>;

  deleteNote: (
    id: string
  ) => Promise<void>;

  activeId?: string;
  
}

export default function NotesList({
  notes,
  loading,
  search,
  setSearch,
  createNote,
  deleteNote,
  activeId,
}: Props) {
  const router = useRouter();

  const handleCreate =
    async () => {
      const note =
        await createNote();

      if (note) {
        router.push(
          `/notes/${note.id}`
        );
      }
    };

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="border-b border-zinc-200 dark:border-zinc-800 p-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">
              Notes
            </h2>

            <p className="text-sm text-zinc-500">
              {notes.length} notes
            </p>
          </div>

          <button
            onClick={
              handleCreate
            }
            className="flex items-center gap-2 rounded-xl bg-black dark:bg-white px-4 py-2 text-sm font-medium text-white dark:text-black"
          >
            <Plus size={16} />
            New
          </button>
        </div>

        <div className="mt-5">
          <SearchBar
            value={search}
            onChange={
              setSearch
            }
          />
        </div>
      </div>

      {/* Notes */}
      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {loading ? (
          <p className="text-sm text-zinc-500">
            Loading...
          </p>
        ) : (
          notes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              active={
                note.id ===
                activeId
              }
              onDelete={
                deleteNote
              }
            />
          ))
        )}
      </div>
    </div>
  );
}