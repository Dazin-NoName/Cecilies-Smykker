"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Search, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { lifeSavers, storyScript } from "@/lib/fonts";

const utilityItems = [
  { href: "/about", label: "Kontakt os" }
];

const brandItems = [
  { href: "/shop", label: "Alle smykker" },
  { href: "/shop?brand=cartier", label: "Cartier" },
  { href: "/shop?brand=van-cleef", label: "Van Cleef" },
  { href: "/shop?brand=louis-vuitton", label: "Louis Vuitton" },
  { href: "/shop?brand=hermes", label: "Hermes" }
];

export function SiteHeader() {
  const [productsOpen, setProductsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-[var(--line)] bg-[#ffebeb]">
      <div className="site-header-shell grid min-h-[142px] grid-rows-[86px_56px] bg-[#ffebeb]">
        <div className="container header-main-row grid grid-cols-[1fr_auto_1fr] items-center gap-4">
          <nav className={`${lifeSavers.className} hidden text-sm font-normal tracking-0 lg:block`}>
            <div className="header-contact-stack">
              {utilityItems.map((item) => (
                <Link key={item.label} href={item.href} className="nav-underline transition">
                  {item.label}
                </Link>
              ))}
              <Link href="/" aria-label="Cecilies Smykker forside" className="mini-header-logo">
                <Image
                  src="/logo-small-round.png"
                  alt="Cecilies Smykker"
                  width={128}
                  height={128}
                  priority
                />
              </Link>
            </div>
          </nav>

          <Link href="/" aria-label="Cecilies Smykker forside" className="mobile-header-logo">
            <Image
              src="/logo-small-round.png"
              alt="Cecilies Smykker"
              width={128}
              height={128}
              priority
            />
          </Link>

          <Link href="/" className={`${storyScript.className} site-logo header-brand text-center text-4xl leading-none md:text-6xl`}>
            Cecilies Smykker
          </Link>

          <div aria-hidden="true" />
        </div>

        <div className="container header-nav-row flex items-center justify-center gap-8 border-t border-transparent">
          <nav className={`${lifeSavers.className} desktop-brand-nav brand-scroll-nav flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-sm font-normal tracking-0 md:text-base`}>
            {brandItems.map((item) => (
              <Link key={item.label} href={item.href} className="nav-underline whitespace-nowrap transition">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className={`${lifeSavers.className} mobile-product-nav`}>
            {utilityItems.map((item) => (
              <Link key={`mobile-${item.label}`} href={item.href} className="mobile-nav-contact nav-underline whitespace-nowrap transition">
                {item.label}
              </Link>
            ))}
            <button
              type="button"
              className="mobile-product-toggle"
              aria-expanded={productsOpen}
              aria-controls="mobile-product-links"
              onClick={() => setProductsOpen((open) => !open)}
            >
              Produkter
              <ChevronDown className={productsOpen ? "rotate-180" : ""} size={16} strokeWidth={1.5} />
            </button>
          </div>

          <Link
            href="/shop#search"
            aria-label="Søg"
            className="search-link grid h-11 w-14 shrink-0 place-items-center border-l border-[#ce9494] pl-5 transition"
          >
            <Search size={25} strokeWidth={1.45} />
          </Link>
          <Link
            href="/cart"
            aria-label="Kurv"
            className="cart-link grid h-11 w-10 shrink-0 place-items-center transition"
          >
            <ShoppingBag size={22} strokeWidth={1.45} />
          </Link>
        </div>
        <nav
          id="mobile-product-links"
          className={`${lifeSavers.className} mobile-product-panel ${productsOpen ? "is-open" : ""}`}
        >
          {brandItems.map((item) => (
            <Link key={`mobile-panel-${item.label}`} href={item.href} onClick={() => setProductsOpen(false)}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
