import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { lifeSavers, storyScript } from "@/lib/fonts";
import { listProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Cecilies Smykker | Smykker, armbånd og halskæder online",
  description:
    "Shop Cecilies Smykker online. Dansk smykkeshop med kuraterede armbånd, halskæder, ringe og populære smykkestyles.",
  alternates: {
    canonical: "/"
  }
};

export default async function Home() {
  const featured = await listProducts({ featured: true });

  return (
    <main>
      <section className="section">
        <div className="container">
          <h1 className="sr-only">Cecilies Smykker</h1>
          <div className="mb-8 flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow">Shop</p>
              <h2 className={`${storyScript.className} mt-2 text-5xl leading-tight text-[#ca9e4b] md:text-6xl`}>Alle smykker</h2>
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
