import { Tag } from "@/types";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

async function getSharedNote(
  slug: string
) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/shared/${slug}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error(
      "Failed to fetch shared note"
    );
  }

  return res.json();
}

export default async function SharedPage({
  params,
}: Props) {
  const { slug } =
    await params;

  const note =
    await getSharedNote(
      slug
    );

  return (
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <div className="mx-auto max-w-4xl px-6 py-20">
        {/* Header */}
        <div className="mb-10 border-b border-zinc-200 dark:border-zinc-800 pb-8">
          <h1 className="text-5xl font-bold tracking-tight">
            {note.title}
          </h1>

          <div className="mt-5 flex flex-wrap gap-2">
            {note.tags?.map(
              (tag: Tag) => (
                <span
                  key={tag.id}
                  className="rounded-full bg-zinc-100 dark:bg-zinc-900 px-3 py-1 text-sm"
                >
                  {tag.name}
                </span>
              )
            )}
          </div>
        </div>

        <article className="max-w-none">
          <pre className="whitespace-pre-wrap font-sans text-lg leading-relaxed">
            {note.content}
          </pre>
        </article>

        {/* Footer */}
        <div className="mt-20 border-t border-zinc-200 dark:border-zinc-800 pt-8">
          <p className="text-sm text-zinc-500">
            Shared via Peblo Workspace
          </p>
        </div>
      </div>
    </main>
  );
}