import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--line)] bg-[var(--ink)] py-10 text-[#f7f5f0] md:py-12">
      <div className="container grid gap-7 md:grid-cols-[1.5fr_1fr_1fr] md:gap-8">
        <div>
          <p className="text-3xl font-semibold tracking-[0.08em]">1989 SKO</p>
          <p className="mt-3 max-w-sm text-sm leading-6 text-[#d8d2c7]">
            Dansk prototype-shop kun til Maison Margiela GATs, med søgning, kurv, checkout og produktstyring klar til test.
          </p>
        </div>
        <div className="grid gap-2 text-sm text-[#f7f5f0]">
          <Link href="/shop">Alle GATs</Link>
          <Link href="/cart">Kurv</Link>
          <Link href="/admin">Admin</Link>
        </div>
        <address className="break-words text-sm not-italic text-[#f7f5f0]">
          <a href="mailto:kontakt@1989sko.dk">kontakt@1989sko.dk</a>
          <br />
          København / online prototype
        </address>
      </div>
    </footer>
  );
}
