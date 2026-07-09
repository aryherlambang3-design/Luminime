type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function PageHero({ eyebrow, title, description }: Props) {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-rose-500/12 via-pink-400/8 to-rose-300/6 p-6 md:p-8">
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-rose-400/12 blur-3xl" />
      <div className="absolute -bottom-12 left-10 h-40 w-40 rounded-full bg-pink-300/8 blur-3xl" />
      <div className="relative">
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-300">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="mt-2 text-3xl font-black tracking-tight text-white md:text-4xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 md:text-base">
            {description}
          </p>
        ) : null}
      </div>
    </section>
  );
}
