import { getCart } from "@/actions/cart.action";
import CheckoutForm from "@/components/modules/order/CheckoutForm";
import Link from "next/link";

export default async function CheckoutPage() {
  const cart = await getCart();
  const items = cart?.data?.items || [];

  if (!items.length) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10 text-center space-y-4">
        <h1 className="text-2xl font-bold">Checkout</h1>
        <p>Your cart is empty.</p>
        <Link href="/meals" className="text-orange-500 font-semibold">
          Browse meals
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      <CheckoutForm items={items} />
    </div>
  );
}
