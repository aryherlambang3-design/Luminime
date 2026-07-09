import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { getSchedule } from "@/lib/anime-api";

export const revalidate = 300;

export default async function JadwalPage() {
  const schedule = await getSchedule();
  const days = schedule.data ?? [];

  return (
    <div className="space-y-8">
      <PageHero
        eyebrow="Jadwal Rilis"
        title="Jadwal Anime Mingguan"
        description="Pantau anime yang rilis setiap hari. Klik judul untuk membuka detail dan daftar episode."
      />

      <div className="grid gap-5 lg:grid-cols-2">
        {days.map((day) => (
          <section
            key={day.day}
            className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-5"
          >
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="text-xl font-bold text-white">{day.day}</h2>
              <span className="rounded-full bg-rose-400/12 px-3 py-1 text-xs font-semibold text-rose-200">
                {day.anime_list.length} anime
              </span>
            </div>
            <div className="space-y-3">
              {day.anime_list.map((anime) => (
                <Link
                  key={`${day.day}-${anime.slug}`}
                  href={`/anime/${encodeURIComponent(anime.slug)}`}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 p-3 transition hover:border-rose-300/25 hover:bg-white/[0.04]"
                >
                  <div className="relative h-16 w-12 shrink-0 overflow-hidden rounded-xl bg-slate-900">
                    {anime.poster ? (
                      <Image
                        src={anime.poster}
                        alt={anime.title}
                        fill
                        className="object-cover"
                        sizes="48px"
                        unoptimized
                      />
                    ) : null}
                  </div>
                  <div className="min-w-0">
                    <p className="line-clamp-2 text-sm font-medium text-white">
                      {anime.title}
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      Rilis {day.day}
                    </p>
                  </div>
                </Link>
              ))}
              {day.anime_list.length === 0 ? (
                <p className="text-sm text-slate-500">Belum ada data.</p>
              ) : null}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
