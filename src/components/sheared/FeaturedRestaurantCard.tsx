"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import { Button } from "../ui/button";
interface Restaurant {
  id: string;
  name: string;
  address: string;
  image: string;
  totalMeal: number;
}
export default function FeaturedRestaurantCard({
  providers,
}: {
  providers: Restaurant[];
}) {
    
    
  return (
    <section className=" py-20 max-w-7xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-10 text-white">
        Featured Restaurants
      </h2>
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        modules={[Pagination, Autoplay]}
        breakpoints={{
          0: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
        className="mySwiper"
      >
        {providers.map((p) => (
          <SwiperSlide key={p.id}>
            <div className="bg-zinc-900 rounded-xl overflow-hidden shadow-lg">
              <div className="relative h-44">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-end">
                  <h3 className="text-xl font-semibold text-white p-4">
                    {p.name}
                  </h3>
                </div>
              </div>
              <div className="p-4 text-center">
                <p className="text-sm text-gray-400">{p.address}</p>
                <p className="text-orange-400 text-sm mt-1">
                  {p.totalMeal} meals
                </p>
                <Button className="w-full bg-orange-500 hover:bg-orange-600 mt-4">
                  View Menu
                </Button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
