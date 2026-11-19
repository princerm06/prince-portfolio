import type { Metadata, Viewport } from "next";
import { identity } from "@/content";
import { fontVariables } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: `${identity.name} — Milestone 0 foundation`,
  description: `${identity.name}: ${identity.roleLine.join(" | ")}. Portfolio foundation in progress.`,
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#090c10",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={fontVariables}>
      <body className="min-h-screen antialiased">
        <a
          href="#main"
          className="absolute left-4 top-4 z-10 -translate-y-24 rounded-sm bg-ink px-4 py-2 font-mono text-sm text-canvas focus:translate-y-0"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
