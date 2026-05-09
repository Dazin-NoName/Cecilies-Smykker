import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Cecilies Smykker",
    short_name: "Cecilies Smykker",
    description: "Dansk smykkeshop med armbånd, halskæder og ringe.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#ffebeb",
    theme_color: "#ffebeb",
    icons: [
      {
        src: "/favicon-round.png?v=2",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable"
      }
    ]
  };
}
