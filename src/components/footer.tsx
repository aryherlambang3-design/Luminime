import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10 bg-[#080510]">
<<<<<<< HEAD
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-2 md:px-6">
        <div>
          <p className="text-lg font-bold text-white">LumineStream</p>
=======
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-3 md:px-6">
        <div>
          <p className="text-lg font-bold text-white">Luminime</p>
>>>>>>> 0d9345cae6bf08afb94e61071e06518b2f041563
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
<<<<<<< HEAD
      </div>
      <div className="border-t border-white/5 py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} LumineStream · Your Anime Paradise
=======
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-slate-300">
            Catatan
          </p>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            Konten metadata diambil dari API publik Otakudesu via Sanka
            Vollerei. Gunakan dengan bijak dan dukung studio resmi.
          </p>
        </div>
      </div>
      <div className="border-t border-white/5 py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Luminime · Sub Indo Streaming
>>>>>>> 0d9345cae6bf08afb94e61071e06518b2f041563
      </div>
    </footer>
  );
}
