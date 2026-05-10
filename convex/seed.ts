import { mutation } from "./_generated/server";

const platingOptions = ["Gold 18K plating", "Rose gold 18K plating", "White gold 18K plating"];
const braceletLengths = ["16cm", "17cm", "18cm", "19cm", "20cm", "21cm"];
const platedTitanium = "Titanium med gold, rose gold eller white gold plating (18K)";
const alhambraMaterial = "Solid sølv og 18K guld plating";
const placeholderImage = "/logo-small-round.png";

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

function alhambraBracelet({
  slug,
  motif,
  detail,
  description,
  images,
  sortOrder
}: {
  slug: string;
  motif: string;
  detail: string;
  description: string;
  images?: string[];
  sortOrder: number;
}): ProductSeed {
  const gallery = images ?? [placeholderImage];

  return {
    slug,
    name: `Alhambra ${motif} bracelet (5 motif)`,
    collection: "Van Cleef",
    price: 75000,
    currency: "dkk",
    metal: alhambraMaterial,
    gemstone: detail,
    image: gallery[0],
    images: gallery,
    description,
    details: [alhambraMaterial, "19cm", detail],
    platingOptions,
    lengthOptions: ["19cm"],
    active: true,
    featured: true,
    sortOrder
  };
}

const seedProducts: ProductSeed[] = [
  {
    slug: "cartier-c-de-cartier-necklace-18k",
    name: "Cartier C de Cartier Necklace 18K",
    collection: "Cartier",
    price: 98000,
    currency: "dkk",
    metal: "Titanium med 18K gold plating",
    gemstone: "Pearl",
    image: "https://i.ibb.co/r2S28fXj/Vintage-pearl-necklace-cartier-3.png",
    images: [
      "https://i.ibb.co/r2S28fXj/Vintage-pearl-necklace-cartier-3.png",
      "https://i.ibb.co/gLTm0n7w/Vintage-pearl-necklace-cartier-2.png",
      "https://i.ibb.co/pjvm68fL/Vintage-pearl-necklace-cartier-1.png"
    ],
    description:
      "Guldfarvet halskæde med et enkelt perlevedhæng. Halskæden er lavet i titanium med 18K gold plating, som giver et let og holdbart smykke med en varm guldfinish. Det simple design gør den nem at bruge både til hverdag og mere pyntede outfits. Fås i rose gold, gold og white gold.",
    details: ["Perlevedhæng", "Let og holdbart design", "Kan vælges i rose gold, gold eller white gold plating"],
    platingOptions,
    active: true,
    featured: true,
    sortOrder: 10
  },
  {
    slug: "cartier-love-bracelet-full-metal",
    name: "Cartier love bracelet (full metal)",
    collection: "Cartier",
    price: 128000,
    currency: "dkk",
    metal: platedTitanium,
    gemstone: "No stone",
    image: "https://i.ibb.co/KcxFh2Gc/Cartier-love-bracelet-no-stone1.png",
    images: [
      "https://i.ibb.co/KcxFh2Gc/Cartier-love-bracelet-no-stone1.png",
      "https://i.ibb.co/VWNKxB3w/Cartier-love-bracelet-no-stone4.png",
      "https://i.ibb.co/LD6NPJLd/Cartier-love-bracelet-no-stone3.png",
      "https://i.ibb.co/XxS6zgb6/Cartier-love-bracelet-no-stone2.png",
      "https://i.ibb.co/y9yNTqS/Cartier-love-bracelet-no-stone5.png"
    ],
    description:
      "Armbånd i titanium med et enkelt skrue-design og en ren, klassisk finish. Dette er no stone versionen, så udtrykket er mere minimalistisk og nemt at style til hverdag. Fås med 18K plating i rose gold, gold og white gold.",
    details: [platedTitanium, "No stone version", "Klassisk skrue-design"],
    platingOptions,
    lengthOptions: braceletLengths,
    active: true,
    featured: true,
    sortOrder: 20
  },
  {
    slug: "cartier-love-ring-full-metal",
    name: "Cartier love ring (full metal)",
    collection: "Cartier",
    price: 84000,
    currency: "dkk",
    metal: platedTitanium,
    gemstone: "No stone",
    image: "https://i.ibb.co/RKNGZQp/Cartier-love-ring-full-metal1.png",
    images: [
      "https://i.ibb.co/RKNGZQp/Cartier-love-ring-full-metal1.png",
      "https://i.ibb.co/KxtpPMC1/Cartier-love-ring-full-metal2.png",
      "https://i.ibb.co/YB0JqtK6/Cartier-love-ring-full-metal3.png",
      "https://i.ibb.co/84fbf2Hv/Cartier-love-ring-full-metal4.png"
    ],
    description: "Description kommer snart.",
    details: [platedTitanium, "No stone version", "Klassisk love ring design"],
    platingOptions,
    active: true,
    featured: true,
    sortOrder: 30
  },
  {
    slug: "alhambra-blue-necklace-5-motif",
    name: "Alhambra blue agate bracelet (5 motif)",
    collection: "Van Cleef",
    price: 75000,
    currency: "dkk",
    metal: alhambraMaterial,
    gemstone: "Blå firkløver-detaljer",
    image: placeholderImage,
    images: [placeholderImage],
    description:
      "Armbånd i sterling sølv med 18K gold plating og blå firkløver-detaljer. Designet har en enkel kæde med små dekorative led, som giver et feminint og klassisk look. Et let smykke, der kan bruges alene eller sammen med andre armbånd.",
    details: [alhambraMaterial, "19cm", "Blå firkløver-detaljer"],
    platingOptions,
    lengthOptions: ["19cm"],
    active: true,
    featured: true,
    sortOrder: 40
  },
  alhambraBracelet({
    slug: "alhambra-black-onyx-bracelet-5-motif",
    motif: "black onyx",
    detail: "Sorte onyx-inspirerede firkløver-detaljer",
    description:
      "Armbånd i sterling sølv med 18K gold plating og sorte onyx-inspirerede firkløver-detaljer. Det mørke motiv giver et rent, elegant udtryk, mens den enkle kæde gør smykket nemt at style alene eller sammen med andre armbånd.",
    images: [
      "https://i.ibb.co/FL0WjtMY/Van-cleef-5-motif-black-onyx1.png"
    ],
    sortOrder: 50
  }),
  alhambraBracelet({
    slug: "alhambra-carnelian-bracelet-5-motif",
    motif: "carnelian",
    detail: "Røde carnelian-inspirerede firkløver-detaljer",
    description:
      "Armbånd i sterling sølv med 18K gold plating og røde carnelian-inspirerede firkløver-detaljer. Den varme røde tone giver smykket et levende og klassisk look, som fungerer godt både alene og i lag.",
    images: [
      "https://i.ibb.co/TM85hGfZ/Van-cleef-5-motif-carnelian1.png"
    ],
    sortOrder: 60
  }),
  alhambraBracelet({
    slug: "alhambra-gold-laser-bracelet-5-motif",
    motif: "gold laser",
    detail: "Gyldne laser-skårne firkløver-detaljer",
    description:
      "Armbånd i sterling sølv med 18K gold plating og gyldne laser-skårne firkløver-detaljer. Det tonale guldlook giver et enkelt, blankt og luksuriøst udtryk, der er let at bruge til hverdag og fest.",
    sortOrder: 70
  }),
  alhambraBracelet({
    slug: "alhambra-malachite-bracelet-5-motif",
    motif: "malachite",
    detail: "Grønne malachite-inspirerede firkløver-detaljer",
    description:
      "Armbånd i sterling sølv med 18K gold plating og grønne malachite-inspirerede firkløver-detaljer. Den dybe grønne farve giver et markant, men stadig feminint look med klassisk Alhambra-inspireret form.",
    images: [
      "https://i.ibb.co/Zzvw4cXx/Van-cleef-5-motif-malachite1.png"
    ],
    sortOrder: 80
  }),
  alhambraBracelet({
    slug: "alhambra-purple-chalcedony-bracelet-5-motif",
    motif: "purple chalcedony",
    detail: "Lilla chalcedony-inspirerede firkløver-detaljer",
    description:
      "Armbånd i sterling sølv med 18K gold plating og lilla chalcedony-inspirerede firkløver-detaljer. Den bløde lilla tone giver et roligt og elegant udtryk, som passer godt til et feminint lag-på-lag look.",
    images: [
      "https://i.ibb.co/MJJtCpf/Van-cleef-5-motif-purple-chalcedony1.png",
      "https://i.ibb.co/r2ML37hC/Van-cleef-5-motif-purple-chalcedony2.png",
      "https://i.ibb.co/p6wZVbfr/Van-cleef-5-motif-purple-chalcedony3.png"
    ],
    sortOrder: 90
  }),
  alhambraBracelet({
    slug: "alhambra-tiger-eyes-bracelet-5-motif",
    motif: "tiger eyes",
    detail: "Brune tiger eye-inspirerede firkløver-detaljer",
    description:
      "Armbånd i sterling sølv med 18K gold plating og brune tiger eye-inspirerede firkløver-detaljer. De varme gyldenbrune toner giver smykket et naturligt og sofistikeret udtryk.",
    images: [
      "https://i.ibb.co/0jy38qLw/Van-cleef-5-motif-tiger-eyes1.png",
      "https://i.ibb.co/Y7BtMPb3/Van-cleef-5-motif-tiger-eyes2.png"
    ],
    sortOrder: 100
  }),
  alhambraBracelet({
    slug: "alhambra-white-pearl-bracelet-5-motif",
    motif: "white pearl",
    detail: "Hvide perlemor-inspirerede firkløver-detaljer",
    description:
      "Armbånd i sterling sølv med 18K gold plating og hvide perlemor-inspirerede firkløver-detaljer. Det lyse motiv giver et klassisk, blødt og tidløst look, som er nemt at kombinere med andre smykker.",
    images: [
      "https://i.ibb.co/v6WQRzp3/Van-cleef-5-motif-white-pearl-1.png"
    ],
    sortOrder: 110
  })
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
