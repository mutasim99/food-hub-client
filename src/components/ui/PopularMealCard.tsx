"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./button";
import { toast } from "sonner";
import { addToCart } from "@/actions/cart.action";
import OrderButton from "../modules/order/OrderButton";
import { ShoppingCart } from "lucide-react";

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
  return (
    <div className="px-6 md:px-16 py-20 bg-[#0a0a0a]">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white">
          Popular <span className="text-orange-500">Meals</span>
        </h2>
        <p className="text-gray-400 mt-2">
          People are ordering these right now 🔥
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {meals.map((meal) => (
          <div
            key={meal.id}
            className="group bg-[#141414] rounded-2xl overflow-hidden border border-zinc-800 hover:border-orange-500/50 transition-all duration-300"
          >
            
            <Link href={`/meals/${meal.id}`} className="cursor-pointer">
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={meal.image}
                  alt={meal.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold text-white group-hover:text-orange-500 transition-colors">
                  {meal.name}
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  by {meal.provider.shopName}
                </p>
              </div>
            </Link>

            
            <div className="p-5 pt-0">
              <div className="flex items-center justify-between gap-3">
                <span className="text-xl font-bold text-white">
                  ${meal.price}
                </span>
                <div className="flex gap-2 flex-1">
                  <OrderButton meal={meal} />
                  <Button
                    size="sm"
                    className="bg-orange-600 hover:bg-orange-700 text-white flex-1 h-10"
                    onClick={async (e) => {
                      e.preventDefault(); 
                      try {
                        await addToCart(meal.id, 1);
                        toast.success("Added to cart 🛒");
                      } catch (e: any) {
                        toast.error(e.message);
                      }
                    }}
                  >
                    Add to cart
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
