import { getMealsById } from "@/actions/public.action";
import { ChevronLeft, Clock, MapPin, ShoppingBag, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function MealDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const meal = await getMealsById(id);

  return (
    <div className="min-h-screen dark:bg-black dark:text-zinc-100 pb-20">
      <nav className="max-w-7xl mx-auto p-6">
        <Link
          href="/meals"
          className="inline-flex items-center text-zinc-400 hover:text-orange-500 transition-colors gap-2 group"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Menu
        </Link>
      </nav>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="relative aspect-square md:aspect-video lg:aspect-square w-full overflow-hidden rounded-3xl border border-zinc-800 shadow-2xl lg:sticky lg:top-8">
            <Image
              src={meal.image}
              alt={meal.name}
              fill
              priority
              className="object-cover hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute top-4 left-4">
              <span className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium border border-white/10">
                ⭐4.8 (95+ Reviews)
              </span>
            </div>
          </div>
          <div className="flex flex-col space-y-8">
            <header className="space-y-4">
              <div className="flex items-center gap-2 text-orange-500 font-medium tracking-wide uppercase text-xs">
                <MapPin className="w-3 h-3" /> {meal.provider.shopName}
              </div>
              <h1 className="text-4xl md:text-5xl dark:text-zinc-400 font-extrabold tracking-tight  leading-tight">
                {meal.name}
              </h1>
              <div className="flex items-center gap-6 text-zinc-400 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-orange-500" />
                  <span>15-25 min</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-orange-500 fill-orange-500" />{" "}
                  <span className="text-zinc-200 font-semibold">
                    Popular Choice
                  </span>
                </div>
              </div>
            </header>
            <div className="h-px bg-zinc-800 w-full">
              <section className="space-y-4">
                <h3 className="text-lg font-semibold text-white">
                  About this meal
                </h3>
                <p className="text-zinc-400 leading-relaxed">
                  Experience the authentic flavors of {meal.provider.shopName}.
                  Crafted with fresh ingredients and traditional techniques,
                  this dish offers a perfect balance of texture and taste.
                </p>
              </section>
              <section className="bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800 flex items-center justify-between">
                <div>
                  <p className="text-zinc-500 text-sm uppercase font-semibold tracking-widest">
                    Price
                  </p>
                  <p className="text-3xl font-bold text-white">
                    ৳{meal.price.toFixed(2)}
                  </p>
                </div>
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-bold flex items-center gap-3 transition-all active:scale-110 shadow-lg shadow-orange-500/20 hover:cursor-pointer">
                  <ShoppingBag className="w-5 h-5" /> Order Now
                </button>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
