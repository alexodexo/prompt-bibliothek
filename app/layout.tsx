import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Prompt-Bibliothek",
  description: "Gesammelte Prompts für die tägliche Arbeit.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="de" className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-stuck text-tinte">{children}</body>
    </html>
  );
}
