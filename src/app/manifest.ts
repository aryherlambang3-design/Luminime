import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "LumineStream - Your Anime Paradise",
    short_name: "LumineStream",
    description: "Nonton anime gratis subtitle Indonesia. Streaming dan download anime terbaru!",
    start_url: "/",
    display: "standalone",
    background_color: "#0c0610",
    theme_color: "#FFB6D9",
    orientation: "portrait",
    categories: ["entertainment", "anime", "streaming"],
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
