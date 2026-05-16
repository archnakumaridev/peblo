export default function AuthHero() {
  return (
    <div className="relative hidden lg:flex flex-col justify-between overflow-hidden border-r border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 p-12">
      {/* Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(120,119,198,0.12),transparent_45%)]" />

      {/* Logo */}
      <div className="relative z-10">
        <h1 className="text-3xl font-bold tracking-tight">
          Peblo
        </h1>

        <p className="mt-2 text-zinc-500">
          AI Powered Workspace
        </p>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-lg">
        <div className="inline-flex rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/70 px-4 py-2 text-sm backdrop-blur-xl">
          ✨ Collaborative AI Notes
        </div>

        <h2 className="mt-8 text-5xl font-bold leading-tight tracking-tight">
          Organize your thoughts intelligently.
        </h2>

        <p className="mt-6 text-lg leading-relaxed text-zinc-500">
          Generate AI summaries, manage notes,
          track productivity, and collaborate
          seamlessly in one modern workspace.
        </p>

        {/* Features */}
        <div className="mt-10 space-y-4">
          {[
            "AI-generated summaries",
            "Smart search & filtering",
            "Public note sharing",
            "Productivity analytics",
          ].map((feature) => (
            <div
              key={feature}
              className="flex items-center gap-3"
            >
              <div className="h-2 w-2 rounded-full bg-black dark:bg-white" />

              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {feature}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom */}
      <div className="relative z-10">
        <p className="text-sm text-zinc-500">
          Designed for creators, teams, and
          productivity enthusiasts.
        </p>
      </div>
    </div>
  );
}