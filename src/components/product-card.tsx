import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { lifeSavers } from "@/lib/fonts";
import { formatPrice, type Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group">
      <Link href={`/product/${product.slug}`} className="block">
        <div className="product-image-frame relative aspect-square bg-[#ffebeb]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 620px) 100vw, (max-width: 980px) 50vw, 25vw"
            className="object-cover transition duration-500 group-hover:scale-[1.04]"
          />
          <div className="absolute right-3 top-3 grid size-9 place-items-center bg-[rgba(255,253,248,0.9)]">
            <ArrowUpRight size={16} />
          </div>
        </div>
        <div className="product-card-meta mt-3 flex items-start justify-between gap-3">
          <div>
            <p className={`${lifeSavers.className} text-lg font-bold leading-tight text-[#ca9e4b] md:text-base`}>{product.name}</p>
          </div>
          <p className={`${lifeSavers.className} shrink-0 text-sm font-bold`}>{formatPrice(product.price)}</p>
        </div>
      </Link>
    </article>
  );
}
