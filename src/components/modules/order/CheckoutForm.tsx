"use client";

import { createOrder } from "@/actions/order.action";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "sonner";

type CartItem = {
  id: string;
  qty: number;
  meal: {
    id: string;
    name: string;
    price: number;
  };
};

export default function CheckoutForm({ items }: { items: CartItem[] }) {
  const router = useRouter();
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.qty * item.meal.price, 0),
    [items]
  );

  const handleOrder = async () => {
    if (!address.trim() || address.trim().length < 10) {
      toast.error("Please enter a full delivery address.");
      return;
    }
    if (!items.length) {
      toast.error("Your cart is empty.");
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Placing your order...");
    try {
      const result = await createOrder({
        address: address.trim(),
        items: items.map((item) => ({
          mealId: item.meal.id,
          qty: item.qty,
        })),
      });

      if (result.error) {
        toast.error(
          typeof result.error === "string" ? result.error : "Failed to place order.",
          { id: toastId }
        );
        return;
      }

      toast.success("Order placed successfully.", { id: toastId });
      router.push("/orders");
      router.refresh();
    } catch (error) {
      toast.error("Failed to place order.", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="border rounded-xl p-4 space-y-2">
        <h2 className="text-lg font-semibold">Delivery Address</h2>
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full min-h-28 border rounded-lg p-3"
          placeholder="House, road, area, city"
        />
      </div>

      <div className="border rounded-xl p-4 space-y-2">
        <h2 className="text-lg font-semibold">Order Summary</h2>
        {items.map((item) => (
          <div key={item.id} className="flex justify-between text-sm">
            <p>
              {item.meal.name} x {item.qty}
            </p>
            <p>Tk {(item.meal.price * item.qty).toFixed(2)}</p>
          </div>
        ))}
        <div className="pt-3 border-t flex justify-between font-semibold">
          <p>Total</p>
          <p>Tk {total.toFixed(2)}</p>
        </div>
      </div>

      <button
        disabled={loading || !items.length}
        onClick={handleOrder}
        className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold disabled:opacity-60"
      >
        {loading ? "Placing Order..." : "Place Order (Cash on Delivery)"}
      </button>
    </div>
  );
}
