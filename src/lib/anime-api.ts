import type {
  AnimeCard,
  AnimeDetail,
  ApiResponse,
  BatchDetail,
  EpisodeDetail,
  GenreRef,
  Pagination,
  ScheduleDay,
  UnlimitedGroup,
} from "@/lib/types";

const API_BASE =
  process.env.ANIME_API_BASE?.replace(/\/$/, "") ||
  "https://www.sankavollerei.web.id";

const DEFAULT_REVALIDATE = 300;

type FetchOptions = {
  revalidate?: number | false;
  cache?: RequestCache;
};

async function animeFetch<T>(
  path: string,
  options: FetchOptions = {},
): Promise<ApiResponse<T>> {
  const url = `${API_BASE}${path.startsWith("/") ? path : `/${path}`}`;
  const init: RequestInit & { next?: { revalidate?: number } } = {
    headers: {
      Accept: "application/json",
      "User-Agent":
        "Mozilla/5.0 (compatible; Luminime/1.0; +https://luminime.local)",
    },
  };

  if (options.cache) {
    init.cache = options.cache;
  } else if (options.revalidate === false) {
    init.cache = "no-store";
  } else {
    init.next = { revalidate: options.revalidate ?? DEFAULT_REVALIDATE };
  }

  const response = await fetch(url, init);

  if (!response.ok) {
    throw new Error(`Anime API error ${response.status} for ${path}`);
  }

  const json = (await response.json()) as ApiResponse<T>;

  if (json.ok === false || json.statusCode === 404) {
    throw new Error(json.message || "Data anime tidak ditemukan");
  }

  if (json.status === "Plana AI Detector") {
    throw new Error(json.message || "Endpoint API tidak valid");
  }

  return json;
}

export async function getHome() {
  return animeFetch<{
    ongoing: { animeList: AnimeCard[] };
    completed: { animeList: AnimeCard[] };
  }>("/anime/home");
}

export async function getSchedule() {
  return animeFetch<ScheduleDay[]>("/anime/schedule");
}

export async function getOngoing(page = 1) {
  return animeFetch<{ animeList: AnimeCard[] }>(
    `/anime/ongoing-anime?page=${page}`,
  );
}

export async function getCompleted(page = 1) {
  return animeFetch<{ animeList: AnimeCard[] }>(
    `/anime/complete-anime?page=${page}`,
  );
}

export async function getGenres() {
  return animeFetch<{ genreList: GenreRef[] }>("/anime/genre");
}

export async function getGenreAnime(genreId: string, page = 1) {
  return animeFetch<{ animeList: AnimeCard[] }>(
    `/anime/genre/${encodeURIComponent(genreId)}?page=${page}`,
  );
}

export async function getAnimeDetail(animeId: string) {
  return animeFetch<AnimeDetail>(
    `/anime/anime/${encodeURIComponent(animeId)}`,
    { revalidate: 120 },
  );
}

export async function getEpisodeDetail(episodeId: string) {
  return animeFetch<EpisodeDetail>(
    `/anime/episode/${encodeURIComponent(episodeId)}`,
    { revalidate: 60 },
  );
}

export async function getBatchDetail(batchId: string) {
  return animeFetch<BatchDetail>(
    `/anime/batch/${encodeURIComponent(batchId)}`,
    { revalidate: 120 },
  );
}

export async function getStreamServer(serverId: string) {
  return animeFetch<{ url: string }>(
    `/anime/server/${encodeURIComponent(serverId)}`,
    { revalidate: false },
  );
}

export async function searchAnime(query: string) {
  const q = query.trim();
  if (!q) {
    return {
      status: "success",
      ok: true,
      data: { animeList: [] as AnimeCard[] },
      pagination: null,
    } satisfies ApiResponse<{ animeList: AnimeCard[] }>;
  }

  return animeFetch<{ animeList: AnimeCard[] }>(
    `/anime/search/${encodeURIComponent(q)}`,
    { revalidate: 60 },
  );
}

export async function getAllAnime() {
  return animeFetch<{ list: UnlimitedGroup[] }>("/anime/unlimited", {
    revalidate: 3600,
  });
}

export function buildPageNumbers(
  pagination?: Pagination | null,
  window = 2,
): number[] {
  if (!pagination?.totalPages) return [];
  const current = pagination.currentPage || 1;
  const total = pagination.totalPages;
  const start = Math.max(1, current - window);
  const end = Math.min(total, current + window);
  const pages: number[] = [];
  for (let i = start; i <= end; i += 1) pages.push(i);
  return pages;
}
