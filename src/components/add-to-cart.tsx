"use client";

import { type Product } from "@/lib/products";

export type CartLine = {
  id: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  variant?: string;
  quantity: number;
};

const cartKey = "cecilies-session-cart";

export function readCart(): CartLine[] {
  if (typeof window === "undefined") return [];

  try {
    return JSON.parse(window.sessionStorage.getItem(cartKey) ?? "[]") as CartLine[];
  } catch {
    return [];
  }
}

export function writeCart(lines: CartLine[]) {
  window.sessionStorage.setItem(cartKey, JSON.stringify(lines));
  window.dispatchEvent(new Event("cart-updated"));
}

export function addProductToCart(product: Product, variant?: string) {
  const lineId = variant ? `${product.slug}:${variant}` : product.slug;
  const current = readCart();
  const existing = current.find((line) => line.id === lineId);
  const next = existing
    ? current.map((line) => (line.id === lineId ? { ...line, quantity: line.quantity + 1 } : line))
    : [
        ...current,
        {
          id: lineId,
          slug: product.slug,
          name: product.name,
          price: product.price,
          image: product.image,
          variant,
          quantity: 1
        }
      ];

  writeCart(next);
}
