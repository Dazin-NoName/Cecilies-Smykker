import type { MetadataRoute } from "next";
import { listProducts } from "@/lib/products";

const siteUrl = "https://cecilies-smykker.dk";
const brandPages = [
  { slug: "cartier", priority: 0.85 },
  { slug: "van-cleef", priority: 0.85 },
  { slug: "louis-vuitton", priority: 0.7 },
  { slug: "hermes", priority: 0.7 }
];

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
    ...brandPages.map((brand) => ({
      url: `${siteUrl}/shop?brand=${brand.slug}`,
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: brand.priority
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
      images: (product.images.length > 0 ? product.images : [product.image]).map(absoluteUrl)
    }))
  ];
}
