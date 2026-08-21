import type { MetadataRoute } from "next";
import { listProducts } from "@/lib/products";

const siteUrl = "https://1989sko.dk";
const collections = ["Classic GAT", "Black Edition", "Paint Drop", "Suede Edit", "Archive Mood"];

function absoluteUrl(url: string) {
  return url.startsWith("http") ? url : `${siteUrl}${url}`;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await listProducts();
  const now = new Date();

  return [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1
    },
    {
      url: `${siteUrl}/shop`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9
    },
    ...collections.map((collection) => ({
      url: `${siteUrl}/shop?collection=${encodeURIComponent(collection)}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.75
    })),
    {
      url: `${siteUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6
    },
    ...products.map((product) => ({
      url: `${siteUrl}/product/${product.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
      images: (product.images.length > 0 ? product.images : product.image ? [product.image] : ["/logo-1989-sko.png"]).map(absoluteUrl)
    }))
  ];
}
