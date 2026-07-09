import Link from "next/link";

type Props = {
  title: string;
  description?: string;
  actionHref?: string;
  actionLabel?: string;
};

export function EmptyState({
  title,
  description,
  actionHref = "/",
  actionLabel = "Kembali ke Home",
}: Props) {
  return (
    <div className="rounded-3xl border border-dashed border-white/15 bg-white/[0.03] px-6 py-16 text-center">
      <p className="text-lg font-semibold text-white">{title}</p>
      {description ? (
        <p className="mx-auto mt-2 max-w-md text-sm text-slate-400">
          {description}
        </p>
      ) : null}
      <Link
        href={actionHref}
        className="mt-6 inline-flex rounded-2xl bg-rose-400 px-4 py-2.5 text-sm font-semibold text-white"
      >
        {actionLabel}
      </Link>
    </div>
  );
}
