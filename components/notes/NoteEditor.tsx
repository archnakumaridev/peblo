"use client";

import EditorToolbar from "./EditorToolbar";

import TagInput from "./TagInput";

import { Note, Tag } from "@/types";

interface Props {
  note: Note;

  saving?: boolean;

  aiLoading?: boolean;

  onGenerateAI?: () => void;

  onShare?: () => void;

  shareUrl?: string | null;
  archived?: boolean;

onArchive?: () => void;

 onChange: (
  fields: Partial<
    Pick<
      Note,
      "title" | "content"
    >
  >
) => void;

onTagsChange?: (
  tags: Tag[]
) => void;
}

export default function NoteEditor({
  note,
  saving,
  aiLoading,
  onGenerateAI,
  onShare,
  shareUrl,
  onChange,
  onTagsChange,
}: Props) {
  return (
    <div className="flex h-full flex-col">
      {/* Toolbar */}
      <EditorToolbar
        aiLoading={aiLoading}
        onGenerateAI={onGenerateAI}
        onShare={onShare}
        shareUrl={shareUrl}
        
      />

      {/* Save Status */}
      <div className="border-b border-zinc-200 dark:border-zinc-800 px-6 py-2">
        <p className="text-sm text-zinc-500">
          {saving
            ? "Saving..."
            : "Saved"}
        </p>
      </div>

      {/* Editor */}
      <div className="flex-1 overflow-y-auto px-10 py-8">
        {/* Title */}
        <input
          value={note.title}
          onChange={(e) =>
            onChange({
              title:
                e.target.value,
            })
          }
          placeholder="Untitled Note"
          className="w-full bg-transparent text-5xl font-bold tracking-tight outline-none"
        />

        {/* Tags */}
        <div className="mt-6">
      <TagInput
  tags={note.tags}
  onChange={onTagsChange}
/>
        </div>

        {/* Content */}
        <textarea
          value={note.content}
          onChange={(e) =>
            onChange({
              content:
                e.target.value,
            })
          }
          placeholder="Start writing..."
          className="mt-8 min-h-[500px] w-full resize-none bg-transparent text-lg leading-relaxed outline-none"
        />
      </div>
    </div>
  );
}