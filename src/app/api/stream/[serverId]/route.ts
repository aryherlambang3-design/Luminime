import { NextRequest, NextResponse } from "next/server";
import { getStreamServer } from "@/lib/anime-api";

export const dynamic = "force-dynamic";

type Params = {
  params: Promise<{ serverId: string }>;
};

export async function GET(_request: NextRequest, { params }: Params) {
  const { serverId } = await params;

  if (!serverId) {
    return NextResponse.json(
      { ok: false, message: "serverId wajib diisi" },
      { status: 400 },
    );
  }

  try {
    const result = await getStreamServer(serverId);
    return NextResponse.json({
      ok: true,
      url: result.data.url,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message:
          error instanceof Error
            ? error.message
            : "Gagal mengambil URL stream",
      },
      { status: 502 },
    );
  }
}
