"use client";

import Link from "next/link";

import Button from "./ui/Button";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-28">
      {/* Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(120,119,198,0.15),transparent_40%)]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/70 px-4 py-2 text-sm backdrop-blur-xl">
            ✨ AI Powered Collaborative Workspace
          </div>

          {/* Heading */}
          <h1 className="mt-8 text-5xl font-bold tracking-tight md:text-7xl leading-tight">
            Your Second Brain
            <br />
            for Smart Notes
          </h1>

          {/* Description */}
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-zinc-500">
            Organize notes, generate AI summaries,
            extract action items, and boost productivity
            with a beautifully designed collaborative
            workspace.
          </p>

          {/* Actions */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/signup">
              <Button className="px-8 py-6 text-base rounded-2xl">
                Start Writing
              </Button>
            </Link>

            <button className="rounded-2xl border border-zinc-200 dark:border-zinc-800 px-8 py-6 text-base transition hover:bg-zinc-100 dark:hover:bg-zinc-900">
              Watch Demo
            </button>
          </div>

          {/* Dashboard Preview */}
          <div className="mt-20 rounded-[32px] border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/70 p-4 shadow-2xl backdrop-blur-xl">
            <img
              src="/dashboard-preview.png"
              alt="Dashboard Preview"
              className="rounded-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}