import Image from "next/image";
import React from "react";
import { Button } from "./button";
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
              <p className="text-sm text-gray-400">by {meal.provider.shopName}</p>
              <div className="flex items-center justify-between pt-3">
                <span>${meal.price}</span>
                <Button className="bg-orange-500 hover:bg-orange-600">
                  Order
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
