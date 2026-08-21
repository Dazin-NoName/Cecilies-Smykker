"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Search, ShoppingBag } from "lucide-react";
import { useState } from "react";

const utilityItems = [{ href: "/about", label: "Kontakt" }];

const categoryItems = [
  { href: "/shop", label: "Alle GATs" },
  { href: "/shop?collection=Classic%20GAT", label: "Classic GAT" },
  { href: "/shop?collection=Black%20Edition", label: "Black Edition" },
  { href: "/shop?collection=Paint%20Drop", label: "Paint Drop" },
  { href: "/shop?collection=Suede%20Edit", label: "Suede Edit" }
];

export function SiteHeader() {
  const [productsOpen, setProductsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-[var(--line)] bg-[var(--background)]">
      <div className="site-header-shell">
        <div className="container header-main-row">
          <Link href="/" aria-label="1989 SKO forside" className="mini-header-logo">
            <Image src="/logo-1989-sko.png" alt="1989 SKO" width={128} height={128} priority />
          </Link>

          <Link href="/" className="site-logo header-brand text-center leading-none">
            1989 SKO
          </Link>

          <div aria-hidden="true" />
        </div>

        <div className="container header-nav-row">
          <nav className="desktop-brand-nav brand-scroll-nav">
            {categoryItems.map((item) => (
              <Link key={item.label} href={item.href} className="nav-underline whitespace-nowrap transition">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mobile-product-nav">
            <button
              type="button"
              className="mobile-product-toggle"
              aria-expanded={productsOpen}
              aria-controls="mobile-product-links"
              onClick={() => setProductsOpen((open) => !open)}
            >
              GATs
              <ChevronDown className={productsOpen ? "rotate-180" : ""} size={16} strokeWidth={1.5} />
            </button>
          </div>

          <Link href="/shop#search" aria-label="Søg" className="search-link shrink-0 transition">
            <Search size={24} strokeWidth={1.55} />
          </Link>
          <Link href="/cart" aria-label="Kurv" className="cart-link shrink-0 transition">
            <ShoppingBag size={22} strokeWidth={1.55} />
          </Link>
          {utilityItems.map((item) => (
            <Link key={item.label} href={item.href} className="header-contact-link nav-underline whitespace-nowrap transition">
              {item.label}
            </Link>
          ))}
        </div>
        <nav id="mobile-product-links" className={`mobile-product-panel ${productsOpen ? "is-open" : ""}`}>
          {categoryItems.map((item) => (
            <Link key={`mobile-panel-${item.label}`} href={item.href} onClick={() => setProductsOpen(false)}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
