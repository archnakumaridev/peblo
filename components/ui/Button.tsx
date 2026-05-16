import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

export default function Button({
  className,
  children,
  ...props
}: Props) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-medium transition-all",
        "bg-white text-black hover:opacity-90",
        "dark:bg-white dark:text-black",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}