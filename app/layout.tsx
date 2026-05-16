import "./globals.css";
import Providers from "@/provider/providers";

export const metadata = {
  title: "Peblo Workspace",
  description: "AI Powered Notes Workspace",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}