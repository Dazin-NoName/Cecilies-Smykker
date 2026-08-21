import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Search, ShoppingBag } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { listProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "1989 SKO | Maison Margiela GATs i Danmark",
  description:
    "Shop prototypeprodukter til Maison Margiela GATs hos 1989 SKO. Dansk UI med søgning, kurv, størrelser og checkout.",
  alternates: {
    canonical: "/"
  }
};

export default async function Home() {
  const featured = await listProducts({ featured: true });
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "1989 SKO GAT produkter",
    itemListElement: featured.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `https://1989sko.dk/product/${product.slug}`,
      name: product.name
    }))
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <section className="section home-shop-section">
        <div className="container">
          <div className="home-shop-intro">
            <div className="home-logo-lockup">
              <Image src="/logo-1989-sko.png" alt="1989 SKO" width={180} height={180} priority />
            </div>
            <div>
              <p className="eyebrow">Maison Margiela GATs</p>
              <h1 className="mt-3 max-w-3xl text-4xl font-semibold leading-tight md:text-6xl">
                Dansk GAT-shop med kurv, checkout og prototypeprodukter.
              </h1>
              <p className="seo-intro mt-4 max-w-2xl">
                1989 SKO er sat op som en fokuseret sneakerbutik kun til Maison Margiela GATs.
                Produkterne bruger midlertidige placeholders, så shoppen kan testes uden produktfotos.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/shop" className="button primary">
                  <ShoppingBag size={17} />
                  Shop alle GATs
                </Link>
                <Link href="/shop#search" className="button secondary">
                  <Search size={17} />
                  Søg model
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow">Udvalgte modeller</p>
              <h2 className="mt-2 text-3xl font-semibold md:text-4xl">Prototype GATs</h2>
            </div>
            <Link href="/shop" className="button shop-all-button inline-flex md:w-auto">
              Alle produkter
              <ArrowRight size={17} />
            </Link>
          </div>
          <div className="product-grid mt-6">
            {featured.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
