import Link from "next/link";

type Props = {
  title: string;
  subtitle?: string;
  href?: string;
  actionLabel?: string;
};

export function SectionHeader({
  title,
  subtitle,
  href,
  actionLabel = "Lihat semua",
}: Props) {
  return (
    <div className="mb-5 flex items-end justify-between gap-4">
      <div>
        <h2 className="text-xl font-bold text-white md:text-2xl">{title}</h2>
        {subtitle ? (
          <p className="mt-1 text-sm text-slate-400">{subtitle}</p>
        ) : null}
      </div>
      {href ? (
        <Link
          href={href}
          className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-slate-200 transition hover:bg-white/10"
        >
          {actionLabel}
        </Link>
      ) : null}
    </div>
  );
}
