import { EmptyState } from "@/components/empty-state";

export default function NotFound() {
  return (
    <EmptyState
      title="Halaman tidak ditemukan"
      description="Anime, episode, atau batch yang kamu cari tidak tersedia."
      actionHref="/"
      actionLabel="Kembali ke Home"
    />
  );
}
