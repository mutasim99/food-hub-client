"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import {
  MapPin,
  Utensils,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Star,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface Restaurant {
  id: string;
  name: string;
  address: string;
  image: string;
  totalMeal: number;
}

export default function FeaturedRestaurantCard({
  providers = [],
}: {
  providers: Restaurant[];
}) {
  if (!providers || providers.length === 0) return null;

  return (
    <section className="py-24 bg-white dark:bg-[#050505] transition-colors duration-500 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* --- CENTERED HEADER SECTION --- */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 mb-4">
            <Star size={14} className="text-orange-500 fill-orange-500" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-orange-600 dark:text-orange-500">
              Top Rated Partners
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white tracking-tight">
            Featured <span className="text-orange-500">Kitchens</span>
          </h2>
          
          <p className="max-w-2xl text-zinc-500 dark:text-zinc-400 mt-4 text-sm md:text-base leading-relaxed">
            Experience the finest culinary talents in your city, hand-picked
            for their quality, hygiene, and taste.
          </p>

          {/* Navigation Buttons (Centered below text) */}
          <div className="flex gap-3 mt-8">
            <button className="rs-prev h-11 w-11 rounded-full border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-400 hover:bg-orange-500 hover:border-orange-500 hover:text-white transition-all duration-300 shadow-sm">
              <ChevronLeft size={20} />
            </button>
            <button className="rs-next h-11 w-11 rounded-full border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-400 hover:bg-orange-500 hover:border-orange-500 hover:text-white transition-all duration-300 shadow-sm">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <Swiper
          slidesPerView={1}
          spaceBetween={24}
          loop={true}
          navigation={{
            prevEl: ".rs-prev",
            nextEl: ".rs-next",
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          modules={[Pagination, Autoplay, Navigation]}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          className="featured-swiper pb-16! 
            [&_.swiper-pagination-bullet]:bg-zinc-300 
            dark:[&_.swiper-pagination-bullet]:bg-zinc-700 
            [&_.swiper-pagination-bullet]:opacity-100
            [&_.swiper-pagination-bullet-active]:bg-orange-500 
            [&_.swiper-pagination-bullet-active]:w-6 
            [&_.swiper-pagination-bullet-active]:rounded-full transition-all"
        >
          {providers.map((p) => (
            <SwiperSlide key={p.id}>
              <div className="group relative bg-zinc-50 dark:bg-zinc-900/40 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800/50 p-3 
                /* Improved Hover Effects */
                hover:border-orange-500/50 dark:hover:border-orange-500/40 
                hover:bg-white dark:hover:bg-zinc-900/80
                hover:shadow-xl hover:shadow-orange-500/5
                transition-all duration-500 overflow-hidden">
                
                <div className="relative h-60 w-full rounded-[2rem] overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  <div className="absolute inset-x-3 bottom-3 bg-white/80 dark:bg-black/60 backdrop-blur-md border border-white/20 dark:border-white/10 p-4 rounded-2xl shadow-lg">
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-white group-hover:text-orange-500 transition-colors truncate">
                      {p.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-300 mt-0.5">
                      <MapPin size={12} className="text-orange-500 shrink-0" />
                      <span className="text-[11px] font-medium truncate">
                        {p.address}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="px-4 pt-5 pb-2">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="h-8 w-8 rounded-lg bg-orange-500/10 flex items-center justify-center">
                      <Utensils size={14} className="text-orange-500" />
                    </div>
                    <span className="text-xs font-bold tracking-wide uppercase text-zinc-500 dark:text-zinc-400">
                      {p.totalMeal} Signature Meals
                    </span>
                  </div>

                  <Link
                    href={`/providers/${p.id}`}
                    className="flex items-center justify-center gap-2 w-full h-12 bg-white dark:bg-zinc-800 text-black dark:text-white font-bold rounded-xl border border-zinc-200 dark:border-zinc-700 transition-all hover:bg-orange-500 hover:text-white dark:hover:bg-orange-500 dark:hover:border-orange-500 group/btn shadow-sm"
                  >
                    View Menu
                    <ArrowRight
                      size={18}
                      className="transition-transform group-hover/btn:translate-x-1"
                    />
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}