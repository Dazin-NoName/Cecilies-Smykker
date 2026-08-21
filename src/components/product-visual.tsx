import Image from "next/image";

type ProductVisualProps = {
  name: string;
  collection?: string;
  colorway?: string;
  image?: string;
  priority?: boolean;
  compact?: boolean;
};

export function ProductVisual({ name, collection, colorway, image, priority = false, compact = false }: ProductVisualProps) {
  if (image) {
    return (
      <Image
        src={image}
        alt={name}
        fill
        unoptimized
        priority={priority}
        sizes={compact ? "112px" : "(max-width: 620px) 100vw, (max-width: 980px) 50vw, 34vw"}
        className="object-cover transition duration-500 group-hover:scale-[1.03]"
      />
    );
  }

  return (
    <div className={`product-visual-placeholder ${compact ? "is-compact" : ""}`} aria-label={`${name} prototype uden produktfoto`}>
      <div className="product-visual-logo">
        <Image src="/logo-1989-sko.png" alt="" fill sizes={compact ? "52px" : "140px"} />
      </div>
      <div className="product-visual-lines" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="product-visual-copy">
        <p>{collection ?? "Maison Margiela GAT"}</p>
        <strong>{compact ? "GAT" : "Produktfoto kommer snart"}</strong>
        {!compact && colorway ? <span>{colorway}</span> : null}
      </div>
    </div>
  );
}
