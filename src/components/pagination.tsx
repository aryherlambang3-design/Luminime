import Link from "next/link";
import { buildPageNumbers } from "@/lib/anime-api";
import type { Pagination as PaginationType } from "@/lib/types";
import { cn } from "@/lib/utils";

type Props = {
  basePath: string;
  pagination?: PaginationType | null;
  query?: Record<string, string | undefined>;
};

function hrefFor(
  basePath: string,
  page: number,
  query?: Record<string, string | undefined>,
) {
  const params = new URLSearchParams();
  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
  }
  if (page > 1) params.set("page", String(page));
  const qs = params.toString();
  return qs ? `${basePath}?${qs}` : basePath;
}

export function Pagination({ basePath, pagination, query }: Props) {
  if (!pagination || pagination.totalPages <= 1) return null;
  const pages = buildPageNumbers(pagination, 2);

  return (
    <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
      {pagination.hasPrevPage && pagination.prevPage ? (
        <Link
          href={hrefFor(basePath, pagination.prevPage, query)}
          className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200 hover:bg-white/10"
        >
          ← Prev
        </Link>
      ) : null}

      {pages[0] > 1 ? (
        <>
          <Link
            href={hrefFor(basePath, 1, query)}
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200 hover:bg-white/10"
          >
            1
          </Link>
          {pages[0] > 2 ? (
            <span className="px-1 text-slate-500">…</span>
          ) : null}
        </>
      ) : null}

      {pages.map((page) => (
        <Link
          key={page}
          href={hrefFor(basePath, page, query)}
          className={cn(
            "rounded-xl border px-3 py-2 text-sm",
            page === pagination.currentPage
              ? "border-rose-300/40 bg-rose-400/15 text-white"
              : "border-white/10 bg-white/5 text-slate-200 hover:bg-white/10",
          )}
        >
          {page}
        </Link>
      ))}

      {pages[pages.length - 1] < pagination.totalPages ? (
        <>
          {pages[pages.length - 1] < pagination.totalPages - 1 ? (
            <span className="px-1 text-slate-500">…</span>
          ) : null}
          <Link
            href={hrefFor(basePath, pagination.totalPages, query)}
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200 hover:bg-white/10"
          >
            {pagination.totalPages}
          </Link>
        </>
      ) : null}

      {pagination.hasNextPage && pagination.nextPage ? (
        <Link
          href={hrefFor(basePath, pagination.nextPage, query)}
          className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200 hover:bg-white/10"
        >
          Next →
        </Link>
      ) : null}
    </div>
  );
}
