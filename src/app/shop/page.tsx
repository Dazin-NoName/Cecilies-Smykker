import type { Metadata } from "next";
import { ProductCard } from "@/components/product-card";
import { listProducts } from "@/lib/products";
import { Search } from "lucide-react";

export const dynamic = "force-dynamic";

type ShopSearchParams = {
  collection?: string;
  q?: string;
};

export async function generateMetadata({
  searchParams
}: {
  searchParams: Promise<ShopSearchParams>;
}): Promise<Metadata> {
  const { collection, q } = await searchParams;
  const isSearch = Boolean(q?.trim());
  const title = collection ? `${collection} | Maison Margiela GATs` : "Shop Maison Margiela GATs";
  const description = collection
    ? `Shop ${collection} hos 1989 SKO. Dansk prototype-shop til Maison Margiela GAT sneakers.`
    : "Shop alle Maison Margiela GATs hos 1989 SKO med størrelsesvalg, kurv og checkout.";

  return {
    title,
    description,
    alternates: {
      canonical: collection && !isSearch ? `/shop?collection=${encodeURIComponent(collection)}` : "/shop"
    },
    robots: isSearch
      ? {
          index: false,
          follow: true
        }
      : undefined,
    openGraph: {
      title: `${title} | 1989 SKO`,
      description,
      url: collection && !isSearch ? `/shop?collection=${encodeURIComponent(collection)}` : "/shop",
      type: "website",
      images: [
        {
          url: "/logo-1989-sko.png",
          alt: "1989 SKO logo"
        }
      ]
    }
  };
}

export default async function ShopPage({
  searchParams
}: {
  searchParams: Promise<ShopSearchParams>;
}) {
  const { collection, q } = await searchParams;
  const query = q?.trim() ?? "";
  const title = collection ?? "Alle GATs";
  const filtered = await listProducts({
    collection,
    q: query || undefined
  });
  const pageUrl = collection && !query
    ? `https://1989sko.dk/shop?collection=${encodeURIComponent(collection)}`
    : "https://1989sko.dk/shop";
  const shopJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${title} hos 1989 SKO`,
    description: collection
      ? `${collection} Maison Margiela GATs hos 1989 SKO.`
      : "Alle Maison Margiela GATs hos 1989 SKO.",
    url: pageUrl,
    isPartOf: {
      "@id": "https://1989sko.dk/#website"
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: filtered.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `https://1989sko.dk/product/${product.slug}`,
        name: product.name
      }))
    }
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "1989 SKO",
        item: "https://1989sko.dk"
      },
      {
        "@type": "ListItem",
        position: 2,
        name: title,
        item: pageUrl
      }
    ]
  };

  return (
    <main className="section">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(shopJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="container">
        <div className="mb-8">
          <p className="eyebrow">Shop</p>
          <h1 className="mt-2 text-4xl font-semibold leading-tight md:text-5xl">{title}</h1>
          <p className="seo-intro mt-3 max-w-2xl">
            Alle produkter er prototypevarer uden produktfotos, men med størrelser, stand, kurv og checkout klar til test.
          </p>
        </div>
        <form id="search" action="/shop" className="mb-8 flex max-w-xl items-center gap-3 border-b border-[var(--line-strong)] pb-3">
          {collection ? <input type="hidden" name="collection" value={collection} /> : null}
          <Search className="text-[var(--accent)]" size={22} strokeWidth={1.45} />
          <input
            className="min-w-0 flex-1 bg-transparent text-base text-[var(--foreground)] outline-none placeholder:text-[var(--muted)]"
            name="q"
            placeholder="Søg efter model, farve eller størrelse"
            defaultValue={query}
          />
          <button className="text-sm font-semibold text-[var(--accent)]" type="submit">
            Søg
          </button>
        </form>
        {filtered.length > 0 ? (
          <div className="product-grid">
            {filtered.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-lg text-[var(--muted)]">Ingen GATs matchede din søgning.</p>
        )}
      </div>
    </main>
  );
}
