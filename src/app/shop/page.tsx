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

export default async function ShopPage({
  searchParams
}: {
  searchParams: Promise<{ brand?: string; collection?: string; q?: string }>;
}) {
  const { collection, brand, q } = await searchParams;
  const query = q?.trim() ?? "";
  const collectionName = brand && brandTitles[brand] ? brandTitles[brand] : collection;
  const title = collectionName ?? "Shop";
  const filtered = await listProducts({
    collection: collectionName,
    q: query || undefined
  });

  return (
    <main className="section">
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
