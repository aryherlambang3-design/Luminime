"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import type { ServerQuality } from "@/lib/types";
import { cn, toEmbedUrl } from "@/lib/utils";

type Props = {
  title: string;
  defaultUrl?: string | null;
  qualities?: ServerQuality[];
};

export function VideoPlayer({ title, defaultUrl, qualities = [] }: Props) {
  const flatServers = useMemo(
    () =>
      qualities.flatMap((quality) =>
        quality.serverList.map((server) => ({
          quality: quality.title,
          ...server,
        })),
      ),
    [qualities],
  );

  const [activeServerId, setActiveServerId] = useState<string | null>(null);
  const [streamUrl, setStreamUrl] = useState<string | null>(
    toEmbedUrl(defaultUrl),
  );
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    setStreamUrl(toEmbedUrl(defaultUrl));
    setActiveServerId(null);
    setError(null);
  }, [defaultUrl, title]);

  function loadServer(serverId: string) {
    setActiveServerId(serverId);
    setError(null);
    startTransition(async () => {
      try {
        const res = await fetch(
          `/api/stream/${encodeURIComponent(serverId)}`,
          { cache: "no-store" },
        );
        const json = (await res.json()) as {
          ok: boolean;
          url?: string;
          message?: string;
        };
        if (!res.ok || !json.ok || !json.url) {
          throw new Error(json.message || "Gagal mengambil URL stream");
        }
        setStreamUrl(toEmbedUrl(json.url));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Gagal memuat server");
      }
    });
  }

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-black shadow-2xl shadow-black/40">
        <div className="relative aspect-video bg-slate-950">
          {streamUrl ? (
            <iframe
              key={streamUrl}
              src={streamUrl}
              title={title}
              className="absolute inset-0 h-full w-full"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="grid h-full place-items-center px-6 text-center text-slate-400">
              {pending
                ? "Memuat server streaming..."
                : "Pilih server streaming untuk mulai menonton"}
            </div>
          )}
          {pending ? (
            <div className="absolute inset-x-0 top-0 bg-rose-400/15 px-3 py-2 text-center text-xs font-medium text-rose-100 backdrop-blur">
              Mengambil URL stream server...
            </div>
          ) : null}
        </div>
      </div>

      {error ? (
        <p className="rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
          {error}
        </p>
      ) : null}

      {flatServers.length > 0 ? (
        <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-4">
          <p className="mb-3 text-sm font-semibold text-white">Server Stream</p>
          <div className="space-y-4">
            {qualities.map((quality) => (
              <div key={quality.title}>
                <p className="mb-2 text-xs uppercase tracking-wider text-slate-400">
                  {quality.title}
                </p>
                <div className="flex flex-wrap gap-2">
                  {quality.serverList.map((server) => {
                    const active = activeServerId === server.serverId;
                    return (
                      <button
                        key={server.serverId}
                        type="button"
                        onClick={() => loadServer(server.serverId)}
                        className={cn(
                          "rounded-xl border px-3 py-2 text-sm transition",
                          active
                            ? "border-rose-300/40 bg-rose-400/12 text-rose-100"
                            : "border-white/10 bg-white/5 text-slate-200 hover:bg-white/10",
                        )}
                      >
                        {server.title}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
