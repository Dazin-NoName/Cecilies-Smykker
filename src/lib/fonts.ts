import { Geist, Geist_Mono, Life_Savers, Story_Script } from "next/font/google";

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

export const storyScript = Story_Script({
  variable: "--font-story-script",
  subsets: ["latin"],
  weight: "400",
  adjustFontFallback: false
});

export const lifeSavers = Life_Savers({
  variable: "--font-life-savers",
  subsets: ["latin"],
  weight: ["400", "700"]
});
