import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { geistMono, geistSans, lifeSavers, storyScript } from "@/lib/fonts";

const siteUrl = "https://1989sko.dk";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "1989 SKO",
  title: {
    default: "1989 SKO | Maison Margiela GATs i Danmark",
    template: "%s | 1989 SKO"
  },
  description:
    "1989 SKO er en dansk prototype-shop kun til Maison Margiela GAT sneakers med størrelser, kurv og checkout-flow.",
  keywords: [
    "1989 SKO",
    "Maison Margiela GAT",
    "Maison Margiela Replica",
    "GAT sneakers",
    "German Army Trainer",
    "Maison Margiela sneakers Danmark",
    "designer sneakers"
  ],
  authors: [{ name: "1989 SKO" }],
  creator: "1989 SKO",
  publisher: "1989 SKO",
  category: "Footwear",
  manifest: "/manifest.webmanifest",
  alternates: {
    canonical: "/"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  icons: {
    icon: [{ url: "/logo-1989-sko.png", sizes: "1024x1024", type: "image/png" }],
    shortcut: "/logo-1989-sko.png",
    apple: "/logo-1989-sko.png"
  },
  openGraph: {
    title: "1989 SKO | Maison Margiela GATs i Danmark",
    description: "Dansk prototype-shop kun til Maison Margiela GAT sneakers.",
    url: siteUrl,
    siteName: "1989 SKO",
    locale: "da_DK",
    type: "website",
    images: [
      {
        url: "/logo-1989-sko.png",
        width: 1024,
        height: 1024,
        alt: "1989 SKO logo"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "1989 SKO | Maison Margiela GATs",
    description: "Dansk prototype-shop kun til Maison Margiela GAT sneakers.",
    images: ["/logo-1989-sko.png"]
  }
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "1989 SKO",
      url: siteUrl,
      logo: `${siteUrl}/logo-1989-sko.png`,
      image: `${siteUrl}/logo-1989-sko.png`,
      email: "kontakt@1989sko.dk"
    },
    {
      "@type": "OnlineStore",
      "@id": `${siteUrl}/#store`,
      name: "1989 SKO",
      url: siteUrl,
      image: `${siteUrl}/logo-1989-sko.png`,
      logo: `${siteUrl}/logo-1989-sko.png`,
      email: "kontakt@1989sko.dk",
      areaServed: "DK",
      priceRange: "DKK",
      parentOrganization: {
        "@id": `${siteUrl}/#organization`
      }
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: "1989 SKO",
      url: siteUrl,
      publisher: {
        "@id": `${siteUrl}/#organization`
      },
      inLanguage: "da-DK",
      potentialAction: {
        "@type": "SearchAction",
        target: `${siteUrl}/shop?q={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    }
  ]
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="da"
      className={`${geistSans.variable} ${geistMono.variable} ${storyScript.variable} ${lifeSavers.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <SiteHeader />
        {children}
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}
