"use client";

import { useEffect } from "react";

type Props = {
  animeId: string;
  episodeId: string;
  animeTitle: string;
  episodeTitle: string;
  poster?: string | null;
};

export function WatchTracker({
  animeId,
  episodeId,
  animeTitle,
  episodeTitle,
  poster,
}: Props) {
  useEffect(() => {
    void fetch("/api/history", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        animeId,
        episodeId,
        animeTitle,
        episodeTitle,
        poster,
      }),
    }).catch(() => undefined);
  }, [animeId, episodeId, animeTitle, episodeTitle, poster]);

  return null;
}
