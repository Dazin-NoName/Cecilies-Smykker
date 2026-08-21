import Link from "next/link";

export default function SuccessPage() {
  return (
    <main className="section">
      <div className="container max-w-xl">
        <p className="eyebrow">Betaling gennemført</p>
        <h1 className="mt-2 text-4xl font-semibold leading-tight md:text-5xl">Tak for din ordre</h1>
        <p className="mt-4 text-[var(--muted)]">
          Stripe sender kunden tilbage hertil efter betaling. Webhooket kan markere GAT-ordren som betalt i Convex.
        </p>
        <Link className="button primary mt-8" href="/shop">Shop videre</Link>
      </div>
    </main>
  );
}
