import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";

export const searchHistory = pgTable(
  "search_history",
  {
    id: serial("id").primaryKey(),
    query: varchar("query", { length: 255 }).notNull(),
    resultCount: integer("result_count").notNull().default(0),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    queryIdx: uniqueIndex("search_history_query_idx").on(table.query),
  }),
);

export const favorites = pgTable(
  "favorites",
  {
    id: serial("id").primaryKey(),
    animeId: varchar("anime_id", { length: 255 }).notNull(),
    title: text("title").notNull(),
    poster: text("poster"),
    status: varchar("status", { length: 64 }),
    score: varchar("score", { length: 16 }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    animeIdIdx: uniqueIndex("favorites_anime_id_idx").on(table.animeId),
  }),
);

export const watchHistory = pgTable(
  "watch_history",
  {
    id: serial("id").primaryKey(),
    animeId: varchar("anime_id", { length: 255 }).notNull(),
    episodeId: varchar("episode_id", { length: 255 }).notNull(),
    animeTitle: text("anime_title").notNull(),
    episodeTitle: text("episode_title").notNull(),
    poster: text("poster"),
    watchedAt: timestamp("watched_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    episodeIdIdx: uniqueIndex("watch_history_episode_id_idx").on(
      table.episodeId,
    ),
  }),
);
