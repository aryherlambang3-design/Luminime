import { desc } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { watchHistory } from "@/db/schema";

export const dynamic = "force-dynamic";

export async function GET() {
  const items = await db
    .select()
    .from(watchHistory)
    .orderBy(desc(watchHistory.watchedAt))
    .limit(20);

  return NextResponse.json({ ok: true, data: items });
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      animeId?: string;
      episodeId?: string;
      animeTitle?: string;
      episodeTitle?: string;
      poster?: string | null;
    };

    if (
      !body.animeId ||
      !body.episodeId ||
      !body.animeTitle ||
      !body.episodeTitle
    ) {
      return NextResponse.json(
        { ok: false, message: "Payload tidak lengkap" },
        { status: 400 },
      );
    }

    await db
      .insert(watchHistory)
      .values({
        animeId: body.animeId,
        episodeId: body.episodeId,
        animeTitle: body.animeTitle,
        episodeTitle: body.episodeTitle,
        poster: body.poster || null,
      })
      .onConflictDoUpdate({
        target: watchHistory.episodeId,
        set: {
          animeId: body.animeId,
          animeTitle: body.animeTitle,
          episodeTitle: body.episodeTitle,
          poster: body.poster || null,
          watchedAt: new Date(),
        },
      });

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message:
          error instanceof Error
            ? error.message
            : "Gagal menyimpan riwayat tonton",
      },
      { status: 500 },
    );
  }
}
