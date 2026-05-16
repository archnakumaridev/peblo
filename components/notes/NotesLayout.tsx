"use client";

interface Props {
  sidebar: React.ReactNode;

  editor: React.ReactNode;

  aiPanel: React.ReactNode;
}

export default function NotesLayout({
  sidebar,
  editor,
  aiPanel,
}: Props) {
  return (
    <div className="flex h-[calc(100vh-80px)] flex-col overflow-hidden rounded-3xl border border-zinc-200 dark:border-zinc-800 xl:grid xl:grid-cols-[320px_minmax(0,1fr)_340px]">
      {/* Mobile Sidebar */}
      <div className="border-b border-zinc-200 dark:border-zinc-800 xl:hidden">
        <div className="max-h-[260px] overflow-y-auto">
          {sidebar}
        </div>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden border-r border-zinc-200 dark:border-zinc-800 xl:block">
        {sidebar}
      </aside>

      {/* Editor */}
      <section className="min-h-0 min-w-0 flex-1 overflow-hidden">
        {editor}
      </section>

      {/* Mobile AI Panel */}
      <div className="border-t border-zinc-200 dark:border-zinc-800 xl:hidden">
        <div className="max-h-[280px] overflow-y-auto">
          {aiPanel}
        </div>
      </div>

      {/* Desktop AI Panel */}
      <aside className="hidden border-l border-zinc-200 dark:border-zinc-800 xl:block">
        {aiPanel}
      </aside>
    </div>
  );
}