import { NextResponse } from "next/server";
import { getProductsBySlugs } from "@/lib/products";
import { getStripe } from "@/lib/stripe";

type CheckoutLine = {
  slug?: string;
  variant?: string;
  quantity: number;
};

function stripeMetadataValue(value: string) {
  return value.slice(0, 500);
}

export async function POST(request: Request) {
  try {
    const { items } = (await request.json()) as { items?: CheckoutLine[] };
    const validItems = items?.filter((item) => item.slug && item.quantity > 0) ?? [];

    if (validItems.length === 0) {
      return NextResponse.json({ error: "Kurven er tom." }, { status: 400 });
    }

    const products = await getProductsBySlugs([...new Set(validItems.map((item) => item.slug!))]);
    const productBySlug = new Map(products.map((product) => [product.slug, product]));
    const orderNotes: string[] = [];

    const lineItems = validItems.map((item) => {
      const product = productBySlug.get(item.slug!);
      const variant = item.variant?.trim() || "Ingen variant";

      if (!product) {
        throw new Error(`Produktet ${item.slug} findes ikke længere.`);
      }

      if (product.price <= 0) {
        throw new Error(`${product.name} mangler pris og kan ikke købes endnu.`);
      }

      orderNotes.push(`${item.quantity} x ${product.name} | Valg: ${variant}`);

      const stripeImages = product.image.startsWith("https://") ? [product.image] : [];

      return {
        price_data: {
          currency: product.currency,
          product_data: {
            name: `${product.name} - ${variant}`,
            description: `Valg: ${variant}. ${product.description}`,
            images: stripeImages,
            metadata: {
              product_slug: product.slug,
              product_name: product.name,
              product_variant: variant
            }
          },
          unit_amount: product.price
        },
        quantity: item.quantity
      };
    });

    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? new URL(request.url).origin;
    const fulfillmentNote = stripeMetadataValue(orderNotes.join(" | "));
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      metadata: {
        slugs: validItems.map((item) => item.slug).join(", "),
        variants: validItems.map((item) => item.variant).filter(Boolean).join(", "),
        fulfillment_note: fulfillmentNote
      },
      payment_intent_data: {
        description: fulfillmentNote,
        metadata: {
          fulfillment_note: fulfillmentNote,
          product_choices: fulfillmentNote
        }
      },
      success_url: `${appUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/cancel`,
      shipping_address_collection: {
        allowed_countries: ["DK", "SE", "NO", "DE"]
      },
      allow_promotion_codes: true
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Checkout fejlede.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
