import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontakt 1989 SKO",
  description:
    "Kontakt 1989 SKO, hvis du har spørgsmål til Maison Margiela GATs, størrelser, levering eller prototypeordrer.",
  alternates: {
    canonical: "/about"
  }
};

export default function AboutPage() {
  const contactJsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Kontakt 1989 SKO",
    url: "https://1989sko.dk/about",
    mainEntity: {
      "@type": "Organization",
      "@id": "https://1989sko.dk/#organization",
      name: "1989 SKO",
      email: "kontakt@1989sko.dk"
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
          <p className="eyebrow">Kontakt</p>
          <h1 className="mt-2 text-4xl font-semibold leading-tight md:text-5xl">Skriv til 1989 SKO</h1>
        </div>
        <div className="grid gap-6 text-base leading-8 text-[var(--muted)]">
          <p>
            Har du spørgsmål til en Maison Margiela GAT model, størrelse, stand eller en ordre, så skriv til os.
            Siden er sat op som prototype, så kontaktdata kan nemt skiftes, når shoppen bliver rigtig.
          </p>
          <p className="break-words">
            Email: <a className="text-[var(--foreground)] underline underline-offset-4" href="mailto:kontakt@1989sko.dk">kontakt@1989sko.dk</a>
            <br />
            Lokation: København / online prototype
          </p>
        </div>
      </div>
    </main>
  );
}
