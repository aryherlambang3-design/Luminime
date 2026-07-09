import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10 bg-[#080510]">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-2 md:px-6">
        <div>
          <p className="text-lg font-bold text-white">LumineStream</p>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Platform nonton anime gratis subtitle Indonesia. Streaming episode
            terbaru, jadwal rilis, batch download, dan katalog lengkap.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-slate-300">
            Navigasi
          </p>
          <div className="mt-3 grid gap-2 text-sm text-slate-400">
            <Link href="/ongoing" className="hover:text-white">
              Anime Ongoing
            </Link>
            <Link href="/complete" className="hover:text-white">
              Anime Tamat
            </Link>
            <Link href="/jadwal" className="hover:text-white">
              Jadwal Rilis
            </Link>
            <Link href="/genre" className="hover:text-white">
              Genre
            </Link>
            <Link href="/all" className="hover:text-white">
              Semua Anime
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-white/5 py-4 px-4 md:px-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <p className="text-xs text-slate-500">© {new Date().getFullYear()} LumineStream · Your Anime Paradise</p>
          <a
            href="https://aethereads.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-right group"
          >
            <p
              className="text-sm font-bold text-blue-400"
              style={{ textShadow: "0 0 8px rgba(96,165,250,0.9), 0 0 20px rgba(96,165,250,0.6)" }}
            >
              Your Comic Paradise
            </p>
            <p className="text-xs text-slate-400 group-hover:text-blue-400 transition-colors">
              click here →
            </p>
          </a>
        </div>
      </div>
    </footer>
  );
}
