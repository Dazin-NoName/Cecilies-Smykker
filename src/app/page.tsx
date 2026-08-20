import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Site offline",
  description: "This site has been taken down.",
  robots: {
    index: false,
    follow: false
  }
};

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 text-center">
      <h1 className="text-2xl font-semibold">This site has been taken down.</h1>
    </main>
  );
}
