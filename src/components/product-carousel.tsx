"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { type Product } from "@/lib/products";
import { ProductVisual } from "@/components/product-visual";

export function ProductCarousel({ product }: { product: Product }) {
  const images = product.images.length > 0 ? product.images : product.image ? [product.image] : [];
  const [index, setIndex] = useState(0);
  const current = images[index];

  function previous() {
    setIndex((currentIndex) => (currentIndex === 0 ? images.length - 1 : currentIndex - 1));
  }

  function next() {
    setIndex((currentIndex) => (currentIndex === images.length - 1 ? 0 : currentIndex + 1));
  }

  return (
    <div className="product-carousel">
      <div className="product-carousel-frame product-image-frame relative">
        {current ? (
          <Image
            src={current}
            alt={`${product.name} billede ${index + 1}`}
            fill
            priority
            unoptimized
            sizes="(max-width: 1024px) 100vw, 52vw"
            className="object-cover"
          />
        ) : (
          <ProductVisual
            name={product.name}
            collection={product.collection}
            colorway={product.gemstone}
            priority
          />
        )}
        {images.length > 1 ? (
          <>
            <button type="button" className="carousel-button carousel-button-left" aria-label="Forrige billede" onClick={previous}>
              <ChevronLeft size={20} strokeWidth={1.6} />
            </button>
            <button type="button" className="carousel-button carousel-button-right" aria-label="Næste billede" onClick={next}>
              <ChevronRight size={20} strokeWidth={1.6} />
            </button>
          </>
        ) : null}
      </div>

      {images.length > 1 ? (
        <div className="carousel-thumbs" aria-label="Produktbilleder">
          {images.map((image, imageIndex) => (
            <button
              key={image}
              type="button"
              className={`carousel-thumb ${imageIndex === index ? "is-active" : ""}`}
              aria-label={`Vis billede ${imageIndex + 1}`}
              onClick={() => setIndex(imageIndex)}
            >
              <Image src={image} alt="" fill unoptimized sizes="74px" className="object-cover" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
