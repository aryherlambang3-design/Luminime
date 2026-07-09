import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AnimeCard } from "@/components/anime-card";
import { PageHero } from "@/components/page-hero";
import { getAnimeDetail } from "@/lib/anime-api";
import { formatScore } from "@/lib/utils";

export const revalidate = 120;

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  try {
    const result = await getAnimeDetail(id);
    return {
      title: result.data.title,
      description:
        result.data.synopsis?.paragraphs?.join(" ").slice(0, 160) ||
        `Nonton ${result.data.title} subtitle Indonesia gratis di Luminime.`,
    };
  } catch {
    return { title: "Detail Anime" };
  }
}

export default async function AnimeDetailPage({ params }: Props) {
  const { id } = await params;

  let anime;
  try {
    const result = await getAnimeDetail(id);
    anime = result.data;
  } catch {
    notFound();
  }

  const synopsis = anime.synopsis?.paragraphs?.filter(Boolean) ?? [];
  const episodes = [...(anime.episodeList ?? [])].sort((a, b) => {
    const ae = Number(a.eps ?? 0);
    const be = Number(b.eps ?? 0);
    return ae - be;
  });
  const firstEpisode = episodes[0];

  return (
    <div className="space-y-8">
      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <div className="relative mx-auto aspect-[3/4] w-full max-w-[280px] overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900 shadow-2xl shadow-black/40">
          {anime.poster ? (
            <Image
              src={anime.poster}
              alt={anime.title}
              fill
              className="object-cover"
              sizes="280px"
              unoptimized
              priority
            />
          ) : null}
        </div>

        <div className="space-y-5">
          <PageHero
            eyebrow={anime.status || "Anime"}
            title={anime.title}
            description={
              anime.japanese
                ? `Judul Jepang: ${anime.japanese}`
                : "Detail lengkap anime subtitle Indonesia"
            }
          />

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {[
              ["Skor", formatScore(anime.score)],
              ["Tipe", anime.type || "-"],
              ["Status", anime.status || "-"],
              ["Episode", anime.episodes != null ? String(anime.episodes) : "-"],
              ["Durasi", anime.duration || "-"],
              ["Studio", anime.studios || "-"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
              >
                <p className="text-xs uppercase tracking-wider text-slate-500">
                  {label}
                </p>
                <p className="mt-1 text-sm font-semibold text-white">{value}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {(anime.genreList ?? []).map((genre) => (
              <Link
                key={genre.genreId}
                href={`/genre/${encodeURIComponent(genre.genreId)}`}
                className="rounded-full border border-rose-300/20 bg-rose-400/8 px-3 py-1.5 text-sm text-rose-100"
              >
                {genre.title}
              </Link>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            {firstEpisode ? (
              <Link
                href={`/episode/${encodeURIComponent(firstEpisode.episodeId)}`}
                className="rounded-2xl bg-gradient-to-r from-rose-400 to-pink-400 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-rose-400/15"
              >
                Nonton Episode 1
              </Link>
            ) : null}
            {anime.batch?.batchId ? (
              <Link
                href={`/batch/${encodeURIComponent(anime.batch.batchId)}`}
                className="rounded-2xl border border-rose-300/25 bg-rose-400/10 px-5 py-3 text-sm font-semibold text-rose-100"
              >
                Download Batch
              </Link>
            ) : null}
          </div>
        </div>
      </div>

      <section className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-5 md:p-6">
        <h2 className="text-xl font-bold text-white">Sinopsis</h2>
        <div className="mt-3 space-y-3 text-sm leading-7 text-slate-300">
          {synopsis.length > 0 ? (
            synopsis.map((paragraph) => <p key={paragraph}>{paragraph}</p>)
          ) : (
            <p>Sinopsis belum tersedia.</p>
          )}
        </div>
        <div className="mt-5 grid gap-2 text-sm text-slate-400 sm:grid-cols-2">
          <p>
            <span className="text-slate-500">Produser:</span>{" "}
            {anime.producers || "-"}
          </p>
          <p>
            <span className="text-slate-500">Aired:</span> {anime.aired || "-"}
          </p>
        </div>
      </section>

      <section className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-5 md:p-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-xl font-bold text-white">Daftar Episode</h2>
          <span className="text-sm text-slate-400">
            {episodes.length} episode
          </span>
        </div>
        {episodes.length === 0 ? (
          <p className="text-sm text-slate-400">Episode belum tersedia.</p>
        ) : (
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {episodes.map((episode) => (
              <Link
                key={episode.episodeId}
                href={`/episode/${encodeURIComponent(episode.episodeId)}`}
                className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 transition hover:border-rose-300/25 hover:bg-white/[0.05]"
              >
                <p className="text-sm font-semibold text-white">
                  Episode {episode.eps ?? "?"}
                </p>
                <p className="mt-1 line-clamp-2 text-xs text-slate-400">
                  {episode.title}
                </p>
                {episode.date ? (
                  <p className="mt-2 text-[11px] text-slate-500">
                    {episode.date}
                  </p>
                ) : null}
              </Link>
            ))}
          </div>
        )}
      </section>

      {(anime.recommendedAnimeList ?? []).length > 0 ? (
        <section>
          <h2 className="mb-4 text-xl font-bold text-white">Rekomendasi</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {anime.recommendedAnimeList?.slice(0, 10).map((item) => (
              <AnimeCard key={item.animeId} anime={item} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
