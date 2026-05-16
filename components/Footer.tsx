export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 py-10">
      <div className="mx-auto flex max-w-7xl flex-col md:flex-row items-center justify-between px-6 gap-4">
        <div>
          <h3 className="text-xl font-bold">
            Peblo
          </h3>

          <p className="mt-1 text-sm text-zinc-500">
            AI Powered Workspace
          </p>
        </div>

        <p className="text-sm text-zinc-500">
          © 2026 Peblo. All rights reserved.
        </p>
      </div>
    </footer>
  );
}