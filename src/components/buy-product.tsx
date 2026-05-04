"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, CreditCard, ShoppingBag } from "lucide-react";
import { lifeSavers } from "@/lib/fonts";
import { type Product } from "@/lib/products";
import { addProductToCart } from "@/components/add-to-cart";

function formatVariant(plating: string, length: string) {
  return [plating, length].filter(Boolean).join(" / ");
}

export function BuyProduct({ product }: { product: Product }) {
  const [plating, setPlating] = useState(product.platingOptions?.[0] ?? "");
  const [length, setLength] = useState(product.lengthOptions?.[0] ?? "");
  const [added, setAdded] = useState(false);
  const [isBuying, setIsBuying] = useState(false);
  const variant = formatVariant(plating, length);

  function addToCart() {
    addProductToCart(product, variant);
    setAdded(true);
  }

  async function buyNow() {
    setIsBuying(true);
    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: [
          {
            slug: product.slug,
            quantity: 1,
            variant
          }
        ]
      })
    });
    const data = (await response.json()) as { url?: string; error?: string };

    if (data.url) {
      window.location.href = data.url;
      return;
    }

    setIsBuying(false);
    alert(data.error ?? "Checkout kunne ikke startes endnu.");
  }

  return (
    <div className="grid gap-5">
      {product.platingOptions && product.platingOptions.length > 0 ? (
        <fieldset className="grid gap-3">
          <legend className={`${lifeSavers.className} text-base text-[#ce9494]`}>Vælg plating</legend>
          <div className="variant-grid">
            {product.platingOptions.map((option) => (
              <label key={option} className="variant-option">
                <input
                  type="radio"
                  name="plating"
                  value={option}
                  checked={plating === option}
                  onChange={() => {
                    setPlating(option);
                    setAdded(false);
                  }}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </fieldset>
      ) : null}

      {product.lengthOptions && product.lengthOptions.length > 0 ? (
        <details className="length-picker">
          <summary className={`${lifeSavers.className} length-picker-summary`}>
            <span>Vælg længde</span>
            <span className="inline-flex items-center gap-2">
              {length}
              <ChevronDown size={16} strokeWidth={1.5} />
            </span>
          </summary>
          <fieldset className="length-options pt-3">
            <legend className="sr-only">Vælg længde</legend>
            {product.lengthOptions.map((option) => (
              <label key={option} className="variant-option compact">
                <input
                  type="radio"
                  name="length"
                  value={option}
                  checked={length === option}
                  onChange={() => {
                    setLength(option);
                    setAdded(false);
                  }}
                />
                <span>{option}</span>
              </label>
            ))}
          </fieldset>
        </details>
      ) : null}

      <div className="grid gap-3 sm:grid-cols-2">
        <button type="button" className="button primary w-full justify-center" onClick={buyNow} disabled={isBuying}>
          <CreditCard size={17} />
          {isBuying ? "Starter checkout..." : "Køb nu"}
        </button>
        <button type="button" className="button secondary w-full justify-center" onClick={addToCart}>
          <ShoppingBag size={17} />
          {added ? "Lagt i kurv" : "Læg i kurv"}
        </button>
      </div>

      {added ? (
        <Link className={`${lifeSavers.className} text-center text-[#ce9494] underline underline-offset-4`} href="/cart">
          Gå til kurv
        </Link>
      ) : null}
    </div>
  );
}
