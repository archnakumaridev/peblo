import { LucideIcon } from "lucide-react";

interface Props {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function FeatureCard({
  icon: Icon,
  title,
  description,
}: Props) {
  return (
    <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 transition-all hover:-translate-y-1 hover:shadow-2xl">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-900">
        <Icon size={22} />
      </div>

      <h3 className="text-xl font-semibold">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-relaxed text-zinc-500">
        {description}
      </p>
    </div>
  );
}