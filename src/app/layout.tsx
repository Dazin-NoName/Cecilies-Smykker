import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { geistMono, geistSans, lifeSavers, storyScript } from "@/lib/fonts";

export const metadata: Metadata = {
  metadataBase: new URL("https://cecilies-smykker.dk"),
  applicationName: "Cecilies Smykker",
  title: "Site offline",
  description: "This site has been taken down.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true
    }
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
        {children}
        <Analytics />
      </body>
    </html>
  );
}
