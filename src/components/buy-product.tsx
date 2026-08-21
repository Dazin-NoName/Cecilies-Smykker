"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, CreditCard, ShoppingBag } from "lucide-react";
import { type Product } from "@/lib/products";
import { addProductToCart } from "@/components/add-to-cart";

function formatVariant(size: string, condition: string) {
  return [size, condition].filter(Boolean).join(" / ");
}

export function BuyProduct({ product }: { product: Product }) {
  const sizeOptions = product.platingOptions ?? [];
  const conditionOptions = product.lengthOptions ?? [];
  const [size, setSize] = useState(sizeOptions[0] ?? "");
  const [condition, setCondition] = useState(conditionOptions[0] ?? "");
  const [added, setAdded] = useState(false);
  const [isBuying, setIsBuying] = useState(false);
  const variant = formatVariant(size, condition);
  const showConditionPicker = conditionOptions.length > 1;

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
      {sizeOptions.length > 0 ? (
        <fieldset className="grid gap-3">
          <legend className="text-sm font-semibold text-[var(--accent)]">Vælg størrelse</legend>
          <div className="variant-grid">
            {sizeOptions.map((option) => (
              <label key={option} className="variant-option">
                <input
                  type="radio"
                  name="size"
                  value={option}
                  checked={size === option}
                  onChange={() => {
                    setSize(option);
                    setAdded(false);
                  }}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </fieldset>
      ) : null}

      {showConditionPicker ? (
        <details className="length-picker">
          <summary className="length-picker-summary">
            <span>Vælg stand</span>
            <span className="inline-flex items-center gap-2">
              {condition}
              <ChevronDown size={16} strokeWidth={1.5} />
            </span>
          </summary>
          <fieldset className="length-options pt-3">
            <legend className="sr-only">Vælg stand</legend>
            {conditionOptions.map((option) => (
              <label key={option} className="variant-option compact">
                <input
                  type="radio"
                  name="condition"
                  value={option}
                  checked={condition === option}
                  onChange={() => {
                    setCondition(option);
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
        <Link className="text-center text-sm font-semibold text-[var(--accent)] underline underline-offset-4" href="/cart">
          Gå til kurv
        </Link>
      ) : null}
    </div>
  );
}
