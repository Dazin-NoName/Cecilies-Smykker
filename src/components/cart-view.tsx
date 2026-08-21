"use client";

import Link from "next/link";
import { useMemo, useState, useSyncExternalStore } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { formatPrice } from "@/lib/products";
import { type CartLine, readCart, writeCart } from "@/components/add-to-cart";
import { ProductVisual } from "@/components/product-visual";

function subscribeCart(onStoreChange: () => void) {
  window.addEventListener("cart-updated", onStoreChange);
  return () => window.removeEventListener("cart-updated", onStoreChange);
}

function emptyCartSnapshot(): CartLine[] {
  return [];
}

export function CartView() {
  const lines = useSyncExternalStore(subscribeCart, readCart, emptyCartSnapshot);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const subtotal = useMemo(() => lines.reduce((total, line) => total + line.price * line.quantity, 0), [lines]);

  function updateQuantity(id: string, quantity: number) {
    const next = lines
      .map((line) => (line.id === id ? { ...line, quantity } : line))
      .filter((line) => line.quantity > 0);
    writeCart(next);
  }

  function removeLine(id: string) {
    const next = lines.filter((line) => line.id !== id);
    writeCart(next);
  }

  async function checkout() {
    setIsCheckingOut(true);
    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: lines.map((line) => ({
          slug: line.slug,
          quantity: line.quantity,
          variant: line.variant
        }))
      })
    });
    const data = (await response.json()) as { url?: string; error?: string };

    if (data.url) {
      window.location.href = data.url;
      return;
    }

    setIsCheckingOut(false);
    alert(data.error ?? "Checkout kunne ikke startes endnu.");
  }

  if (lines.length === 0) {
    return (
      <div className="empty-cart">
        <p className="text-2xl font-semibold text-[var(--accent)]">Din kurv er tom</p>
        <Link className="button shop-all-button mt-6 inline-flex w-auto" href="/shop">
          Se alle GATs
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-layout">
      <div className="grid gap-4">
        {lines.map((line) => (
          <div key={line.id} className="cart-line">
            <Link href={`/product/${line.slug}`} className="product-image-frame relative aspect-square">
              <ProductVisual
                compact
                name={line.name}
                image={line.image}
                collection={line.collection}
                colorway={line.colorway}
              />
            </Link>
            <div className="flex flex-col justify-between gap-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <Link href={`/product/${line.slug}`} className="text-lg font-semibold leading-tight text-[var(--foreground)]">
                    {line.name}
                  </Link>
                  {line.variant ? <p className="mt-1 text-sm text-[var(--muted)]">{line.variant}</p> : null}
                  <p className="mt-2 text-sm font-semibold">{formatPrice(line.price)}</p>
                </div>
                <button aria-label="Fjern" onClick={() => removeLine(line.id)} className="cart-icon-button">
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="flex items-center gap-2">
                <button aria-label="Færre" className="cart-icon-button" onClick={() => updateQuantity(line.id, line.quantity - 1)}>
                  <Minus size={15} />
                </button>
                <span className="grid size-9 place-items-center text-sm">{line.quantity}</span>
                <button aria-label="Flere" className="cart-icon-button" onClick={() => updateQuantity(line.id, line.quantity + 1)}>
                  <Plus size={15} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <aside className="cart-summary">
        <p className="text-2xl font-semibold text-[var(--accent)]">Ordre</p>
        <div className="mt-5 flex items-center justify-between border-t border-[var(--line)] pt-5">
          <span>Subtotal</span>
          <strong>{formatPrice(subtotal)}</strong>
        </div>
        <button className="button primary mt-6 w-full justify-center" disabled={isCheckingOut} onClick={checkout}>
          {isCheckingOut ? "Starter checkout..." : "Gå til betaling"}
        </button>
      </aside>
    </div>
  );
}
