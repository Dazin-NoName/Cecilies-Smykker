import Link from "next/link";
import { storyScript } from "@/lib/fonts";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--line)] bg-[#151310] py-10 text-[#ffebeb] md:py-12">
      <div className="container grid gap-7 md:grid-cols-[1.5fr_1fr_1fr] md:gap-8">
        <div>
          <p className={`${storyScript.className} text-3xl text-[#ffebeb]`}>Cecilies Smykker</p>
          <p className="mt-3 max-w-sm text-sm leading-6 text-[#ffebeb]">
            Kuraterede smykker med hurtigt checkout-flow, tydelig produktfortælling og et brandunivers bygget til social trafik.
          </p>
        </div>
        <div className="grid gap-2 text-sm text-[#ffebeb]">
          <Link href="/shop">Shop alle</Link>
        </div>
        <div className="break-words text-sm text-[#ffebeb]">
          <p>ceciliessmykker@gmail.com</p>
        </div>
      </div>
    </footer>
  );
}
