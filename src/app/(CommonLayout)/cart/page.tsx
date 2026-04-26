import { getCart } from "@/actions/cart.action";
import Image from "next/image";
import Link from "next/link";

export default async function CartPage() {
  const cart = await getCart();
  const items = cart?.data?.items || [];
  const total = items.reduce(
    (sum: number, item: any) => sum + item.qty * (item.meal?.price ?? 0),
    0
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">My Cart</h1>

      {!items.length ? (
        <div className="border rounded-xl p-8 text-center space-y-4">
          <p>Your cart is empty.</p>
          <Link className="text-orange-500 font-semibold" href="/meals">
            Browse meals
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item: any) => (
            <div
              key={item.id}
              className="border rounded-xl p-4 flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <Image
                  src={item.meal.image}
                  alt={item.meal.name}
                  width={64}
                  height={64}
                  className="rounded-lg object-cover"
                />
                <div>
                  <p className="font-semibold">{item.meal.name}</p>
                  <p className="text-sm text-gray-500">
                    Tk {item.meal.price} x {item.qty}
                  </p>
                </div>
              </div>
              <p className="font-semibold">
                Tk {(item.meal.price * item.qty).toFixed(2)}
              </p>
            </div>
          ))}

          <div className="border-t pt-4 flex items-center justify-between">
            <p className="text-lg font-semibold">Total</p>
            <p className="text-lg font-bold">Tk {total.toFixed(2)}</p>
          </div>

          <div className="flex justify-end">
            <Link
              href="/checkout"
              className="bg-orange-500 text-white px-5 py-2 rounded-lg font-semibold"
            >
              Continue to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
