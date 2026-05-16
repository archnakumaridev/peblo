export default function DashboardSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="grid gap-5 md:grid-cols-3">
        {Array.from({
          length: 3,
        }).map((_, i) => (
          <div
            key={i}
            className="h-36 rounded-3xl bg-zinc-100 dark:bg-zinc-900"
          />
        ))}
      </div>

      <div className="h-[320px] rounded-3xl bg-zinc-100 dark:bg-zinc-900" />

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="h-[320px] rounded-3xl bg-zinc-100 dark:bg-zinc-900" />

        <div className="h-[320px] rounded-3xl bg-zinc-100 dark:bg-zinc-900" />
      </div>
    </div>
  );
}