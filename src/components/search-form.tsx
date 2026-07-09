"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

type HistoryItem = {
  id: number;
  query: string;
  resultCount: number;
};

type Props = {
  initialQuery?: string;
  history?: HistoryItem[];
};

export function SearchForm({ initialQuery = "", history = [] }: Props) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    router.push(`/search?q=${encodeURIComponent(q)}`);
  }

  return (
    <div className="space-y-4">
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-3 rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-4 sm:flex-row"
      >
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Contoh: One Piece, Jujutsu Kaisen, Solo Leveling..."
          className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none ring-rose-300/25 placeholder:text-slate-500 focus:ring-2"
        />
        <button
          type="submit"
          className="rounded-2xl bg-gradient-to-r from-rose-400 to-pink-400 px-5 py-3 text-sm font-semibold text-white"
        >
          Cari Anime
        </button>
      </form>

      {history.length > 0 ? (
        <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.02] p-4">
          <p className="mb-3 text-sm font-medium text-slate-300">
            Riwayat pencarian
          </p>
          <div className="flex flex-wrap gap-2">
            {history.map((item) => (
              <Link
                key={item.id}
                href={`/search?q=${encodeURIComponent(item.query)}`}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-slate-200 hover:bg-white/10"
              >
                {item.query}
                <span className="ml-2 text-xs text-slate-500">
                  {item.resultCount}
                </span>
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
