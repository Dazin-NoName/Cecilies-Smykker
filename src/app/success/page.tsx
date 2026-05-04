import Link from "next/link";
import { storyScript } from "@/lib/fonts";

export default function SuccessPage() {
  return (
    <main className="section">
      <div className="container max-w-xl">
        <p className="eyebrow">Betaling gennemført</p>
        <h1 className={`${storyScript.className} mt-2 text-6xl leading-tight text-[#ca9e4b]`}>Tak for din ordre</h1>
        <p className="mt-4 text-[var(--muted)]">Stripe sender kunden tilbage hertil efter betaling. Webhooket er stedet, hvor ordren markeres som betalt i Convex.</p>
        <Link className="button primary mt-8" href="/shop">Shop videre</Link>
      </div>
    </main>
  );
}
