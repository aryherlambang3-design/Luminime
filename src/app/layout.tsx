import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "LumineStream · Nonton Anime Sub Indo Gratis",
    template: "%s · LumineStream",
  },
  description:
    "Nonton anime gratis subtitle Indonesia. Jadwal rilis, ongoing, complete, genre, batch download, dan streaming episode. Your Anime Paradise!",
  keywords: ["anime", "nonton anime", "anime sub indo", "streaming anime", "anime gratis", "ongoing anime", "complete anime"],
  authors: [{ name: "LumineStream" }],
  creator: "LumineStream",
  publisher: "LumineStream",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "LumineStream",
    title: "LumineStream · Your Anime Paradise",
    description: "Nonton anime gratis subtitle Indonesia. Jadwal rilis, ongoing, complete, genre, batch download, dan streaming episode.",
  },
  twitter: {
    card: "summary_large_image",
    title: "LumineStream · Your Anime Paradise",
    description: "Nonton anime gratis subtitle Indonesia",
  },
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
        <Analytics />
      </body>
    </html>
  );
}
