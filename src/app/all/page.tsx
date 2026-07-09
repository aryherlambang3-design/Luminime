import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { getAllAnime } from "@/lib/anime-api";

export const revalidate = 3600;

export default async function AllAnimePage() {
  const result = await getAllAnime();
  const groups = result.data.list ?? [];
  const total = groups.reduce(
    (sum, group) => sum + (group.animeList?.length || 0),
    0,
  );

  return (
    <div className="space-y-8">
      <PageHero
        eyebrow="Katalog Lengkap"
        title="Semua Anime A–Z"
        description={`Katalog lengkap berisi ${total.toLocaleString("id-ID")} judul anime. Loncat ke huruf tertentu lewat navigasi cepat.`}
      />

      <div className="sticky top-[72px] z-20 -mx-1 overflow-x-auto rounded-2xl border border-white/10 bg-[#0c0610]/90 p-3 backdrop-blur">
        <div className="flex min-w-max gap-2">
          {groups.map((group) => (
            <a
              key={group.startWith}
              href={`#letter-${encodeURIComponent(group.startWith)}`}
              className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-slate-200 hover:bg-white/10"
            >
              {group.startWith}
            </a>
          ))}
        </div>
      </div>

      <div className="space-y-8">
        {groups.map((group) => (
          <section
            key={group.startWith}
            id={`letter-${group.startWith}`}
            className="scroll-mt-36 rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-5"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-black text-white">
                {group.startWith}
              </h2>
              <span className="text-sm text-slate-400">
                {group.animeList.length} judul
              </span>
            </div>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {group.animeList.map((anime) => (
                <Link
                  key={anime.animeId}
                  href={`/anime/${encodeURIComponent(anime.animeId)}`}
                  className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-slate-200 transition hover:border-rose-300/25 hover:bg-white/[0.05]"
                >
                  {anime.title}
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
