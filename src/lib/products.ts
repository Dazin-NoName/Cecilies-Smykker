import { ConvexHttpClient } from "convex/browser";
import { anyApi } from "convex/server";

export type Product = {
  slug: string;
  name: string;
  collection: string;
  price: number;
  currency: string;
  metal: string;
  gemstone: string;
  image: string;
  images: string[];
  description: string;
  details: string[];
  platingOptions?: string[];
  lengthOptions?: string[];
  featured: boolean;
};

export type ProductFilters = {
  collection?: string;
  featured?: boolean;
  q?: string;
};

const sizes = ["EU 39", "EU 40", "EU 41", "EU 42", "EU 43", "EU 44", "EU 45"];
const conditions = ["Ny / DS", "Prøvet indendørs", "Let brugt"];
const noProductImage = "";

export const prototypeProducts: Product[] = [
  {
    slug: "maison-margiela-gat-classic-white",
    name: "Maison Margiela GAT Classic White",
    collection: "Classic GAT",
    price: 429900,
    currency: "dkk",
    metal: "Kalveskind, ruskindspaneler og gum sole",
    gemstone: "Hvid / grå / naturgummi",
    image: noProductImage,
    images: [],
    description:
      "Den klassiske Replica-inspirerede GAT med hvid læderoverdel, grå ruskindsdetaljer og den varme gummisål. En ren hverdagsmodel til både brede bukser og skarpere styling.",
    details: [
      "Prototypeprodukt uden produktfoto",
      "Lav silhuet med snørelukning",
      "Polstret krave og læderforing",
      "Leveres med støvpose i prototype-flow"
    ],
    platingOptions: sizes,
    lengthOptions: conditions,
    featured: true
  },
  {
    slug: "maison-margiela-gat-black-leather",
    name: "Maison Margiela GAT Black Leather",
    collection: "Black Edition",
    price: 459900,
    currency: "dkk",
    metal: "Sort kalveskind, ruskind og gum sole",
    gemstone: "Sort / sort / mørk gum",
    image: noProductImage,
    images: [],
    description:
      "En mørkere GAT-variant med sort læder og diskrete ruskindspaneler. Den fungerer som et mere nedtonet alternativ til den klassiske hvide model.",
    details: ["Prototypeprodukt uden produktfoto", "Tonal sort overdel", "Kontrast i materialestruktur", "Diskret hverdagsluksus"],
    platingOptions: sizes,
    lengthOptions: conditions,
    featured: true
  },
  {
    slug: "maison-margiela-gat-painted-white",
    name: "Maison Margiela GAT Paint Drop White",
    collection: "Paint Drop",
    price: 519900,
    currency: "dkk",
    metal: "Læder, ruskind og håndmalet effekt",
    gemstone: "Hvid med paint-drop detaljer",
    image: noProductImage,
    images: [],
    description:
      "En statement GAT med paint-drop effekt og rå atelier-fornemmelse. Produktet er lagt ind som prototype, så det kan sælges eller testes uden produktbilleder.",
    details: ["Prototypeprodukt uden produktfoto", "Paint-drop inspireret finish", "Hver sko kan variere let", "Lav Replica/GAT silhuet"],
    platingOptions: sizes,
    lengthOptions: conditions,
    featured: true
  },
  {
    slug: "maison-margiela-gat-grey-suede",
    name: "Maison Margiela GAT Grey Suede",
    collection: "Suede Edit",
    price: 389900,
    currency: "dkk",
    metal: "Ruskind, læderdetaljer og gum sole",
    gemstone: "Grå / off-white / naturgummi",
    image: noProductImage,
    images: [],
    description:
      "Blød grå GAT med ruskind som hovedmateriale og en rolig farvepalet. En prototype til kunder, der vil have GAT-udtrykket uden en helt hvid sneaker.",
    details: ["Prototypeprodukt uden produktfoto", "Grå ruskindsoverdel", "Off-white kontrastpaneler", "Gummisål med vintage look"],
    platingOptions: sizes,
    lengthOptions: conditions,
    featured: true
  },
  {
    slug: "maison-margiela-gat-triple-white",
    name: "Maison Margiela GAT Triple White",
    collection: "Classic GAT",
    price: 409900,
    currency: "dkk",
    metal: "Hvidt læder, ruskind og lys gummisål",
    gemstone: "Triple white",
    image: noProductImage,
    images: [],
    description:
      "En lys og minimal GAT til et rent outfit. Produktet er sat op til prototype-salg med størrelsesvalg, kurv og checkout ligesom resten af shoppen.",
    details: ["Prototypeprodukt uden produktfoto", "Hvid på hvid farvevariant", "Lav profil", "Nem at style til hverdag"],
    platingOptions: sizes,
    lengthOptions: conditions,
    featured: false
  },
  {
    slug: "maison-margiela-gat-red-detail",
    name: "Maison Margiela GAT Red Detail",
    collection: "Archive Mood",
    price: 469900,
    currency: "dkk",
    metal: "Læder, ruskind og gum sole",
    gemstone: "Hvid / grå med rød detalje",
    image: noProductImage,
    images: [],
    description:
      "Klassisk GAT-base med en lille rød detalje for et mere arkiv-inspireret udtryk. Perfekt som prototypeprodukt til en mere begrænset drop-side.",
    details: ["Prototypeprodukt uden produktfoto", "Rød kontrastdetalje", "Replica-inspireret form", "Begrænset prototype-drop"],
    platingOptions: sizes,
    lengthOptions: conditions,
    featured: false
  }
];

let client: ConvexHttpClient | null = null;

function getConvexClient() {
  const url = process.env.NEXT_PUBLIC_CONVEX_URL;

  if (!url) return null;

  client ??= new ConvexHttpClient(url);
  return client;
}

function filterProducts(products: Product[], filters: ProductFilters) {
  return products.filter((product) => {
    if (filters.featured !== undefined && product.featured !== filters.featured) return false;
    if (filters.collection && product.collection !== filters.collection) return false;

    const term = filters.q?.trim().toLowerCase();
    if (!term) return true;

    return [
      product.name,
      product.collection,
      product.description,
      product.metal,
      product.gemstone,
      ...product.details,
      ...(product.platingOptions ?? []),
      ...(product.lengthOptions ?? [])
    ]
      .join(" ")
      .toLowerCase()
      .includes(term);
  });
}

export async function listProducts(filters: ProductFilters = {}) {
  const convex = getConvexClient();
  if (!convex) return filterProducts(prototypeProducts, filters);

  return (await convex.query(anyApi.products.list, filters)) as Product[];
}

export async function getProduct(slug: string) {
  const convex = getConvexClient();
  if (!convex) return prototypeProducts.find((product) => product.slug === slug) ?? null;

  return (await convex.query(anyApi.products.bySlug, { slug })) as Product | null;
}

export async function getProductsBySlugs(slugs: string[]) {
  const convex = getConvexClient();
  if (!convex) return prototypeProducts.filter((product) => slugs.includes(product.slug));

  return (await convex.query(anyApi.products.bySlugs, { slugs })) as Product[];
}

export function formatPrice(amount: number) {
  if (amount <= 0) return "Pris kommer snart";

  return new Intl.NumberFormat("da-DK", {
    style: "currency",
    currency: "DKK",
    maximumFractionDigits: 0
  }).format(amount / 100);
}
