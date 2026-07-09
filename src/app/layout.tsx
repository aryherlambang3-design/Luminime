import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Luminime · Nonton Anime Sub Indo Gratis",
    template: "%s · Luminime",
  },
  description:
    "Nonton anime gratis subtitle Indonesia. Jadwal rilis, ongoing, complete, genre, batch download, dan streaming episode.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id">
      <body className="min-h-screen antialiased">
        <Navbar />
        <main className="mx-auto min-h-[70vh] max-w-7xl px-4 py-6 md:px-6 md:py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
