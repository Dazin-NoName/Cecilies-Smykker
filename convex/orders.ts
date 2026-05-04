import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const markPaid = mutation({
  args: {
    stripeSessionId: v.string(),
    email: v.optional(v.string()),
    amountTotal: v.optional(v.number()),
    currency: v.optional(v.string())
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("orders")
      .withIndex("by_stripe_session", (q) => q.eq("stripeSessionId", args.stripeSessionId))
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, {
        email: args.email,
        amountTotal: args.amountTotal,
        currency: args.currency,
        status: "paid"
      });
      return existing._id;
    }

    return await ctx.db.insert("orders", {
      stripeSessionId: args.stripeSessionId,
      email: args.email,
      amountTotal: args.amountTotal,
      currency: args.currency,
      status: "paid",
      createdAt: Date.now()
    });
  }
});
