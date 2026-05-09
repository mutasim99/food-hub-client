"use client";

import { Search, MapPin, Utensils, ArrowRight } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      id: "01",
      title: "Choose Your Meal",
      description:
        "Browse curated menus from the best local restaurants and kitchens near you.",
      icon: <Search className="text-orange-500" size={32} />,
      color: "bg-orange-500/10",
    },
    {
      id: "02",
      title: "Track Your Order",
      description:
        "Watch your meal's journey with real-time tracking from the kitchen to your door.",
      icon: <MapPin className="text-blue-500" size={32} />,
      color: "bg-blue-500/10",
    },
    {
      id: "03",
      title: "Enjoy Your Food",
      description:
        "Receive your fresh, hot meal and enjoy the best flavors your city has to offer.",
      icon: <Utensils className="text-green-500" size={32} />,
      color: "bg-green-500/10",
    },
  ];

  return (
    <section className="py-24 bg-zinc-50 dark:bg-[#080808] transition-colors duration-500 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-75 bg-orange-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white tracking-tight mb-6">
            Ordering made{" "}
            <span className="text-orange-500 italic">effortless.</span>
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-lg">
            We’ve refined the delivery process into three seamless steps,
            designed to get you from hungry to happy in record time.
          </p>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          <div className="hidden lg:block absolute top-24 left-[25%] right-[25%] h-0.5 border-t-2 border-dashed border-zinc-200 dark:border-zinc-800 pointer-events-none" />

          {steps.map((step, index) => (
            <div key={step.id} className="group relative">
              <div className="relative flex flex-col items-center text-center space-y-6 p-8 rounded-[2.5rem] bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/50 hover:border-orange-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/5 group-hover:-translate-y-2">
                <span className="absolute top-4 right-8 text-7xl font-black text-zinc-100 dark:text-zinc-800/30 select-none group-hover:text-orange-500/10 transition-colors">
                  {step.id}
                </span>

                <div
                  className={`relative h-20 w-20 rounded-2xl ${step.color} flex items-center justify-center transition-transform duration-500 group-hover:rotate-10 group-hover:scale-110`}
                >
                  {step.icon}
                </div>

                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">
                    {step.title}
                  </h3>
                  <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed text-sm lg:text-base">
                    {step.description}
                  </p>
                </div>

                <div className="lg:hidden h-1.5 w-12 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500 w-0 group-hover:w-full transition-all duration-700" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <button className="inline-flex items-center gap-2 text-zinc-900 dark:text-white font-bold group hover:text-orange-500 transition-colors">
            Ready to explore?
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-black group-hover:bg-orange-500 group-hover:text-white transition-all">
              <ArrowRight size={16} />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
