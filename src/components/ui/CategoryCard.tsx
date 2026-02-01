import Image from "next/image";
import React from "react";

export default function CategoryCard({
  category,
}: {
  category: { id: string; name: string; image: string };
}) {

  return (
    <div className="group cursor-pointer rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition">
      <div className="relative h-40 w-full">
        <Image src={category.image} alt={category.name} fill/>
        <div className="absolute inset-0 bg-black/40 flex items-end">
          <h3 className="text-white text-lg font-semibold p-4">
            {category.name}
          </h3>
        </div>
      </div>
    </div>
  );
}
