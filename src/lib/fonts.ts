import { Cormorant_Garamond, Geist, Geist_Mono, Life_Savers } from "next/font/google";

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

export const storyScript = Cormorant_Garamond({
  variable: "--font-story-script",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: "italic",
  adjustFontFallback: false
});

export const lifeSavers = Life_Savers({
  variable: "--font-life-savers",
  subsets: ["latin"],
  weight: ["400", "700"]
});
