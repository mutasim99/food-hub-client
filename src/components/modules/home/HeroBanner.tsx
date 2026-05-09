"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, ArrowRight, Play, Star, Users } from "lucide-react";
import bannerImg from "../../../../public/assets/BannerImage/BannerImage.jpg";

export default function HeroBanner() {
  return (
    <section className="relative w-full min-h-[90vh] flex items-center overflow-hidden bg-white dark:bg-[#050505] transition-colors duration-500">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-125 h-125 bg-orange-500/10 dark:bg-orange-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-100 h-100 bg-blue-500/10 dark:bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 lg:px-16 relative z-10 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          

          <div className="flex flex-col space-y-8 text-center lg:text-left">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-orange-50 dark:bg-orange-500/10 px-4 py-1.5 text-sm font-bold text-orange-600 dark:text-orange-500 border border-orange-100 dark:border-orange-500/20 mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                </span>
                Now serving in your area
              </span>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] text-zinc-900 dark:text-white tracking-tight">
                The quickest way to <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-orange-600">
                  great food.
                </span>
              </h1>
              
              <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Browse hundreds of local providers, order your favorite meals, and
                track them in real-time. From kitchen to your doorstep in <span className="text-zinc-900 dark:text-zinc-200 font-semibold underline decoration-orange-500/30">minutes</span>.
              </p>
            </div>


            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <Link 
                href="/meals" 
                className="group flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg shadow-orange-500/20 transition-all active:scale-95"
              >
                Order Now
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <button className="flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-lg text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors">
                <div className="h-10 w-10 rounded-full bg-white dark:bg-zinc-800 shadow-md flex items-center justify-center text-orange-500">
                  <Play size={16} fill="currentColor" />
                </div>
                How it works
              </button>
            </div>


            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-10 w-10 rounded-full border-4 border-white dark:border-[#050505] bg-zinc-200 overflow-hidden">
                    <div className="h-full w-full bg-linear-to-br from-zinc-400 to-zinc-500" />
                  </div>
                ))}
                <div className="h-10 w-10 rounded-full border-4 border-white dark:border-[#050505] bg-orange-500 flex items-center justify-center text-[10px] font-bold text-white uppercase">
                  10k+
                </div>
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1 text-orange-500">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                  <span className="ml-1 font-bold text-zinc-900 dark:text-white text-sm">4.9/5</span>
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-500">from 2,000+ happy foodies</p>
              </div>
            </div>
          </div>


          <div className="relative">
            <div className="relative z-10 w-full aspect-4/5 lg:aspect-square max-w-2xl mx-auto">
              <div className="absolute inset-0 bg-linear-to-tr from-orange-500/20 to-transparent rounded-[3rem] -rotate-3" />
              <div className="relative h-full w-full rounded-[2.5rem] overflow-hidden border-8 border-white dark:border-zinc-900 shadow-2xl">
                <Image
                  src={bannerImg}
                  alt="Delicious food platter"
                  fill
                  priority
                  className="object-cover"
                />
              </div>


              <div className="absolute -bottom-6 -left-6 bg-white dark:bg-zinc-900 shadow-2xl rounded-2xl p-5 flex items-center gap-4 border border-zinc-100 dark:border-zinc-800 animate-bounce-slow">
                <div className="h-12 w-12 rounded-xl bg-green-100 dark:bg-green-500/20 flex items-center justify-center shrink-0">
                  <Check className="text-green-600 dark:text-green-500" size={24} strokeWidth={3} />
                </div>
                <div className="pr-4">
                  <p className="font-black text-xl text-zinc-900 dark:text-white leading-none">200+</p>
                  <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mt-1">Verified Partners</p>
                </div>
              </div>


              <div className="absolute top-10 -right-8 bg-white dark:bg-zinc-900 shadow-2xl rounded-2xl p-4 flex items-center gap-3 border border-zinc-100 dark:border-zinc-800 animate-float">
                <div className="h-10 w-10 rounded-full bg-orange-100 dark:bg-orange-500/20 flex items-center justify-center">
                  <Users className="text-orange-600 dark:text-orange-500" size={20} />
                </div>
                <div>
                  <p className="font-bold text-sm text-zinc-900 dark:text-white italic">Fastest Delivery</p>
                  <p className="text-[10px] text-zinc-500 tracking-tighter">Under 30 Minutes</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .animate-float { animation: float 4s ease-in-out infinite; }
        .animate-bounce-slow { animation: bounce-slow 3s ease-in-out infinite; }
      `}</style>
    </section>
  );
}