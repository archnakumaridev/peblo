import AuthHero from "./AuthHero";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2 bg-white dark:bg-black">
     
      <AuthHero />

     
      <div className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
}