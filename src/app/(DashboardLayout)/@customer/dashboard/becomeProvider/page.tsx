import BecomeProviderFrom from "@/components/modules/dashboard/Customer/BecomeProvider";
import {  Rocket, ShieldCheck, Zap } from "lucide-react";

export default function BecomeAProvider() {
  const benefits = [
    { icon: <Zap className="text-orange-500" size={18} />, text: "Instant storefront setup" },
    { icon: <Rocket className="text-orange-500" size={18} />, text: "Reach thousands of customers" },
    { icon: <ShieldCheck className="text-orange-500" size={18} />, text: "Secure payment processing" },
  ];

  return (
    <div className="min-h-[calc(100-64px)] py-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
     
        <div className="lg:col-span-5 space-y-8 pt-6">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white tracking-tight">
              Start your <br />
              <span className="text-orange-500">Culinary Journey.</span>
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg leading-relaxed">
              Join FoodHub's elite network of providers. We provide the tools; you provide the flavor.
            </p>
          </div>

          <div className="space-y-4">
            {benefits.map((benefit, i) => (
              <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                {benefit.icon}
                <span className="font-semibold text-zinc-700 dark:text-zinc-300">{benefit.text}</span>
              </div>
            ))}
          </div>

          <div className="p-6 rounded-[2rem] bg-orange-500/5 border border-orange-500/10">
             <p className="text-sm text-orange-600 dark:text-orange-400 italic">
               "Joining FoodHub increased our monthly orders by 40% in just two months."
             </p>
             <p className="text-xs font-bold mt-2">— The Burger Lab</p>
          </div>
        </div>

  
        <div className="lg:col-span-7">
          <BecomeProviderFrom />
        </div>
      </div>
    </div>
  );
}