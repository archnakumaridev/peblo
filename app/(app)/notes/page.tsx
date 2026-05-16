"use client";

import { useNotes } from "@/hooks/useNotes";

import NotesLayout from "@/components/notes/NotesLayout";

import NotesList from "@/components/notes/NotesList";

export default function NotesPage() {
  const {
    notes,
    loading,
    search,
    setSearch,
    createNote,
    deleteNote,

  } = useNotes();

  return (
    <NotesLayout
      sidebar={
        <NotesList
          notes={notes}
          loading={loading}
          search={search}
          setSearch={
            setSearch
          }
          createNote={
            createNote
          }
          deleteNote={
            deleteNote
          }
        
       
        />
      }
      editor={
        <div className="flex h-full items-center justify-center px-6 py-10">
          <div className="max-w-md text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Select a note
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-zinc-500 sm:text-base">
              Choose a note from the sidebar
              or create a new one.
            </p>
          </div>
        </div>
      }
      aiPanel={
        <div className="flex h-full items-center justify-center px-6 text-center text-sm text-zinc-500 sm:text-base">
          AI insights appear here
        </div>
      }
    />
  );
}