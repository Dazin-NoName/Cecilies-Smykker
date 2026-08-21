import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Admin",
  robots: {
    index: false,
    follow: false
  }
};

export default function AdminLoginPage() {
  return (
    <main className="section">
      <div className="container max-w-md">
        <p className="eyebrow">Admin</p>
        <h1 className="mt-2 text-4xl font-semibold leading-tight md:text-5xl">Log ind</h1>
        <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
          Denne side er kun til 1989 SKO admin. Kunder skal bruge shop og kurv uden login.
        </p>
        <Link className="button primary mt-8 w-full justify-center" href="/api/auth/signin/github?callbackUrl=/admin">
          Fortsæt med GitHub
        </Link>
      </div>
    </main>
  );
}
