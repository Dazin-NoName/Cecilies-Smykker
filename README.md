# Cecilies Smykker

En salgsklar Next.js-struktur til en smykkeshop med Convex, Stripe, NextAuth, Vercel og imgbb.

## Kom godt i gang

```bash
npm install
npm run dev
```

Kopier `.env.example` til `.env.local` og udfyld nøglerne, når integrationerne skal kobles rigtigt på.

## Struktur

- `src/app` - Next.js App Router routes og API endpoints
- `src/components` - genbrugelige UI-komponenter
- `src/lib` - produktdata, auth, Stripe, Convex og imgbb helpers
- `convex` - Convex schema og placeholder functions

## Næste naturlige trin

1. Opret Convex-projekt og kør `npx convex dev`.
2. Opret Stripe-produkter/priser og gem `priceId` på produkterne.
3. Vælg NextAuth providers og udfyld OAuth credentials.
4. Opret imgbb API key til produktbilleder i admin-flowet.
