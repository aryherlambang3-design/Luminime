import type { DownloadQuality } from "@/lib/types";

type Props = {
  qualities?: DownloadQuality[];
  title?: string;
};

export function DownloadList({
  qualities = [],
  title = "Download",
}: Props) {
  if (!qualities.length) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 text-sm text-slate-400">
        Link download belum tersedia.
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <div className="mt-4 space-y-4">
        {qualities.map((quality) => (
          <div
            key={`${quality.title}-${quality.size || "na"}`}
            className="rounded-2xl border border-white/10 bg-black/20 p-4"
          >
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <p className="font-medium text-white">{quality.title}</p>
              {quality.size ? (
                <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs text-slate-300">
                  {quality.size}
                </span>
              ) : null}
            </div>
            <div className="flex flex-wrap gap-2">
              {quality.urls.map((item) => (
                <a
                  key={`${item.title}-${item.url}`}
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-rose-300/20 bg-rose-400/10 px-3 py-2 text-sm text-rose-100 transition hover:bg-rose-400/20"
                >
                  {item.title}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
