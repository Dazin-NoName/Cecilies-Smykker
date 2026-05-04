import { CartView } from "@/components/cart-view";
import { storyScript } from "@/lib/fonts";

export default function CartPage() {
  return (
    <main className="section">
      <div className="container">
        <p className="eyebrow">Kurv</p>
        <h1 className={`${storyScript.className} mt-2 text-5xl leading-tight text-[#ca9e4b] md:text-6xl`}>Din kurv</h1>
        <div className="mt-8">
          <CartView />
        </div>
      </div>
    </main>
  );
}
