"use client";

import {
  Bold,
  Italic,
  List,
  Sparkles,
  Share2,
  Check,
} from "lucide-react";

interface Props {
  aiLoading?: boolean;

  onGenerateAI?: () => void;

  shareUrl?: string | null;

  onShare?: () => void;
  
}

export default function EditorToolbar({
  aiLoading,
  onGenerateAI,
  shareUrl,
  onShare,
}: Props) {
  const handleCopy = async () => {
    if (!shareUrl) return;

    await navigator.clipboard.writeText(
      shareUrl
    );
  };

  return (
    <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 px-6 py-3">
      {/* Left */}
      <div className="flex items-center gap-2">
        <button className="rounded-lg p-2 hover:bg-zinc-100 dark:hover:bg-zinc-900">
          <Bold size={18} />
        </button>

        <button className="rounded-lg p-2 hover:bg-zinc-100 dark:hover:bg-zinc-900">
          <Italic size={18} />
        </button>

        <button className="rounded-lg p-2 hover:bg-zinc-100 dark:hover:bg-zinc-900">
          <List size={18} />
        </button>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        {/* Share */}
        {shareUrl ? (
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-800 px-4 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-900"
          >
            <Check size={16} />

            Copy Link
          </button>
        ) : (
          <button
            onClick={onShare}
            className="flex items-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-800 px-4 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-900"
          >
            <Share2 size={16} />

            Share
          </button>
        )}

        {/* AI */}
        <button
          onClick={onGenerateAI}
          disabled={aiLoading}
          className="flex items-center gap-2 rounded-xl bg-black dark:bg-white px-4 py-2 text-sm text-white dark:text-black"
        >
          <Sparkles size={16} />

          {aiLoading
            ? "Generating..."
            : "Generate AI"}
        </button>
      </div>
    </div>
  );
}