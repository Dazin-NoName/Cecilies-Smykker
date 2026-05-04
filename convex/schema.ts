import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  products: defineTable({
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
    sortOrder: v.number(),
    createdAt: v.number(),
    updatedAt: v.number()
  })
    .index("by_slug", ["slug"])
    .index("by_collection", ["collection"])
    .index("by_featured", ["featured"]),
  orders: defineTable({
    stripeSessionId: v.string(),
    email: v.optional(v.string()),
    amountTotal: v.optional(v.number()),
    currency: v.optional(v.string()),
    status: v.union(v.literal("pending"), v.literal("paid"), v.literal("cancelled")),
    createdAt: v.number()
  }).index("by_stripe_session", ["stripeSessionId"])
});
