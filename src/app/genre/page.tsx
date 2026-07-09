import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { getGenres } from "@/lib/anime-api";

export const revalidate = 3600;

export default async function GenrePage() {
  const result = await getGenres();
  const genres = result.data.genreList ?? [];

  return (
    <div className="space-y-8">
      <PageHero
        eyebrow="Katalog Genre"
        title="Daftar Semua Genre"
        description="Pilih genre favoritmu lalu jelajahi daftar anime subtitle Indonesia di dalamnya."
      />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {genres.map((genre) => (
          <Link
            key={genre.genreId}
            href={`/genre/${encodeURIComponent(genre.genreId)}`}
            className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-5 transition hover:-translate-y-0.5 hover:border-rose-300/30"
          >
            <p className="text-base font-semibold text-white">{genre.title}</p>
            <p className="mt-2 text-xs uppercase tracking-wider text-slate-400">
              {genre.genreId}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
