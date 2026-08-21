import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ShieldCheck, Truck } from "lucide-react";
import { BuyProduct } from "@/components/buy-product";
import { ProductCarousel } from "@/components/product-carousel";
import { ProductCard } from "@/components/product-card";
import { formatPrice, getProduct, listProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return {
      title: "Produkt ikke fundet",
      robots: {
        index: false,
        follow: false
      }
    };
  }

  const image = product.image.startsWith("https://") ? product.image : "/logo-1989-sko.png";
  const description = `${product.name} hos 1989 SKO. ${product.description}`.slice(0, 155);

  return {
    title: `${product.name} | 1989 SKO`,
    description,
    alternates: {
      canonical: `/product/${product.slug}`
    },
    openGraph: {
      title: `${product.name} | 1989 SKO`,
      description,
      type: "website",
      url: `/product/${product.slug}`,
      images: [
        {
          url: image,
          alt: product.name
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | 1989 SKO`,
      description,
      images: [image]
    }
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  const related = (await listProducts({ collection: product.collection }))
    .filter((item) => item.slug !== product.slug)
    .slice(0, 3);
  const gallery = product.images.length > 0 ? product.images : product.image ? [product.image] : ["/logo-1989-sko.png"];
  const specLines = Array.from(
    new Set([product.metal, product.gemstone, ...product.details].map((line) => line.trim()).filter(Boolean))
  );
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: gallery,
    brand: {
      "@type": "Brand",
      name: "Maison Margiela"
    },
    category: product.collection,
    material: product.metal,
    color: product.gemstone,
    offers: {
      "@type": "Offer",
      url: `https://1989sko.dk/product/${product.slug}`,
      priceCurrency: product.currency,
      price: (product.price / 100).toString(),
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@id": "https://1989sko.dk/#store"
      }
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
        name: "Shop",
        item: "https://1989sko.dk/shop"
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.name,
        item: `https://1989sko.dk/product/${product.slug}`
      }
    ]
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <section className="section product-detail-section">
        <div className="container product-detail-layout grid gap-10 lg:grid-cols-[1fr_0.88fr]">
          <ProductCarousel product={product} />

          <div className="product-detail-info lg:sticky lg:top-24 lg:h-fit">
            <p className="eyebrow">{product.collection}</p>
            <h1 className="product-detail-title mt-3 text-4xl font-semibold leading-tight sm:text-5xl">{product.name}</h1>
            <p className="mt-4 text-xl font-semibold sm:text-2xl">{formatPrice(product.price)}</p>
            <p className="mt-6 max-w-xl leading-7 text-[var(--muted)]">{product.description}</p>

            <div className="mt-8 grid gap-3 border-y border-[var(--line)] py-5 text-sm">
              <p><strong>Materialer:</strong> {product.metal}</p>
              <p><strong>Farve:</strong> {product.gemstone}</p>
              {specLines.slice(2).map((detail) => (
                <p key={detail}>{detail}</p>
              ))}
            </div>

            <div className="mt-7">
              <BuyProduct product={product} />
            </div>

            <div className="mt-6 grid gap-3 text-sm text-[var(--muted)] sm:grid-cols-2">
              <p className="flex items-center gap-2"><Truck size={16} /> 2-5 hverdage i Danmark</p>
              <p className="flex items-center gap-2"><ShieldCheck size={16} /> Sikker betaling med Stripe</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-[var(--panel)]">
        <div className="container">
          <p className="eyebrow">Mere fra samme kategori</p>
          <div className="product-grid mt-6">
            {related.map((item) => (
              <ProductCard key={item.slug} product={item} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
