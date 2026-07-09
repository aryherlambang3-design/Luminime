import Image from "next/image";
import Link from "next/link";
import type { AnimeCard as AnimeCardType } from "@/lib/types";
import { formatScore } from "@/lib/utils";

type Props = {
  anime: AnimeCardType;
  badge?: string;
};

export function AnimeCard({ anime, badge }: Props) {
  const meta =
    badge ||
    anime.status ||
    (anime.episodes != null ? `Eps ${anime.episodes}` : null) ||
    anime.releaseDay ||
    null;

  return (
    <Link
      href={`/anime/${encodeURIComponent(anime.animeId)}`}
      className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] shadow-lg shadow-black/20 transition hover:-translate-y-1 hover:border-rose-300/30 hover:bg-white/[0.06]"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-slate-900">
        {anime.poster ? (
          <Image
            src={anime.poster}
            alt={anime.title}
            fill
            sizes="(max-width:768px) 50vw, 20vw"
            className="object-cover transition duration-500 group-hover:scale-105"
            unoptimized
          />
        ) : (
          <div className="grid h-full place-items-center text-slate-500">
            No Poster
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/50 to-transparent p-3 pt-10">
          <h3 className="line-clamp-2 text-sm font-semibold text-white">
            {anime.title}
          </h3>
        </div>
        {meta ? (
          <span className="absolute left-2 top-2 rounded-full bg-black/70 px-2.5 py-1 text-[11px] font-semibold text-pink-200 backdrop-blur">
            {meta}
          </span>
        ) : null}
        {anime.score != null && anime.score !== "" ? (
          <span className="absolute right-2 top-2 rounded-full bg-rose-400 px-2 py-1 text-[11px] font-bold text-white">
            ★ {formatScore(anime.score)}
          </span>
        ) : null}
      </div>
      <div className="space-y-1 p-3">
        {anime.latestReleaseDate || anime.lastReleaseDate ? (
          <p className="text-xs text-slate-400">
            Update: {anime.latestReleaseDate || anime.lastReleaseDate}
          </p>
        ) : null}
        {anime.studios ? (
          <p className="line-clamp-1 text-xs text-slate-500">{anime.studios}</p>
        ) : null}
      </div>
    </Link>
  );
}
