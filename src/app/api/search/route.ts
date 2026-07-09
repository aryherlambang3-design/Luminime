import { desc, eq, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { searchHistory } from "@/db/schema";
import { searchAnime } from "@/lib/anime-api";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q")?.trim() || "";

  if (!q) {
    return NextResponse.json({
      ok: true,
      data: { animeList: [] },
      history: [],
    });
  }

  try {
    const result = await searchAnime(q);
    const count = result.data.animeList?.length ?? 0;

    await db
      .insert(searchHistory)
      .values({
        query: q.toLowerCase(),
        resultCount: count,
      })
      .onConflictDoUpdate({
        target: searchHistory.query,
        set: {
          resultCount: count,
          createdAt: sql`now()`,
        },
      });

    const history = await db
      .select()
      .from(searchHistory)
      .orderBy(desc(searchHistory.createdAt))
      .limit(8);

    return NextResponse.json({
      ok: true,
      data: result.data,
      history,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message:
          error instanceof Error ? error.message : "Gagal mencari anime",
      },
      { status: 502 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q")?.trim();
  if (!q) {
    return NextResponse.json({ ok: false, message: "Query kosong" }, { status: 400 });
  }

  await db.delete(searchHistory).where(eq(searchHistory.query, q.toLowerCase()));
  return NextResponse.json({ ok: true });
}
