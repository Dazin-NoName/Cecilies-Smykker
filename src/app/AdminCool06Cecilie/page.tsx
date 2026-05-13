import type { Metadata } from "next";
import Link from "next/link";
import { lifeSavers, storyScript } from "@/lib/fonts";

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
        <p className={`${lifeSavers.className} text-base font-normal text-[#ce9494]`}>Admin</p>
        <h1 className={`${storyScript.className} mt-2 text-5xl font-semibold italic leading-tight text-[#ca9e4b] md:text-6xl`}>Log ind</h1>
        <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
          Denne side er kun til Cecilie/admin. Kunder skal bruge shop og kurv uden login.
        </p>
        <Link className="button primary mt-8 w-full justify-center" href="/api/auth/signin/github?callbackUrl=/admin">
          Fortsæt med GitHub
        </Link>
      </div>
    </main>
  );
}
