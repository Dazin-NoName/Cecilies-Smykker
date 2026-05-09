import type { Metadata } from "next";
import { ProductCard } from "@/components/product-card";
import { lifeSavers, storyScript } from "@/lib/fonts";
import { listProducts } from "@/lib/products";
import { Search } from "lucide-react";

export const dynamic = "force-dynamic";

const brandTitles: Record<string, string> = {
  cartier: "Cartier",
  "van-cleef": "Van Cleef",
  "louis-vuitton": "Louis Vuitton",
  hermes: "Hermes"
};

type ShopSearchParams = {
  brand?: string;
  collection?: string;
  q?: string;
};

export async function generateMetadata({
  searchParams
}: {
  searchParams: Promise<ShopSearchParams>;
}): Promise<Metadata> {
  const { brand, collection, q } = await searchParams;
  const collectionName = brand && brandTitles[brand] ? brandTitles[brand] : collection;
  const isSearch = Boolean(q?.trim());
  const title = collectionName ? `${collectionName} smykker` : "Shop smykker";
  const description = collectionName
    ? `Shop ${collectionName} smykker hos Cecilies Smykker. Find kuraterede smykker, armbånd, halskæder og ringe online.`
    : "Shop alle smykker hos Cecilies Smykker. Find armbånd, halskæder og ringe i kuraterede kollektioner.";

  return {
    title,
    description,
    alternates: {
      canonical: brand && brandTitles[brand] && !isSearch ? `/shop?brand=${brand}` : "/shop"
    },
    robots: isSearch
      ? {
          index: false,
          follow: true
        }
      : undefined,
    openGraph: {
      title: `${title} | Cecilies Smykker`,
      description,
      url: brand && brandTitles[brand] && !isSearch ? `/shop?brand=${brand}` : "/shop",
      type: "website",
      images: [
        {
          url: "/logo-small-round.png",
          alt: "Cecilies Smykker logo"
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
  const { collection, brand, q } = await searchParams;
  const query = q?.trim() ?? "";
  const collectionName = brand && brandTitles[brand] ? brandTitles[brand] : collection;
  const title = collectionName ?? "Shop";
  const filtered = await listProducts({
    collection: collectionName,
    q: query || undefined
  });
  const pageUrl = brand && brandTitles[brand] && !query
    ? `https://cecilies-smykker.dk/shop?brand=${brand}`
    : "https://cecilies-smykker.dk/shop";
  const shopJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${title} hos Cecilies Smykker`,
    description: collectionName
      ? `Kuraterede ${collectionName} smykker hos Cecilies Smykker.`
      : "Alle smykker hos Cecilies Smykker.",
    url: pageUrl,
    isPartOf: {
      "@id": "https://cecilies-smykker.dk/#website"
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: filtered.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `https://cecilies-smykker.dk/product/${product.slug}`,
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
        name: "Cecilies Smykker",
        item: "https://cecilies-smykker.dk"
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
          <div>
            <p className="eyebrow">Shop</p>
            <h1 className={`${storyScript.className} mt-2 text-5xl leading-tight text-[#ca9e4b] md:text-6xl`}>
              {title}
            </h1>
          </div>
        </div>
        <form id="search" action="/shop" className="mb-8 flex max-w-xl items-center gap-3 border-b border-[#ce9494] pb-3">
          {brand ? <input type="hidden" name="brand" value={brand} /> : null}
          <Search className="text-[#ce9494]" size={22} strokeWidth={1.45} />
          <input
            className={`${lifeSavers.className} min-w-0 flex-1 bg-transparent text-lg text-[var(--foreground)] outline-none placeholder:text-[#ce9494]`}
            name="q"
            placeholder="Søg efter smykker"
            defaultValue={query}
          />
          <button className={`${lifeSavers.className} text-[#ce9494]`} type="submit">
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
          <p className={`${lifeSavers.className} text-lg text-[var(--muted)]`}>Ingen smykker matchede din søgning.</p>
        )}
      </div>
    </main>
  );
}
