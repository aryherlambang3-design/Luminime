"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { cn } from "@/lib/utils";
import { Logo, LogoIcon } from "@/components/logo";

const links = [
  { href: "/", label: "Home" },
  { href: "/jadwal", label: "Jadwal" },
  { href: "/ongoing", label: "Ongoing" },
  { href: "/complete", label: "Tamat" },
  { href: "/genre", label: "Genre" },
  { href: "/all", label: "Semua Anime" },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  function onSearch(e: FormEvent) {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    setOpen(false);
    router.push(`/search?q=${encodeURIComponent(q)}`);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0c0610]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 md:px-6">
        <Link href="/" className="flex items-center shrink-0">
          {/* Responsive logo */}
          <div className="sm:hidden">
            <Logo size={50} showText={true} />
          </div>
          <div className="hidden sm:block">
            <Logo size={70} showText={true} />
          </div>
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-1 lg:flex">
          {links.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-3 py-2 text-sm font-medium transition",
                  active
                    ? "bg-white/10 text-white"
                    : "text-slate-300 hover:bg-white/5 hover:text-white",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <form
          onSubmit={onSearch}
          className="ml-auto hidden min-w-0 flex-1 max-w-md items-center gap-2 md:flex"
        >
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari anime..."
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none ring-rose-300/30 placeholder:text-slate-500 focus:ring-2"
          />
          <button
            type="submit"
            className="rounded-2xl bg-gradient-to-r from-rose-400 to-pink-400 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-rose-400/15"
          >
            Cari
          </button>
        </form>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="ml-auto rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white lg:hidden"
          aria-label="Toggle menu"
        >
          {open ? "Tutup" : "Menu"}
        </button>
      </div>

      {open ? (
        <div className="border-t border-white/10 px-4 py-4 lg:hidden">
          <form onSubmit={onSearch} className="mb-3 flex gap-2">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari anime..."
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none placeholder:text-slate-500"
            />
            <button
              type="submit"
              className="rounded-2xl bg-rose-400 px-4 py-2.5 text-sm font-semibold text-white"
            >
              Cari
            </button>
          </form>
          <div className="grid grid-cols-2 gap-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl border border-white/10 bg-white/5 px-3 py-3 text-sm text-slate-200"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
