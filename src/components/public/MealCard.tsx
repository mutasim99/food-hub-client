import { Clock, Plus, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function MealCard({ meal }: any) {
  return (
    <Link
      className="group relative block bg-zinc-900/50 rounded-2xl border border-zinc-800 hover:border-orange-500/50 transition-all duration-300 overflow-hidden"
      href={`/meals/${meal.id}`}
    >
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={meal.image}
          alt={meal.name}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute top-3 right-3 z-10">
          <div className="bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full shadow-lg">
            <span className="text-orange-400 font-bold text-sm">
              ৳{meal.price.toFixed(2)}
            </span>
          </div>
        </div>
        <div className="absolute inset-0 bg-linear-to-t from-zinc-900 via-transparent to-transparent opacity-60" />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-white font-bold text-lg leading-tight group-hover:text-orange-400 transition-colors truncate">
            {meal.name}
          </h3>
        </div>
        <div className="flex items-center gap-2 text-zinc-400 text-xs mb-4">
          <span className="hover:text-zinc-200 transition-colors">
            {meal.provider.shopName}
          </span>
          <span className="w-1 h-1 rounded-full bg-zinc-700" />
          <div className="flex items-center text-orange-400/80">
            <Star className="w-3 h-3 fill-current mr-0.5" />
            <span className="font-medium">4.8</span>
          </div>
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-zinc-800">
          <div className="items-center text-zinc-500 text-xs">
            <Clock className="w-3.5 h-3.5 mr-1" />
            <span>15-25 min</span>
          </div>
          <div className="bg-orange-500 p-1.5 rounded-lg text-white transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            <Plus className="w-5 h-5"/>
          </div>
        </div>
      </div>
    </Link>
  );
}
