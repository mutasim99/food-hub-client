import { ArrowRight, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ProviderCard({ provider }: any) {
  return (
    <Link
      href={`/providers/${provider.id}`}
      className="group relative block bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-zinc-700 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1"
    >
      <div className="relative h-48 w-full mb-4 overflow-hidden">
        <Image
          src={provider.image}
          alt={provider.shopName}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-zinc-900/80 via-transparent to-transparent opacity-60" />
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
            {provider.shopName}
          </h3>
          <span className="bg-zinc-800 text-zinc-400 text-[10px] uppercase tracking-widest px-2 py-1 rounded-md border border-zinc-700">
            Featured
          </span>
        </div>
        <div className="flex items-center text-zinc-400 mb-4">
          <MapPin className="w-4 h-4 mr-1.5 text-zinc-500" />
          <p className="text-sm truncate">{provider.address}</p>
        </div>
        <div className="flex items-center text-sm font-medium text-blue-400 group-hover:translate-x-1 transition-transform">
          View Details <ArrowRight className="w-4 h-4 ml-1" />
        </div>
      </div>
    </Link>
  );
}
