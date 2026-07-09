import { AnimeCard } from "@/components/anime-card";
import { EmptyState } from "@/components/empty-state";
import { PageHero } from "@/components/page-hero";
import { Pagination } from "@/components/pagination";
import { getGenreAnime, getGenres } from "@/lib/anime-api";

export const revalidate = 300;

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
};

export default async function GenreDetailPage({
  params,
  searchParams,
}: Props) {
  const { slug } = await params;
  const query = await searchParams;
  const page = Math.max(1, Number(query.page || "1") || 1);

  const [result, genres] = await Promise.all([
    getGenreAnime(slug, page),
    getGenres().catch(() => null),
  ]);

  const list = result.data.animeList ?? [];
  const genreTitle =
    genres?.data.genreList.find((g) => g.genreId === slug)?.title || slug;

  return (
    <div className="space-y-8">
      <PageHero
        eyebrow="Genre"
        title={`Anime Genre ${genreTitle}`}
        description={`Daftar anime bergenre ${genreTitle} dengan subtitle Indonesia.`}
      />

      {list.length === 0 ? (
        <EmptyState
          title="Anime tidak ditemukan"
          description="Coba genre lain atau kembali ke daftar genre."
          actionHref="/genre"
          actionLabel="Semua Genre"
        />
      ) : (
        <>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {list.map((anime) => (
              <AnimeCard key={anime.animeId} anime={anime} />
            ))}
          </div>
          <Pagination
            basePath={`/genre/${encodeURIComponent(slug)}`}
            pagination={result.pagination}
          />
        </>
      )}
    </div>
  );
}
