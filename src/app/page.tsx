import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { lifeSavers, storyScript } from "@/lib/fonts";
import { listProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Cecilies Smykker | Dansk smykkeshop online",
  description:
    "Shop Cecilies Smykker online. Dansk smykkeshop med kuraterede armbånd, halskæder, ringe og populære smykkestyles.",
  alternates: {
    canonical: "/"
  }
};

export default async function Home() {
  const featured = await listProducts({ featured: true });
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Cecilies Smykker produkter",
    itemListElement: featured.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `https://cecilies-smykker.dk/product/${product.slug}`,
      name: product.name
    }))
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <section className="section">
        <div className="container">
          <h1 className="sr-only">Cecilies Smykker dansk smykkeshop</h1>
          <div className="mb-8 flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow">Shop</p>
              <h2 className={`${storyScript.className} mt-2 text-5xl leading-tight text-[#ca9e4b] md:text-6xl`}>Alle smykker</h2>
              <p className="seo-intro mt-3 max-w-2xl">
                Cecilies Smykker er en dansk smykkeshop med kuraterede armbånd, halskæder og ringe til hurtig online bestilling.
              </p>
            </div>
            <Link href="/shop" className={`${lifeSavers.className} button shop-all-button inline-flex md:w-auto`}>
              Alle produkter
              <ArrowRight size={17} />
            </Link>
          </div>
          <div className="product-grid">
            {featured.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
