"use client";
import Image from "next/image";
import { useState } from "react";
import { Button } from "./button";
import OrderModal from "../modules/order/OrderModal";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { addToCart } from "@/actions/cart.action";
interface Meal {
  id: string;
  name: string;
  price: number;
  image: string;
  provider: {
    shopName: string;
  };
}
export default function PopularMealCard({ meals }: { meals: Meal[] }) {
  const session = authClient.useSession();

  const [open, setOpen] = useState(false);
  const [selectMeal, setSelectMeal] = useState<{
    id: string;
    name: string;
  } | null>(null);
  return (
    <div className="px-6 md:px-16 py-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white">
          Popular <span className="text-orange-500">Meals</span>
        </h2>
        <p className="text-gra-400">People are ordering these right now 🔥</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {meals.map((meal) => (
          <div
            key={meal.id}
            className="bg-zinc-900 rounded-xl overflow-hidden shadow-lg hover:shadow-orange-500/20 transition"
          >
            <div className="relative h-48">
              <Image
                src={meal.image}
                alt={meal.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4 space-y-2">
              <h2 className="text-lg font-semibold text-white">{meal.name}</h2>
              <p className="text-sm text-gray-400">
                by {meal.provider.shopName}
              </p>
              <div className="flex items-center justify-between pt-3">
                <span>${meal.price}</span>
                <div className="flex gap-4">
                <Button
                  className="bg-orange-500 hover:bg-orange-600 cursor-pointer"
                  onClick={() => {
                    if (!session.data?.user) {
                      return toast.error("Please logIn to order food");
                    }
                    setSelectMeal({ id: meal.id, name: meal.name });
                    setOpen(true);
                  }}
                >
                  Order
                </Button>
                <Button 
                className="bg-orange-500 hover:bg-orange-600 cursor-pointer"
                onClick={async()=>{
                  
                  try {
                    const res = await addToCart(meal.id, 1)
                    toast.success("Add to the cart🛒")
                  } catch (e:any) {
                    toast.error(e.message)
                  }
                }}
                >
                  Add to cart
                </Button>
                </div>
                <OrderModal
                  open={open}
                  onClose={() => setOpen(false)}
                  meal={selectMeal}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
