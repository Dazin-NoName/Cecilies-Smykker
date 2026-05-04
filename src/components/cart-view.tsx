"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { lifeSavers } from "@/lib/fonts";
import { formatPrice } from "@/lib/products";
import { type CartLine, readCart, writeCart } from "@/components/add-to-cart";

export function CartView() {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  useEffect(() => {
    setLines(readCart());

    function sync() {
      setLines(readCart());
    }

    window.addEventListener("cart-updated", sync);
    return () => window.removeEventListener("cart-updated", sync);
  }, []);

  const subtotal = useMemo(() => lines.reduce((total, line) => total + line.price * line.quantity, 0), [lines]);

  function updateQuantity(id: string, quantity: number) {
    const next = lines
      .map((line) => (line.id === id ? { ...line, quantity } : line))
      .filter((line) => line.quantity > 0);
    setLines(next);
    writeCart(next);
  }

  function removeLine(id: string) {
    const next = lines.filter((line) => line.id !== id);
    setLines(next);
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
        <p className={`${lifeSavers.className} text-2xl text-[#ca9e4b]`}>Din kurv er tom</p>
        <p className="mt-2 text-sm text-[var(--muted)]">Kurven gemmes kun i denne browser-session.</p>
        <Link className="button shop-all-button mt-6 inline-flex w-auto" href="/shop">
          Shop alle smykker
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-layout">
      <div className="grid gap-4">
        {lines.map((line) => (
          <div key={line.id} className="cart-line">
            <Link href={`/product/${line.slug}`} className="product-image-frame relative aspect-square bg-[#ffebeb]">
              <Image src={line.image} alt={line.name} fill sizes="112px" className="object-cover" />
            </Link>
            <div className="flex flex-col justify-between gap-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <Link href={`/product/${line.slug}`} className={`${lifeSavers.className} text-xl font-bold leading-tight text-[#ca9e4b]`}>
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
        <p className={`${lifeSavers.className} text-2xl text-[#ca9e4b]`}>Ordre</p>
        <div className="mt-5 flex items-center justify-between border-t border-[var(--line)] pt-5">
          <span>Subtotal</span>
          <strong>{formatPrice(subtotal)}</strong>
        </div>
        <p className="mt-3 text-sm text-[var(--muted)]">Kurven nulstilles, når browser-sessionen lukkes.</p>
        <button className="button primary mt-6 w-full justify-center" disabled={isCheckingOut} onClick={checkout}>
          {isCheckingOut ? "Starter checkout..." : "Gå til betaling"}
        </button>
      </aside>
    </div>
  );
}
