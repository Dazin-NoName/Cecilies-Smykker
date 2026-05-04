# Convex backend

Convex er source of truth for produktkataloget. Stripe bruges kun, når checkout-sessionen oprettes.

Klar til:

- `products`: produktkatalog, kollektioner, billeder, pris, varianter og beskrivelser.
- `orders`: Stripe Checkout sessioner og betalingsstatus.

Start Convex med:

```bash
npx convex dev
```

Seed produkterne efter Convex er konfigureret:

```bash
npx convex run seed:run
```

Sæt derefter `NEXT_PUBLIC_CONVEX_URL` i `.env.local` og på Vercel.
