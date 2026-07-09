import { AnimeCard } from "@/components/anime-card";
import { EmptyState } from "@/components/empty-state";
import { PageHero } from "@/components/page-hero";
import { Pagination } from "@/components/pagination";
import { getCompleted } from "@/lib/anime-api";

export const revalidate = 300;

type Props = {
  searchParams: Promise<{ page?: string }>;
};

export default async function CompletePage({ searchParams }: Props) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page || "1") || 1);
  const result = await getCompleted(page);
  const list = result.data.animeList ?? [];

  return (
    <div className="space-y-8">
      <PageHero
        eyebrow="Anime Tamat"
        title="Anime Completed"
        description="Koleksi anime yang sudah tamat, lengkap per halaman. Cocok untuk binge-watch."
      />

      {list.length === 0 ? (
        <EmptyState title="Belum ada anime completed" />
      ) : (
        <>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {list.map((anime) => (
              <AnimeCard key={anime.animeId} anime={anime} badge="Completed" />
            ))}
          </div>
          <Pagination basePath="/complete" pagination={result.pagination} />
        </>
      )}
    </div>
  );
}
