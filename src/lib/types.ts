export type Pagination = {
  currentPage: number;
  hasPrevPage: boolean;
  prevPage: number | null;
  hasNextPage: boolean;
  nextPage: number | null;
  totalPages: number;
};

export type GenreRef = {
  title: string;
  genreId: string;
  href?: string;
  otakudesuUrl?: string;
};

export type AnimeCard = {
  title: string;
  poster?: string;
  episodes?: number | string | null;
  score?: string | number | null;
  status?: string | null;
  releaseDay?: string | null;
  latestReleaseDate?: string | null;
  lastReleaseDate?: string | null;
  studios?: string | null;
  season?: string | null;
  animeId: string;
  href?: string;
  otakudesuUrl?: string;
  genreList?: GenreRef[];
  synopsis?: {
    paragraphs?: string[];
  };
};

export type EpisodeRef = {
  title: string;
  eps?: number | string | null;
  date?: string | null;
  episodeId: string;
  href?: string;
  otakudesuUrl?: string;
};

export type BatchRef = {
  title: string;
  batchId: string;
  href?: string;
  otakudesuUrl?: string;
};

export type AnimeDetail = {
  title: string;
  poster?: string;
  japanese?: string;
  score?: string | number | null;
  producers?: string | null;
  type?: string | null;
  status?: string | null;
  episodes?: number | string | null;
  duration?: string | null;
  aired?: string | null;
  studios?: string | null;
  batch?: BatchRef | null;
  synopsis?: {
    paragraphs?: string[];
    connections?: unknown[];
  };
  genreList?: GenreRef[];
  episodeList?: EpisodeRef[];
  recommendedAnimeList?: AnimeCard[];
};

export type DownloadUrl = {
  title: string;
  url: string;
};

export type DownloadQuality = {
  title: string;
  size?: string;
  urls: DownloadUrl[];
};

export type ServerItem = {
  title: string;
  serverId: string;
  href?: string;
};

export type ServerQuality = {
  title: string;
  serverList: ServerItem[];
};

export type EpisodeDetail = {
  title: string;
  animeId?: string;
  releaseTime?: string;
  defaultStreamingUrl?: string;
  hasPrevEpisode?: boolean;
  prevEpisode?: EpisodeRef | null;
  hasNextEpisode?: boolean;
  nextEpisode?: EpisodeRef | null;
  server?: {
    qualities: ServerQuality[];
  };
  downloadUrl?: {
    qualities: DownloadQuality[];
  };
  info?: {
    credit?: string;
    encoder?: string;
    duration?: string;
    type?: string;
    genreList?: GenreRef[];
    episodeList?: EpisodeRef[];
  };
};

export type BatchDetail = {
  title: string;
  animeId?: string;
  poster?: string;
  japanese?: string;
  type?: string | null;
  score?: string | number | null;
  episodes?: number | string | null;
  duration?: string | null;
  studios?: string | null;
  producers?: string | null;
  aired?: string | null;
  credit?: string | null;
  genreList?: GenreRef[];
  downloadUrl?: {
    formats?: Array<{
      title: string;
      qualities: DownloadQuality[];
    }>;
    qualities?: DownloadQuality[];
  };
};

export type ScheduleDay = {
  day: string;
  anime_list: Array<{
    title: string;
    slug: string;
    url?: string;
    poster?: string;
  }>;
};

export type UnlimitedGroup = {
  startWith: string;
  animeList: Array<{
    title: string;
    animeId: string;
    href?: string;
    otakudesuUrl?: string;
  }>;
};

export type ApiResponse<T> = {
  status: string;
  creator?: string;
  statusCode?: number;
  statusMessage?: string;
  message?: string;
  ok?: boolean;
  data: T;
  pagination?: Pagination | null;
};
