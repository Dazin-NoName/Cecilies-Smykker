import type { Metadata } from "next";
import { lifeSavers, storyScript } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Kontakt Cecilies Smykker",
  description:
    "Kontakt Cecilies Smykker på mail eller TikTok, hvis du har spørgsmål til smykker, levering eller ordrer.",
  alternates: {
    canonical: "/about"
  }
};

export default function AboutPage() {
  const contactJsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Kontakt Cecilies Smykker",
    url: "https://cecilies-smykker.dk/about",
    mainEntity: {
      "@type": "Organization",
      "@id": "https://cecilies-smykker.dk/#organization",
      name: "Cecilies Smykker",
      email: "ceciliessmykker@gmail.com",
      sameAs: ["https://www.tiktok.com/@cecilies.smykker06"]
    }
  };

  return (
    <main className="section">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      <div className="container grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:gap-10">
        <div>
          <p className={`${lifeSavers.className} text-base font-normal text-[#ce9494]`}>Kontakt os</p>
          <h1 className={`${storyScript.className} mt-2 text-5xl leading-tight text-[#ca9e4b] md:text-6xl`}>Skriv til Cecilie</h1>
        </div>
        <div className="grid gap-6 text-base leading-8 text-[var(--muted)]">
          <p>
            Har du spørgsmål til smykker, levering eller en ordre, så skriv til os på mail eller TikTok.
          </p>
          <p className="break-words">
            Email: <a className="text-[var(--foreground)] underline underline-offset-4" href="mailto:ceciliessmykker@gmail.com">ceciliessmykker@gmail.com</a>
            <br />
            TikTok: <a className="text-[var(--foreground)] underline underline-offset-4" href="https://www.tiktok.com/@cecilies.smykker06">@cecilies.smykker06</a>
          </p>
        </div>
      </div>
    </main>
  );
}
