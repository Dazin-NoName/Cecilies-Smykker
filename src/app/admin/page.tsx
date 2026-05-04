import Link from "next/link";
import { auth } from "@/lib/auth";
import { storyScript } from "@/lib/fonts";

export default async function AdminPage() {
  const session = await auth();

  return (
    <main className="section">
      <div className="container">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Admin</p>
            <h1 className={`${storyScript.className} mt-2 text-6xl leading-tight text-[#ca9e4b]`}>Produktstyring</h1>
          </div>
          <Link className="button secondary" href="/shop">Se shop</Link>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="border border-[var(--line)] bg-[var(--panel)] p-5">
            <p className="font-semibold">Loginstatus</p>
            <p className="mt-2 text-sm text-[var(--muted)]">{session?.user?.email ?? "Ikke logget ind"}</p>
          </div>
          <div className="border border-[var(--line)] bg-[var(--panel)] p-5">
            <p className="font-semibold">Convex</p>
            <p className="mt-2 text-sm text-[var(--muted)]">Schema og functions ligger klar i `convex/`.</p>
          </div>
          <div className="border border-[var(--line)] bg-[var(--panel)] p-5">
            <p className="font-semibold">Billeder</p>
            <p className="mt-2 text-sm text-[var(--muted)]">Upload endpointet `/api/images/upload` sender filer til imgbb.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
