import { mutation } from "./_generated/server";

const sizes = ["EU 39", "EU 40", "EU 41", "EU 42", "EU 43", "EU 44", "EU 45"];
const conditions = ["Ny / DS", "Prøvet indendørs", "Let brugt"];

type ProductSeed = {
  slug: string;
  name: string;
  collection: string;
  description: string;
  price: number;
  currency: string;
  metal: string;
  gemstone: string;
  image: string;
  images: string[];
  details: string[];
  platingOptions?: string[];
  lengthOptions?: string[];
  active: boolean;
  featured: boolean;
  sortOrder: number;
};

const seedProducts: ProductSeed[] = [
  {
    slug: "maison-margiela-gat-classic-white",
    name: "Maison Margiela GAT Classic White",
    collection: "Classic GAT",
    price: 429900,
    currency: "dkk",
    metal: "Kalveskind, ruskindspaneler og gum sole",
    gemstone: "Hvid / grå / naturgummi",
    image: "",
    images: [],
    description:
      "Den klassiske Replica-inspirerede GAT med hvid læderoverdel, grå ruskindsdetaljer og den varme gummisål.",
    details: ["Prototypeprodukt uden produktfoto", "Lav silhuet med snørelukning", "Polstret krave og læderforing"],
    platingOptions: sizes,
    lengthOptions: conditions,
    active: true,
    featured: true,
    sortOrder: 10
  },
  {
    slug: "maison-margiela-gat-black-leather",
    name: "Maison Margiela GAT Black Leather",
    collection: "Black Edition",
    price: 459900,
    currency: "dkk",
    metal: "Sort kalveskind, ruskind og gum sole",
    gemstone: "Sort / sort / mørk gum",
    image: "",
    images: [],
    description: "En mørkere GAT-variant med sort læder og diskrete ruskindspaneler.",
    details: ["Prototypeprodukt uden produktfoto", "Tonal sort overdel", "Kontrast i materialestruktur"],
    platingOptions: sizes,
    lengthOptions: conditions,
    active: true,
    featured: true,
    sortOrder: 20
  },
  {
    slug: "maison-margiela-gat-painted-white",
    name: "Maison Margiela GAT Paint Drop White",
    collection: "Paint Drop",
    price: 519900,
    currency: "dkk",
    metal: "Læder, ruskind og håndmalet effekt",
    gemstone: "Hvid med paint-drop detaljer",
    image: "",
    images: [],
    description: "En statement GAT med paint-drop effekt og rå atelier-fornemmelse.",
    details: ["Prototypeprodukt uden produktfoto", "Paint-drop inspireret finish", "Hver sko kan variere let"],
    platingOptions: sizes,
    lengthOptions: conditions,
    active: true,
    featured: true,
    sortOrder: 30
  },
  {
    slug: "maison-margiela-gat-grey-suede",
    name: "Maison Margiela GAT Grey Suede",
    collection: "Suede Edit",
    price: 389900,
    currency: "dkk",
    metal: "Ruskind, læderdetaljer og gum sole",
    gemstone: "Grå / off-white / naturgummi",
    image: "",
    images: [],
    description: "Blød grå GAT med ruskind som hovedmateriale og en rolig farvepalet.",
    details: ["Prototypeprodukt uden produktfoto", "Grå ruskindsoverdel", "Off-white kontrastpaneler"],
    platingOptions: sizes,
    lengthOptions: conditions,
    active: true,
    featured: true,
    sortOrder: 40
  },
  {
    slug: "maison-margiela-gat-triple-white",
    name: "Maison Margiela GAT Triple White",
    collection: "Classic GAT",
    price: 409900,
    currency: "dkk",
    metal: "Hvidt læder, ruskind og lys gummisål",
    gemstone: "Triple white",
    image: "",
    images: [],
    description: "En lys og minimal GAT til et rent outfit.",
    details: ["Prototypeprodukt uden produktfoto", "Hvid på hvid farvevariant", "Lav profil"],
    platingOptions: sizes,
    lengthOptions: conditions,
    active: true,
    featured: false,
    sortOrder: 50
  },
  {
    slug: "maison-margiela-gat-red-detail",
    name: "Maison Margiela GAT Red Detail",
    collection: "Archive Mood",
    price: 469900,
    currency: "dkk",
    metal: "Læder, ruskind og gum sole",
    gemstone: "Hvid / grå med rød detalje",
    image: "",
    images: [],
    description: "Klassisk GAT-base med en lille rød detalje for et mere arkiv-inspireret udtryk.",
    details: ["Prototypeprodukt uden produktfoto", "Rød kontrastdetalje", "Begrænset prototype-drop"],
    platingOptions: sizes,
    lengthOptions: conditions,
    active: true,
    featured: false,
    sortOrder: 60
  }
];

export const run = mutation({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();

    for (const product of seedProducts) {
      const existing = await ctx.db
        .query("products")
        .withIndex("by_slug", (q) => q.eq("slug", product.slug))
        .first();

      if (existing) {
        await ctx.db.patch(existing._id, {
          ...product,
          updatedAt: now
        });
      } else {
        await ctx.db.insert("products", {
          ...product,
          createdAt: now,
          updatedAt: now
        });
      }
    }

    return seedProducts.length;
  }
});
