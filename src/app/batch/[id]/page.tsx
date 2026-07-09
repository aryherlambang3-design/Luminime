import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DownloadList } from "@/components/download-list";
import { PageHero } from "@/components/page-hero";
import { getBatchDetail } from "@/lib/anime-api";
import type { DownloadQuality } from "@/lib/types";
import { formatScore } from "@/lib/utils";

export const revalidate = 120;

type Props = {
  params: Promise<{ id: string }>;
};

function flattenBatchDownloads(
  downloadUrl?: {
    formats?: Array<{ title: string; qualities: DownloadQuality[] }>;
    qualities?: DownloadQuality[];
  },
): DownloadQuality[] {
  if (!downloadUrl) return [];
  if (downloadUrl.qualities?.length) return downloadUrl.qualities;
  if (downloadUrl.formats?.length) {
    return downloadUrl.formats.flatMap((format) =>
      format.qualities.map((quality) => ({
        ...quality,
        title: `${format.title} · ${quality.title}`,
      })),
    );
  }
  return [];
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  try {
    const result = await getBatchDetail(id);
    return {
      title: `Batch ${result.data.title}`,
      description: `Download batch ${result.data.title} subtitle Indonesia.`,
    };
  } catch {
    return { title: "Download Batch" };
  }
}

export default async function BatchPage({ params }: Props) {
  const { id } = await params;

  let batch;
  try {
    const result = await getBatchDetail(id);
    batch = result.data;
  } catch {
    notFound();
  }

  const downloads = flattenBatchDownloads(batch.downloadUrl);

  return (
    <div className="space-y-8">
      <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
        <div className="relative mx-auto aspect-[3/4] w-full max-w-[240px] overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900">
          {batch.poster ? (
            <Image
              src={batch.poster}
              alt={batch.title}
              fill
              className="object-cover"
              sizes="240px"
              unoptimized
            />
          ) : null}
        </div>
        <div className="space-y-4">
          <PageHero
            eyebrow="Download Batch"
            title={batch.title}
            description={
              batch.japanese
                ? `Judul Jepang: ${batch.japanese}`
                : "Link download batch multi kualitas dan multi host."
            }
          />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {[
              ["Skor", formatScore(batch.score)],
              ["Episode", batch.episodes != null ? String(batch.episodes) : "-"],
              ["Tipe", batch.type || "-"],
              ["Studio", batch.studios || "-"],
              ["Durasi", batch.duration || "-"],
              ["Credit", batch.credit || "-"],
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
            {(batch.genreList ?? []).map((genre) => (
              <Link
                key={genre.genreId}
                href={`/genre/${encodeURIComponent(genre.genreId)}`}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-slate-200"
              >
                {genre.title}
              </Link>
            ))}
          </div>
          {batch.animeId ? (
            <Link
              href={`/anime/${encodeURIComponent(batch.animeId)}`}
              className="inline-flex rounded-2xl border border-rose-300/25 bg-rose-400/10 px-4 py-2.5 text-sm font-semibold text-rose-100"
            >
              Kembali ke Detail Anime
            </Link>
          ) : null}
        </div>
      </div>

      <DownloadList title="Link Download Batch" qualities={downloads} />
    </div>
  );
}
