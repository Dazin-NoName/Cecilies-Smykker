import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "1989 SKO",
    short_name: "1989 SKO",
    description: "Dansk prototype-shop kun til Maison Margiela GAT sneakers.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#f7f7f4",
    theme_color: "#6f001d",
    icons: [
      {
        src: "/logo-1989-sko.png",
        sizes: "1024x1024",
        type: "image/png",
        purpose: "maskable"
      }
    ]
  };
}
