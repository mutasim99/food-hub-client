"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "./button";
import { toast } from "sonner";
import { addToCart } from "@/actions/cart.action";
import OrderButton from "../modules/order/OrderButton";
import { ShoppingCart, Star, Clock, Flame, ShieldCheck } from "lucide-react";

interface Meal {
  id: string;
  name: string;
  price: number;
  image: string;
  provider: {
    shopName: string;
  };
}

export default function PopularMealCard({ meals = [] }: { meals: Meal[] }) {
  return (
    <section className="px-6 md:px-12 py-24 bg-white dark:bg-[#050505] transition-colors duration-500 relative">
      <div className="max-w-7xl mx-auto mb-16">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 shadow-sm">
            <Flame size={16} className="text-orange-500 animate-pulse" />
            <span className="text-[11px] font-black uppercase tracking-widest text-orange-600 dark:text-orange-400">
              Community Favorites
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-zinc-900 dark:text-white tracking-tighter italic">
            POPULAR <span className="text-orange-500 not-italic">MEALS</span>
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 max-w-2xl text-base md:text-lg">
            Join the obsession. These are the top-rated dishes being delivered
            to your doorstep right now.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {meals.map((meal) => (
          <div
            key={meal.id}
            className="group bg-white dark:bg-zinc-900/40 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800/50 p-3 hover:border-orange-500/40 transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(249,115,22,0.15)]"
          >
            <div className="relative h-64 w-full rounded-[2rem] overflow-hidden mb-6">
              <Link href={`/meals/${meal.id}`} className="block h-full">
                <Image
                  src={meal.image}
                  alt={meal.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />

                <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-black/40 backdrop-blur-xl px-3 py-1.5 rounded-full border border-white/20 text-white text-[11px] font-bold">
                  <Star size={12} className="text-orange-400 fill-orange-400" />
                  4.8
                </div>
              </Link>

              <div className="absolute bottom-4 right-4 bg-orange-500 text-white px-5 py-2 rounded-2xl font-black text-sm shadow-xl transform group-hover:scale-110 transition-transform">
                Tk {meal.price}
              </div>
            </div>

            <div className="px-3 pb-4">
              <div className="flex justify-between items-start mb-3">
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-orange-500 transition-colors line-clamp-1">
                    {meal.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400">
                    <ShieldCheck size={14} className="text-orange-500" />
                    <span className="text-xs font-medium">
                      {meal.provider.shopName}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-zinc-400 dark:text-zinc-500 text-[11px] font-bold py-4 border-t border-zinc-100 dark:border-zinc-800/60 mt-4 mb-6">
                <div className="flex items-center gap-1.5">
                  <Clock size={14} className="text-zinc-400" /> 20-30 MIN
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-200 dark:bg-zinc-800" />
                <div className="tracking-widest uppercase">Fast Delivery</div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <OrderButton meal={meal} />
                </div>
                <Button
                  size="icon"
                  className="h-6 w-8 rounded-2xl bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-300 hover:bg-orange-500 hover:text-white border-none shadow-none transition-all duration-300"
                  onClick={async (e) => {
                    e.preventDefault();
                    try {
                      await addToCart(meal.id, 1);
                      toast.success("Added to your basket!");
                    } catch (err: any) {
                      toast.error(err.message);
                    }
                  }}
                >
                  <ShoppingCart size={20} strokeWidth={2.5} />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
