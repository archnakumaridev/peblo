"use client";

import { use } from "react";

import { useNotes } from "@/hooks/useNotes";

import { useNote } from "@/hooks/useNote";

import NotesLayout from "@/components/notes/NotesLayout";

import NotesList from "@/components/notes/NotesList";

import NoteEditor from "@/components/notes/NoteEditor";

import AiPanel from "@/components/notes/AiPanel";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default function NotePage({
  params,
}: Props) {
  const { id } = use(params);

  const notesHook =
    useNotes();

  const {
    note,
    loading,
    saving,
    aiLoading,
    updateNote,
    updateTags,
    generateAI,
    createShareLink,
 
  } = useNote(id);

  if (loading || !note) {
    return (
      <div className="flex h-[60vh] items-center justify-center px-4 text-center">
        <p className="text-sm text-zinc-500 sm:text-base">
          Loading note...
        </p>
      </div>
    );
  }

  return (
    <NotesLayout
      sidebar={
        <NotesList
          notes={
            notesHook.notes
          }
          loading={
            notesHook.loading
          }
          search={
            notesHook.search
          }
          setSearch={
            notesHook.setSearch
          }
          createNote={
            notesHook.createNote
          }
          deleteNote={
            notesHook.deleteNote
          }
          
          activeId={id}
        />
      }
      editor={
        <div className="min-w-0">
          <NoteEditor
            note={note}
            saving={saving}
            aiLoading={
              aiLoading
            }
            onGenerateAI={
              generateAI
            }
          
            onShare={
              createShareLink
            }
            shareUrl={
              note.shareLink
                ? `${window.location.origin}/shared/${note.shareLink.slug}`
                : null
            }
            onChange={
              updateNote
            }
            onTagsChange={
              updateTags
            }
          />
        </div>
      }
      aiPanel={
        <div className="min-w-0">
          <AiPanel
            summary={
              note.aiSummary ||
              undefined
            }
            suggestedTitle={
              note.aiSuggestedTitle ||
              undefined
            }
            loading={
              aiLoading
            }
            onGenerate={
              generateAI
            }
          />
        </div>
      }
    />
  );
}