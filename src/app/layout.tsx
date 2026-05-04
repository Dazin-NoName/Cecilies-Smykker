import type { Metadata } from "next";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { geistMono, geistSans, lifeSavers, storyScript } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Cecilies Smykker",
  description: "Eksklusive smykker med direkte checkout og kuraterede kollektioner.",
  icons: {
    icon: "/favicon-round.png?v=2",
    shortcut: "/favicon-round.png?v=2",
    apple: "/favicon-round.png?v=2"
  },
  openGraph: {
    title: "Cecilies Smykker",
    description: "Guld, perler og signaturdesigns skabt til hverdage med kant.",
    type: "website"
  }
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
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
