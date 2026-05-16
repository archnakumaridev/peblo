"use client";

interface Props {
  summary?: string;

  suggestedTitle?: string;

  loading?: boolean;

  onGenerate?: () => void;
}

export default function AiPanel({
  summary,
  suggestedTitle,
  loading,
  onGenerate,
}: Props) {
  return (
    <div className="h-full overflow-y-auto p-5">
      {/* Generate */}
      <button
        onClick={onGenerate}
        disabled={loading}
        className="w-full rounded-2xl bg-black dark:bg-white px-4 py-3 text-sm font-medium text-white dark:text-black"
      >
        {loading
          ? "Generating..."
          : "Generate AI"}
      </button>

      {/* Summary */}
      <div className="mt-5 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-5">
        <h2 className="text-xl font-bold">
          AI Summary
        </h2>

        <p className="mt-4 text-sm leading-relaxed text-zinc-500">
          {summary ||
            "Generate AI summary to view insights."}
        </p>
      </div>

      {/* Suggested */}
      <div className="mt-5 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-5">
        <h2 className="text-xl font-bold">
          Suggested Title
        </h2>

        <p className="mt-4 text-sm text-zinc-500">
          {suggestedTitle ||
            "No suggestion yet."}
        </p>
      </div>
    </div>
  );
}