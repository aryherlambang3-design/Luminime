import Link from "next/link";
import { AnimeCard } from "@/components/anime-card";
import { PageHero } from "@/components/page-hero";
import { SectionHeader } from "@/components/section-header";
import { getGenres, getHome, getSchedule } from "@/lib/anime-api";

export const revalidate = 300;

export default async function HomePage() {
  const [home, schedule, genres] = await Promise.all([
    getHome(),
    getSchedule().catch(() => null),
    getGenres().catch(() => null),
  ]);

  const ongoing = home.data.ongoing.animeList ?? [];
  const completed = home.data.completed.animeList ?? [];
  const today =
    schedule?.data?.find((day) =>
      ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"].includes(
        day.day,
      ),
    ) || schedule?.data?.[0];
  const genreList = genres?.data?.genreList?.slice(0, 12) ?? [];

  return (
    <div className="space-y-10">
      <PageHero
        eyebrow="Streaming Sub Indonesia"
        title="Nonton Anime Gratis, Update Cepat, Sub Indo."
        description="Temukan anime ongoing terbaru, jadwal rilis harian, koleksi anime tamat, genre lengkap, batch download, dan streaming multi-server di Luminime."
      />

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            href: "/ongoing",
            title: "Sedang Tayang",
            desc: "Episode ongoing terbaru",
          },
          {
            href: "/complete",
            title: "Anime Tamat",
            desc: "Series completed per halaman",
          },
          {
            href: "/jadwal",
            title: "Jadwal Rilis",
            desc: "Update harian Senin–Minggu",
          },
          {
            href: "/all",
            title: "Semua Anime",
            desc: "Katalog A–Z lengkap",
          },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 transition hover:border-rose-300/25 hover:bg-white/[0.07]"
          >
            <p className="font-semibold text-white">{item.title}</p>
            <p className="mt-1 text-sm text-slate-400">{item.desc}</p>
          </Link>
        ))}
      </section>

      <section>
        <SectionHeader
          title="Anime Ongoing"
          subtitle="Update episode terbaru subtitle Indonesia"
          href="/ongoing"
        />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {ongoing.slice(0, 10).map((anime) => (
            <AnimeCard
              key={anime.animeId}
              anime={anime}
              badge={
                anime.episodes != null ? `Eps ${anime.episodes}` : "Ongoing"
              }
            />
          ))}
        </div>
      </section>

      <section>
        <SectionHeader
          title="Anime Tamat"
          subtitle="Series completed siap binge-watch"
          href="/complete"
        />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {completed.slice(0, 10).map((anime) => (
            <AnimeCard key={anime.animeId} anime={anime} badge="Completed" />
          ))}
        </div>
      </section>

      {today ? (
        <section className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-5 md:p-6">
          <SectionHeader
            title={`Jadwal · ${today.day}`}
            subtitle="Cuplikan jadwal rilis anime"
            href="/jadwal"
            actionLabel="Lihat jadwal penuh"
          />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {today.anime_list.slice(0, 9).map((item) => (
              <Link
                key={item.slug}
                href={`/anime/${encodeURIComponent(item.slug)}`}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 p-3 transition hover:border-rose-300/25"
              >
                {item.poster ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.poster}
                    alt={item.title}
                    className="h-16 w-12 rounded-xl object-cover"
                  />
                ) : (
                  <div className="grid h-16 w-12 place-items-center rounded-xl bg-white/5 text-[10px] text-slate-500">
                    N/A
                  </div>
                )}
                <div className="min-w-0">
                  <p className="line-clamp-2 text-sm font-medium text-white">
                    {item.title}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">{today.day}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {genreList.length > 0 ? (
        <section>
          <SectionHeader
            title="Genre Populer"
            subtitle="Jelajahi anime berdasarkan genre"
            href="/genre"
          />
          <div className="flex flex-wrap gap-2">
            {genreList.map((genre) => (
              <Link
                key={genre.genreId}
                href={`/genre/${encodeURIComponent(genre.genreId)}`}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:border-rose-300/30 hover:bg-rose-400/8"
              >
                {genre.title}
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
