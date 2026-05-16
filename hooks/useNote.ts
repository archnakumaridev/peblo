import { useState, useEffect, useRef, useCallback } from "react";
import { api } from "@/lib/api";
import { Note,Tag } from "@/types";

export function useNote(id: string) {
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Fetch note on mount
  useEffect(() => {
    const fetchNote = async () => {
      try {
        setLoading(true);
        const data = await api(`/api/notes/${id}`);
        setNote(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  // Auto-save with debounce
  const updateNote = useCallback(
    (fields: Partial<Pick<Note, "title" | "content" | "tags">>) => {
      // Optimistically update UI instantly
      setNote((prev) => (prev ? { ...prev, ...fields } : prev));

      // Debounce the actual API call by 800ms
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
      debounceTimer.current = setTimeout(async () => {
        try {
          setSaving(true);
          const updated = await api(`/api/notes/${id}`, {
            method: "PATCH",
            body: JSON.stringify(fields),
          });
          setNote(updated);
        } catch (err: any) {
          setError(err.message);
        } finally {
          setSaving(false);
        }
      }, 800);
    },
    [id]
  );

  // Update tags immediately (no debounce)
const updateTags = async (
  tags: Tag[]
) => {
  // Optimistic UI update
  setNote((prev) =>
    prev
      ? {
          ...prev,
          tags,
        }
      : prev
  );

  try {
    setSaving(true);

    const updated = await api(
      `/api/notes/${id}`,
      {
        method: "PATCH",

        body: JSON.stringify({
          tags: tags.map(
            (t) => t.name
          ),
        }),
      }
    );

    setNote(updated);
  } catch (err: any) {
    setError(err.message);
  } finally {
    setSaving(false);
  }
};

  // Generate AI summary
  const generateAI = async () => {
    try {
      setAiLoading(true);
      const result = await api(`/api/notes/${id}/generate`, { method: "POST" });
      setNote((prev) =>
        prev
          ? {
              ...prev,
              aiSummary: result.summary,
              aiActions: JSON.stringify(result.action_items),
              aiSuggestedTitle: result.suggested_title,
            }
          : prev
      );
      return result;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setAiLoading(false);
    }
  };

  // Create share link
  const createShareLink = async () => {
    try {
      const result = await api(`/api/notes/${id}/share`, { method: "POST" });
      setNote((prev) =>
        prev ? { ...prev, shareLink: { slug: result.slug } } : prev
      );
      return result;
    } catch (err: any) {
      setError(err.message);
      return null;
    }
  };

  const archiveNote = async (
  archived: boolean
) => {
  try {
    setSaving(true);

    const updated = await api(
      `/api/notes/${id}`,
      {
        method: "PATCH",

        body: JSON.stringify({
          archived,
        }),
      }
    );

    setNote(updated);

    return updated;
  } catch (err: any) {
    setError(err.message);

    return null;
  } finally {
    setSaving(false);
  }
};
  // Remove share link
  const removeShareLink = async () => {
    try {
      await api(`/api/notes/${id}/share`, { method: "DELETE" });
      setNote((prev) => (prev ? { ...prev, shareLink: null } : prev));
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, []);

  return {
    note,
    loading,
    saving,
    aiLoading,
    error,
    updateNote,
    updateTags,
    generateAI,
    createShareLink,
    removeShareLink,
    archiveNote
  };
}