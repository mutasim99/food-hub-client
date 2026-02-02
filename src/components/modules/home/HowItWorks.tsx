import React from "react";

export default function HowItWorks() {
  return (
    <div className="py-20 bg-zinc-300 dark:bg-zinc-900 text-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-4">
          How <span className="text-orange-500">FoodHub</span> Works
        </h2>
        <p className="text-zinc-400 mb-12">Order Food in three Simple Steps</p>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="bg-zinc-900 p-8 rounded-xl hover:scale-105 transition">
            <div className="text-4xl mb-4">🛒</div>
            <h3 className="text-xl font-semibold mb-2">Choose Your Meal</h3>
            <p className="text-zinc-400">
              Browse meals from top restaurants near you
            </p>
          </div>
          <div className="bg-zinc-900 p-8 rounded-xl hover:scale-105 transition">
            <div className="text-4xl mb-4">📍</div>
            <h3 className="text-xl font-semibold mb-2">Track Your Order</h3>
            <p className="text-zinc-400">
              Live order tracking from Kitchen to doorstep
            </p>
          </div>
          <div className="bg-zinc-900 p-8 rounded-xl hover:scale-105 transition">
            <div className="text-4xl mb-4">🍽️</div>
            <h3 className="text-xl font-semibold mb-2">Enjoy your Food</h3>
            <p className="text-zinc-400">
              fresh, hot meals delivered to your home
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
