import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { formatPrice, type Product } from "@/lib/products";
import { ProductVisual } from "@/components/product-visual";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group">
      <Link href={`/product/${product.slug}`} className="block">
        <div className="product-image-frame relative aspect-square">
          <ProductVisual
            name={product.name}
            collection={product.collection}
            colorway={product.gemstone}
            image={product.image}
          />
          <div className="absolute right-3 top-3 grid size-9 place-items-center border border-[var(--line)] bg-[rgba(247,245,240,0.92)]">
            <ArrowUpRight size={16} />
          </div>
        </div>
        <div className="product-card-meta mt-3 flex items-start justify-between gap-3">
          <div>
            <p className="text-base font-semibold leading-tight text-[var(--foreground)]">{product.name}</p>
            <p className="mt-1 text-xs uppercase text-[var(--muted)]">{product.collection}</p>
          </div>
          <p className="shrink-0 text-sm font-semibold">{formatPrice(product.price)}</p>
        </div>
      </Link>
    </article>
  );
}
