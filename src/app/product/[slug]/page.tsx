import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ShieldCheck, Truck } from "lucide-react";
import { BuyProduct } from "@/components/buy-product";
import { ProductCarousel } from "@/components/product-carousel";
import { ProductCard } from "@/components/product-card";
import { storyScript } from "@/lib/fonts";
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

  const image = product.image.startsWith("https://") ? product.image : "/logo-small-round.png";
  const description = `${product.name} hos Cecilies Smykker. ${product.description}`.slice(0, 155);

  return {
    title: `${product.name} | Cecilies Smykker`,
    description,
    alternates: {
      canonical: `/product/${product.slug}`
    },
    openGraph: {
      title: `${product.name} | Cecilies Smykker`,
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
      title: `${product.name} | Cecilies Smykker`,
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
  const gallery = product.images.length > 0 ? product.images : [product.image];

  return (
    <main>
      <section className="section product-detail-section">
        <div className="container product-detail-layout grid gap-10 lg:grid-cols-[1fr_0.88fr]">
          <ProductCarousel images={gallery} name={product.name} />

          <div className="product-detail-info lg:sticky lg:top-24 lg:h-fit">
            <p className="eyebrow">{product.collection}</p>
            <h1 className={`${storyScript.className} product-detail-title mt-3 text-5xl leading-tight text-[#ca9e4b] sm:text-5xl lg:text-6xl`}>{product.name}</h1>
            <p className="mt-4 text-xl font-semibold sm:text-2xl">{formatPrice(product.price)}</p>
            <p className="mt-6 max-w-xl leading-7 text-[var(--muted)]">{product.description}</p>

            <div className="mt-8 grid gap-3 border-y border-[var(--line)] py-5 text-sm">
              <p>{product.metal}</p>
              <p>{product.gemstone}</p>
              {product.details.map((detail) => (
                <p key={detail}>{detail}</p>
              ))}
            </div>

            <div className="mt-7">
              <BuyProduct product={product} />
            </div>

            <div className="mt-6 grid gap-3 text-sm text-[var(--muted)] sm:grid-cols-2">
              <p className="flex items-center gap-2"><Truck size={16} /> 4-8 hverdage fragt</p>
              <p className="flex items-center gap-2"><ShieldCheck size={16} /> Sikker betaling med Stripe</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-[var(--panel)]">
        <div className="container">
          <p className="eyebrow">Mere fra shoppen</p>
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
