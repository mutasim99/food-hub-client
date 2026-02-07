"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

export default function MealFilter({
  categories,
}: {
  categories: { id: string; name: string }[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [categoryId, setCategoryId] = useState<string>(
    searchParams.get("categoryId") || ""
  );

  const [minPrice, setMinPrice] = useState<string>(
    searchParams.get("minPrice") || ""
  );
  const [maxPrice, setMaxPrice] = useState<string>(
    searchParams.get("maxPrice") || ""
  );

  const filter = () => {
    const params = new URLSearchParams();
    if (categoryId) {
      params.set("categoryId", categoryId);
    }
    if (minPrice) {
      params.set("minPrice", minPrice);
    }
    if (maxPrice) {
      params.set("maxPrice", maxPrice);
    }

    router.push(`/meals?${params.toString()}`);
  };

  const resetFilter = () => {
    setCategoryId("");
    setMinPrice("");
    setMaxPrice("");
    router.push("/meals");
  };
  return (
    <div className="p-4 rounded-xl mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
      <select
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
        className="p-2 border-2 rounded-xl dark:bg-zinc-800"
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Min price"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        className="p-2 border-2 rounded-xl"
      />
      <input
        type="number"
        placeholder="Max price"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        className="p-2 border-2 rounded-xl"
      />

      <div className="flex gap-2">
        <button
          onClick={filter}
          className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition"
        >
          Apply
        </button>
        <button
          onClick={resetFilter}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
