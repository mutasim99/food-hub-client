import { getProvidersById } from "@/actions/public.action";
import MealCard from "@/components/public/MealCard";
import { ArrowLeft, Clock6, MapPin, Phone, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function RestaurantDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const provider = await getProvidersById(id);

  return (
    <div className="min-h-screen">
      <div className="relative h-[40vh] md:h-[50vh] w-full">
        <Image
          src={provider.image}
          alt={provider.shopName}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#050505]/40 via-[#050505] to-transparent" />
        <div className="absolute inset-0 bg-linear-to-r from-[#050505]/80 via-transparent to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-16">
          <Link
            href="/providers"
            className="flex items-center gap-2 text-white/80 hover:text-orange-500 transition-colors w-fit bg-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/10"
          >
            <ArrowLeft size={18} />{" "}
            <span className="text-sm font-medium">Back to Restaurants</span>
          </Link>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="bg-orange-500 dark:text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                Top Rated Partner
              </span>
              <div className="flex items-center text-orange-400 gap-1 text-sm font-bold">
                <Star size={16} fill="currentColor" />
                <span>4.9(200+ Reviews)</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl dark:text-zinc-400 font-extrabold tracking-tight  leading-tight">
              {provider.shopName}
            </h1>
            <div className="flex flex-wrap items-center gap-5 text-zinc-700 dark:text-zinc-300">
              <div className="flex items-center gap-2">
                <MapPin size={18} className="text-orange-500" />
                <span className="text-sm md:text-base">{provider.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock6 className="w-4 h-4 text-orange-500" />
                <span className="text-sm md:text-base">
                  Open: 9:00 AM- 10:00PM
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 md:px-16 -mt-8 relative z-10 pb-20">
        <div className=" border border-zinc-800 backdrop-blur-xl rounded-2xl p-6 mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500">
              <Phone size={20} />
            </div>
          </div>
          <div>
            <p className="text-xs text-zinc-500 uppercase font-bold tracking-tighter">
              Contact Support
            </p>
            <p className="font-medium">+88 {provider.phone}</p>
          </div>
        </div>
        <div className="h-px md:h-10 w-full md:w-px dark:bg-zinc-800" />
        <div className="flex text-center md:text-left">
          <p className="text-zinc-800 dark:text-zinc-400 text-sm italic">
            We pride ourselves on using only the freshest ingredients sourced
            locally
          </p>
        </div>
      </div>
      <div className="space-y-8 max-w-11/12 mx-auto">
        <div className="flex items-baseline justify-between border-b border-zinc-800 pb-4 px-6">
          <h2 className="text-2xl font-bold">Available Menu</h2>
          <p className="text-sm">{provider.Meal.length || 0} items</p>
        </div>
        {provider.Meal && provider.Meal.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {provider.Meal.map((meal: any) => (
              <MealCard key={meal.id} meal={{ ...meal, provider }} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 rounded-3xl border border-dashed border-zinc-800">
            <p className="text-zinc-500">No meals are currently available</p>
          </div>
        )}
      </div>
    </div>
  );
}
