import { desc } from "drizzle-orm";
import { AnimeCard } from "@/components/anime-card";
import { EmptyState } from "@/components/empty-state";
import { PageHero } from "@/components/page-hero";
import { SearchForm } from "@/components/search-form";
import { db } from "@/db";
import { searchHistory } from "@/db/schema";
import { searchAnime } from "@/lib/anime-api";

export const dynamic = "force-dynamic";

type Props = {
  searchParams: Promise<{ q?: string }>;
};

export default async function SearchPage({ searchParams }: Props) {
  const { q = "" } = await searchParams;
  const query = q.trim();

  let list: Awaited<ReturnType<typeof searchAnime>>["data"]["animeList"] = [];
  let error: string | null = null;

  if (query) {
    try {
      const result = await searchAnime(query);
      list = result.data.animeList ?? [];
      await db
        .insert(searchHistory)
        .values({
          query: query.toLowerCase(),
          resultCount: list.length,
        })
        .onConflictDoUpdate({
          target: searchHistory.query,
          set: {
            resultCount: list.length,
            createdAt: new Date(),
          },
        });
    } catch (err) {
      error = err instanceof Error ? err.message : "Gagal mencari anime";
    }
  }

  const history = await db
    .select()
    .from(searchHistory)
    .orderBy(desc(searchHistory.createdAt))
    .limit(10);

  return (
    <div className="space-y-8">
      <PageHero
        eyebrow="Pencarian"
        title="Cari Anime Sub Indo"
        description="Ketik judul anime favoritmu. Riwayat pencarian disimpan agar lebih cepat dicari lagi."
      />

      <SearchForm initialQuery={query} history={history} />

      {error ? (
        <EmptyState title="Pencarian gagal" description={error} />
      ) : null}

      {!error && query && list.length === 0 ? (
        <EmptyState
          title={`Tidak ada hasil untuk “${query}”`}
          description="Coba kata kunci lain yang lebih spesifik."
          actionHref="/search"
          actionLabel="Cari lagi"
        />
      ) : null}

      {list.length > 0 ? (
        <section>
          <p className="mb-4 text-sm text-slate-400">
            Ditemukan {list.length} hasil untuk “{query}”
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {list.map((anime) => (
              <AnimeCard key={anime.animeId} anime={anime} />
            ))}
          </div>
        </section>
      ) : null}

      {!query && !error ? (
        <EmptyState
          title="Mulai pencarian"
          description="Masukkan judul anime di kolom pencarian di atas."
          actionHref="/"
          actionLabel="Ke Home"
        />
      ) : null}
    </div>
  );
}
