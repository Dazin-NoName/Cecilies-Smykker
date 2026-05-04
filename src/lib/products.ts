import { ConvexHttpClient } from "convex/browser";
import { anyApi } from "convex/server";

export type Product = {
  slug: string;
  name: string;
  collection: string;
  price: number;
  currency: string;
  metal: string;
  gemstone: string;
  image: string;
  images: string[];
  description: string;
  details: string[];
  platingOptions?: string[];
  lengthOptions?: string[];
  featured: boolean;
};

export type ProductFilters = {
  collection?: string;
  featured?: boolean;
  q?: string;
};

let client: ConvexHttpClient | null = null;

function getConvexClient() {
  const url = process.env.NEXT_PUBLIC_CONVEX_URL;

  if (!url) {
    throw new Error("NEXT_PUBLIC_CONVEX_URL mangler. Produkter hentes fra Convex, så sæt din Convex URL i environment variables.");
  }

  client ??= new ConvexHttpClient(url);
  return client;
}

export async function listProducts(filters: ProductFilters = {}) {
  return (await getConvexClient().query(anyApi.products.list, filters)) as Product[];
}

export async function getProduct(slug: string) {
  return (await getConvexClient().query(anyApi.products.bySlug, { slug })) as Product | null;
}

export async function getProductsBySlugs(slugs: string[]) {
  return (await getConvexClient().query(anyApi.products.bySlugs, { slugs })) as Product[];
}

export function formatPrice(amount: number) {
  if (amount <= 0) return "Pris kommer snart";

  return new Intl.NumberFormat("da-DK", {
    style: "currency",
    currency: "DKK",
    maximumFractionDigits: 0
  }).format(amount / 100);
}
