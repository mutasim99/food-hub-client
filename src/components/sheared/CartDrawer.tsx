"use client";
import { getCart, removeFromCart } from "@/actions/cart.action";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { X } from "lucide-react";

export default function CartDrawer({ open, onClose }: any) {
  const [cart, setCart] = useState<any[]>([]);
  useEffect(() => {
    if (!open) return;
    getCart()
      .then((res) => setCart(res.data?.items || []))
      .catch(() => setCart([]));
  }, [open]);

  const total = cart.reduce((sum, item) => sum + item.qty * item.price, 0);
  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      )}
      <div
        className={`fixed top-0 right-0 w-96  bg-zinc-900 p-5 z-50 transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <h2 className="text-xl font-bold mb-4">Your Cart</h2>
        {cart.map((item) => (
          <div key={item.id} className="flex gap-3 mb-4">
            <Image
              src={item.meal.image}
              width={60}
              height={60}
              alt="image"
              className="rounded"
            />
            <div className="flex-1">
              <p>{item.meal.name}</p>
              <p>
                {item.qty} x {item.meal.price}
              </p>
            </div>
            <div>
              <button
                onClick={async () => {
                  const res = await removeFromCart(item.id);
                  window.location.reload();
                }}
                className="text-red-500 hover:text-red-700 cursor-pointer"
              >
                <X />
              </button>
            </div>
          </div>
        ))}
        <div className="mt-4 border-t-2 pt-4">
          <p className="text-white font-semibold">Total:${total}</p>
        </div>
        <Button className="w-full mt-6 bg-orange-500">checkout</Button>
      </div>
    </>
  );
}
