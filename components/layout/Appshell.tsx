import Sidebar from "./Sidebar";

import Topbar from "./Topbar";

export default function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen overflow-hidden bg-white text-black dark:bg-black dark:text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />

        <main className="min-w-0 flex-1 overflow-x-hidden p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}