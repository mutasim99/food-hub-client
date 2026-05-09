import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { Facebook, Twitter, Instagram, Youtube, Send } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-[#050505] border-t border-zinc-200 dark:border-zinc-800/50 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          
          {/* Brand & Social */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-black text-zinc-900 dark:text-white tracking-tighter">
                Food<span className="text-orange-500">Hub.</span>
              </h2>
              <p className="mt-4 text-zinc-500 dark:text-zinc-400 leading-relaxed text-sm lg:text-base">
                Revolutionizing how you experience local flavors. Discover, order, and track the best meals in your city.
              </p>
            </div>
            <div className="flex gap-4">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <Link 
                  key={i} 
                  href="#" 
                  className="h-10 w-10 flex items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-orange-500 hover:text-white dark:hover:bg-orange-500 dark:hover:text-white transition-all duration-300"
                >
                  <Icon size={18} />
                </Link>
              ))}
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="text-sm font-black uppercase tracking-widest text-zinc-900 dark:text-white mb-6">
              Platform
            </h4>
            <ul className="space-y-4">
              {["Home", "Meals", "Restaurants", "Dashboard"].map((item) => (
                <li key={item}>
                  <Link 
                    href={item === "Dashboard" ? "/dashboard" : "/"} 
                    className="text-zinc-500 dark:text-zinc-400 hover:text-orange-500 dark:hover:text-orange-500 transition-colors text-sm font-medium"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-sm font-black uppercase tracking-widest text-zinc-900 dark:text-white mb-6">
              Support
            </h4>
            <ul className="space-y-4">
              {["Help Center", "Privacy Policy", "Terms of Service", "Contact Us"].map((item) => (
                <li key={item}>
                  <Link 
                    href="#" 
                    className="text-zinc-500 dark:text-zinc-400 hover:text-orange-500 dark:hover:text-orange-500 transition-colors text-sm font-medium"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-black uppercase tracking-widest text-zinc-900 dark:text-white mb-4">
                Stay updated
              </h4>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Get special offers and restaurant updates directly in your inbox.
              </p>
            </div>
            <div className="relative group">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full h-14 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border-none px-5 text-sm focus:ring-2 focus:ring-orange-500 dark:text-white outline-none transition-all"
              />
              <button className="absolute right-2 top-2 h-10 w-10 rounded-xl bg-orange-500 text-white flex items-center justify-center hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20">
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-8 border-t border-zinc-100 dark:border-zinc-800/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs font-medium text-zinc-400 dark:text-zinc-500">
            © {new Date().getFullYear()} FoodHub Inc. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs font-medium text-zinc-400 dark:text-zinc-500">
            <Link href="#" className="hover:text-orange-500 transition-colors">Cookies</Link>
            <Link href="#" className="hover:text-orange-500 transition-colors">Security</Link>
            <Link href="#" className="hover:text-orange-500 transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}