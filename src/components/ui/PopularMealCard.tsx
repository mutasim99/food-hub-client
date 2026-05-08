"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "./button";
import { toast } from "sonner";
import { addToCart } from "@/actions/cart.action";
import OrderButton from "../modules/order/OrderButton";
import { ShoppingCart, Star, Clock, Flame } from "lucide-react";

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
    <section className="px-6 md:px-16 py-24 bg-[#050505] relative overflow-hidden">
    
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-orange-500/5 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 mb-4">
            <Flame size={14} className="text-orange-500" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-orange-500">
              Trending Now
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            Popular <span className="text-orange-500">Meals</span>
          </h2>
          <p className="text-zinc-500 mt-4 max-w-lg mx-auto text-sm md:text-base">
            Hand-picked delicacies that our community is obsessed with right
            now.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {meals.map((meal) => (
            <div
              key={meal.id}
              className="group relative bg-zinc-900/40 rounded-[2rem] border border-zinc-800/50 hover:border-orange-500/30 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(249,115,22,0.1)] overflow-hidden"
            >
              
              <Link
                href={`/meals/${meal.id}`}
                className="block relative h-64 overflow-hidden"
              >
                <Image
                  src={meal.image}
                  alt={meal.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-60" />

               
                <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
                  <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full border border-white/10 flex items-center gap-1">
                    <Star
                      size={10}
                      className="text-orange-500 fill-orange-500"
                    />{" "}
                    4.8
                  </span>
                  <span className="bg-orange-500 text-white text-[12px] font-black px-4 py-1 rounded-xl shadow-lg">
                    Tk {meal.price}
                  </span>
                </div>
              </Link>

             
              <div className="p-6">
                <div className="mb-4">
                  <Link href={`/meals/${meal.id}`}>
                    <h3 className="text-lg font-bold text-white group-hover:text-orange-500 transition-colors line-clamp-1">
                      {meal.name}
                    </h3>
                  </Link>
                  <p className="text-xs text-zinc-500 mt-1 flex items-center gap-1 italic">
                    by{" "}
                    <span className="text-zinc-300 not-italic font-medium">
                      {meal.provider.shopName}
                    </span>
                  </p>
                </div>


                <div className="flex items-center gap-4 text-zinc-500 text-[11px] font-medium border-y border-zinc-800/50 py-3 mb-6">
                  <div className="flex items-center gap-1.5">
                    <Clock size={13} className="text-orange-500/70" /> 25-35 min
                  </div>
                  <div className="h-1 w-1 rounded-full bg-zinc-700" />
                  <div>Free Delivery</div>
                </div>

              
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <OrderButton meal={meal} />
                  </div>
                  <Button
                    size="icon"
                    variant="outline"
                    className="shrink-0 h-11 w-11 rounded-xl border-zinc-800 bg-zinc-900/50 hover:bg-orange-500 hover:border-orange-500 text-zinc-400 hover:text-white transition-all duration-300"
                    onClick={async (e) => {
                      e.preventDefault();
                      try {
                        await addToCart(meal.id, 1);
                        toast.success("Added to cart 🛒");
                      } catch (err: any) {
                        toast.error(err.message);
                      }
                    }}
                  >
                    <ShoppingCart size={18} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
