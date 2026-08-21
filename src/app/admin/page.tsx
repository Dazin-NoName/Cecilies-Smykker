import Link from "next/link";
import { auth } from "@/lib/auth";

export default async function AdminPage() {
  const session = await auth();

  return (
    <main className="section">
      <div className="container">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Admin</p>
            <h1 className="mt-2 text-4xl font-semibold leading-tight md:text-5xl">Produktstyring</h1>
          </div>
          <Link className="button secondary" href="/shop">Se shop</Link>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="border border-[var(--line)] bg-[var(--panel)] p-5">
            <p className="font-semibold">Loginstatus</p>
            <p className="mt-2 text-sm text-[var(--muted)]">{session?.user?.email ?? "Ikke logget ind"}</p>
          </div>
          <div className="border border-[var(--line)] bg-[var(--panel)] p-5">
            <p className="font-semibold">Prototypekatalog</p>
            <p className="mt-2 text-sm text-[var(--muted)]">Shoppen kan køre lokalt på produktdata i `src/lib/products.ts`.</p>
          </div>
          <div className="border border-[var(--line)] bg-[var(--panel)] p-5">
            <p className="font-semibold">Convex og billeder</p>
            <p className="mt-2 text-sm text-[var(--muted)]">Convex seed og upload endpoint er stadig klar, hvis produkter senere skal styres live.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
