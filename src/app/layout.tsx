import type { Metadata } from "next";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { geistMono, geistSans, lifeSavers, storyScript } from "@/lib/fonts";

export const metadata: Metadata = {
  metadataBase: new URL("https://cecilies-smykker.dk"),
  applicationName: "Cecilies Smykker",
  title: {
    default: "Cecilies Smykker | Smykker, armbånd og halskæder online",
    template: "%s | Cecilies Smykker"
  },
  description:
    "Cecilies Smykker er en dansk webshop med kuraterede smykker, armbånd, halskæder og ringe inspireret af populære designerklassikere. Shop online med hurtig checkout.",
  keywords: [
    "Cecilies Smykker",
    "cecilies smykker",
    "smykker",
    "dansk smykkeshop",
    "armbånd",
    "halskæder",
    "ringe",
    "Van Cleef smykker",
    "Cartier smykker"
  ],
  authors: [{ name: "Cecilies Smykker" }],
  creator: "Cecilies Smykker",
  publisher: "Cecilies Smykker",
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
    icon: "/favicon-round.png?v=2",
    shortcut: "/favicon-round.png?v=2",
    apple: "/favicon-round.png?v=2"
  },
  openGraph: {
    title: "Cecilies Smykker",
    description:
      "Dansk webshop med kuraterede smykker, armbånd, halskæder og ringe. Shop Cecilies Smykker online.",
    url: "https://cecilies-smykker.dk",
    siteName: "Cecilies Smykker",
    locale: "da_DK",
    type: "website",
    images: [
      {
        url: "/logo-small-round.png",
        width: 512,
        height: 512,
        alt: "Cecilies Smykker logo"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Cecilies Smykker",
    description: "Dansk webshop med kuraterede smykker, armbånd, halskæder og ringe.",
    images: ["/logo-small-round.png"]
  }
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://cecilies-smykker.dk/#organization",
      name: "Cecilies Smykker",
      url: "https://cecilies-smykker.dk",
      logo: "https://cecilies-smykker.dk/logo-small-round.png",
      email: "ceciliessmykker@gmail.com",
      sameAs: ["https://www.tiktok.com/@cecilies.smykker06"]
    },
    {
      "@type": "WebSite",
      "@id": "https://cecilies-smykker.dk/#website",
      name: "Cecilies Smykker",
      alternateName: "cecilies smykker",
      url: "https://cecilies-smykker.dk",
      publisher: {
        "@id": "https://cecilies-smykker.dk/#organization"
      },
      inLanguage: "da-DK",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://cecilies-smykker.dk/shop?q={search_term_string}",
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
      </body>
    </html>
  );
}
