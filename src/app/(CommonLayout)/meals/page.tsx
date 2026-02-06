import { getCategory } from "@/actions/category.action";
import { getMeals } from "@/actions/public.action";
import MealCard from "@/components/public/MealCard";
import { Button } from "@/components/ui/button";
import { UtensilsCrossed } from "lucide-react";
import React from "react";

export default async function MenuPage({ searchParams }: any) {
  const res = await getCategory();
  const categories = res.data.data || [];

  const meals = await getMeals(searchParams);

  return (
    <div className="min-h-screen bg-[#050505] relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-orange-500 font-medium text-sm transform-content uppercase">
              <UtensilsCrossed size={16} />
              <span>Premium Selection</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              Delicious <span className="text-orange-500">Meals</span>
            </h1>
            <p className="text-zinc-400 max-w-md">
              Discover Delicious Meals from to-rated local kitchens, prepared
              fresh and delivered to your home
            </p>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {categories.map((cat: any) => (
              <button
                key={cat.id}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                  cat.name === "Burger"
                    ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20"
                    : "bg-zinc-900 text-zinc-400 border border-zinc-800 hover:border-zinc-600"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
        {meals.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {meals.map((meal: any) => (
              <div
                key={meal.id}
                className="animate-in fade-in slide-in-from-bottom-5 duration-700"
              >
                <MealCard meal={meal} />
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center border border-dashed border-zinc-800 rounded-3xl">
            <p className="text-zinc-500">No Meals Fount in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
