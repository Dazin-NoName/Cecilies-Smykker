import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

const productInput = v.object({
  slug: v.string(),
  name: v.string(),
  collection: v.string(),
  description: v.string(),
  price: v.number(),
  currency: v.string(),
  metal: v.string(),
  gemstone: v.string(),
  image: v.string(),
  images: v.array(v.string()),
  details: v.array(v.string()),
  platingOptions: v.optional(v.array(v.string())),
  lengthOptions: v.optional(v.array(v.string())),
  active: v.boolean(),
  featured: v.boolean(),
  sortOrder: v.number()
});

export const list = query({
  args: {
    collection: v.optional(v.string()),
    featured: v.optional(v.boolean()),
    q: v.optional(v.string())
  },
  handler: async (ctx, args) => {
    let products = args.collection
      ? await ctx.db
          .query("products")
          .withIndex("by_collection", (q) => q.eq("collection", args.collection!))
          .collect()
      : await ctx.db.query("products").collect();

    products = products.filter((product) => product.active);

    if (args.featured !== undefined) {
      products = products.filter((product) => product.featured === args.featured);
    }

    if (args.q?.trim()) {
      const term = args.q.trim().toLowerCase();
      products = products.filter((product) =>
        [
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
          .includes(term)
      );
    }

    return products.sort((a, b) => a.sortOrder - b.sortOrder);
  }
});

export const bySlug = query({
  args: {
    slug: v.string()
  },
  handler: async (ctx, args) => {
    const product = await ctx.db
      .query("products")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();

    return product?.active ? product : null;
  }
});

export const bySlugs = query({
  args: {
    slugs: v.array(v.string())
  },
  handler: async (ctx, args) => {
    const products = await Promise.all(
      args.slugs.map((slug) =>
        ctx.db
          .query("products")
          .withIndex("by_slug", (q) => q.eq("slug", slug))
          .first()
      )
    );

    return products.filter((product) => product?.active);
  }
});

export const upsertMany = mutation({
  args: {
    products: v.array(productInput)
  },
  handler: async (ctx, args) => {
    const now = Date.now();

    for (const product of args.products) {
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

    return args.products.length;
  }
});
