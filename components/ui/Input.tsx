import { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

export default function Input({
  className,
  ...props
}: Props) {
  return (
    <input
      className={cn(
        "w-full rounded-xl border bg-transparent px-4 py-3 outline-none transition",
        "border-zinc-800 dark:border-zinc-700",
        "focus:ring-2 focus:ring-zinc-500",
        className
      )}
      {...props}
    />
  );
}