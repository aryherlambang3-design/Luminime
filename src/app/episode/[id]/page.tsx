import Link from "next/link";
import { notFound } from "next/navigation";
import { DownloadList } from "@/components/download-list";
import { VideoPlayer } from "@/components/video-player";
import { WatchTracker } from "@/components/watch-tracker";
import { getAnimeDetail, getEpisodeDetail } from "@/lib/anime-api";

export const revalidate = 60;

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  try {
    const result = await getEpisodeDetail(id);
    return {
      title: result.data.title,
      description: `Nonton ${result.data.title} streaming subtitle Indonesia.`,
    };
  } catch {
    return { title: "Nonton Episode" };
  }
}

export default async function EpisodePage({ params }: Props) {
  const { id } = await params;

  let episode;
  try {
    const result = await getEpisodeDetail(id);
    episode = result.data;
  } catch {
    notFound();
  }

  let poster: string | null = null;
  let animeTitle = episode.title;
  if (episode.animeId) {
    try {
      const anime = await getAnimeDetail(episode.animeId);
      poster = anime.data.poster || null;
      animeTitle = anime.data.title || episode.title;
    } catch {
      // ignore detail fallback errors
    }
  }

  const prev = episode.prevEpisode;
  const next = episode.nextEpisode;
  const relatedEpisodes = episode.info?.episodeList ?? [];

  return (
    <div className="space-y-8">
      <WatchTracker
        animeId={episode.animeId || "unknown"}
        episodeId={id}
        animeTitle={animeTitle}
        episodeTitle={episode.title}
        poster={poster}
      />

      <section className="space-y-3">
        <div className="flex flex-wrap items-center gap-2 text-sm text-slate-400">
          {episode.animeId ? (
            <Link
              href={`/anime/${encodeURIComponent(episode.animeId)}`}
              className="hover:text-white"
            >
              {animeTitle}
            </Link>
          ) : (
            <span>{animeTitle}</span>
          )}
          <span>/</span>
          <span className="text-slate-300">Episode</span>
        </div>
        <h1 className="text-2xl font-black text-white md:text-3xl">
          {episode.title}
        </h1>
        {episode.releaseTime ? (
          <p className="text-sm text-slate-400">{episode.releaseTime}</p>
        ) : null}
      </section>

      <VideoPlayer
        title={episode.title}
        defaultUrl={episode.defaultStreamingUrl}
        qualities={episode.server?.qualities ?? []}
      />

      <div className="flex flex-wrap gap-3">
        {prev?.episodeId ? (
          <Link
            href={`/episode/${encodeURIComponent(prev.episodeId)}`}
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-slate-200 hover:bg-white/10"
          >
            ← Episode Sebelumnya
          </Link>
        ) : null}
        {episode.animeId ? (
          <Link
            href={`/anime/${encodeURIComponent(episode.animeId)}`}
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-slate-200 hover:bg-white/10"
          >
            Detail Anime
          </Link>
        ) : null}
        {next?.episodeId ? (
          <Link
            href={`/episode/${encodeURIComponent(next.episodeId)}`}
            className="rounded-2xl bg-gradient-to-r from-rose-400 to-pink-400 px-4 py-2.5 text-sm font-semibold text-white"
          >
            Episode Selanjutnya →
          </Link>
        ) : null}
      </div>

      <DownloadList
        title="Download Episode"
        qualities={episode.downloadUrl?.qualities ?? []}
      />

      {relatedEpisodes.length > 0 ? (
        <section className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-5">
          <h2 className="mb-4 text-lg font-semibold text-white">
            Episode Lainnya
          </h2>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {relatedEpisodes.map((item) => (
              <Link
                key={item.episodeId}
                href={`/episode/${encodeURIComponent(item.episodeId)}`}
                className={`rounded-2xl border px-4 py-3 text-sm transition ${
                  item.episodeId === id
                    ? "border-rose-300/35 bg-rose-400/10 text-white"
                    : "border-white/10 bg-black/20 text-slate-200 hover:bg-white/[0.05]"
                }`}
              >
                <p className="font-medium">Episode {item.eps ?? "?"}</p>
                <p className="mt-1 line-clamp-2 text-xs text-slate-400">
                  {item.title}
                </p>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
