import {
  useState,
  useEffect,
  useCallback,
} from "react";

import { api } from "@/lib/api";

import { Note } from "@/types";

export function useNotes() {
  const [notes, setNotes] =
    useState<Note[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(
      null
    );

  const [search, setSearch] =
    useState("");

  const [
    tagFilter,
    setTagFilter,
  ] = useState("");

  // NEW
  const [
    showArchived,
    setShowArchived,
  ] = useState(false);

  const fetchNotes =
    useCallback(async () => {
      try {
        setLoading(true);

        const params =
          new URLSearchParams();

        if (search)
          params.set(
            "search",
            search
          );

        if (tagFilter)
          params.set(
            "tag",
            tagFilter
          );

        const data = await api(
          `/api/notes?${params.toString()}`
        );

        setNotes(
          data.notes || []
        );
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }, [search, tagFilter]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const createNote =
    async () => {
      try {
        const note =
          await api(
            "/api/notes",
            {
              method: "POST",

              body: JSON.stringify(
                {
                  title:
                    "Untitled Note",

                  content: "",
                }
              ),
            }
          );

        setNotes((prev) => [
          note,
          ...prev,
        ]);

        return note;
      } catch (err: any) {
        setError(err.message);

        return null;
      }
    };

  const deleteNote =
    async (id: string) => {
      try {
        await api(
          `/api/notes/${id}`,
          {
            method:
              "DELETE",
          }
        );

        setNotes((prev) =>
          prev.filter(
            (n) =>
              n.id !== id
          )
        );
      } catch (err: any) {
        setError(err.message);
      }
    };

  const archiveNote =
    async (
      id: string,
      archived: boolean
    ) => {
      try {
        const updated =
          await api(
            `/api/notes/${id}`,
            {
              method:
                "PATCH",

              body: JSON.stringify(
                {
                  archived,
                }
              ),
            }
          );

        setNotes((prev) =>
          prev.map((n) =>
            n.id === id
              ? updated
              : n
          )
        );
      } catch (err: any) {
        setError(err.message);
      }
    };


  const filteredNotes =
    notes.filter((note) => {
      if (showArchived) {
        return note.archived;
      }

      return !note.archived;
    });

  return {
    notes:
      filteredNotes,

    allNotes: notes,

    loading,
    error,

    search,
    setSearch,

    tagFilter,
    setTagFilter,

    showArchived,
    setShowArchived,

    createNote,
    deleteNote,
    archiveNote,

    refetch: fetchNotes,
  };
}