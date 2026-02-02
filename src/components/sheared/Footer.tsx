import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

export default function Footer() {
  return (
    <footer className="border-t-2 border-zinc-800 bg-zinc-900 text-zinc-300">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-11">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-orange-500">FoodHub</h2>
          <p className="mt-4 text-sm text-zinc-400">
            Discover & order delicious meals from the best restaurant near you.
          </p>
        </div>
        {/* Links */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-white mb-4">
            Platform
          </h4>
          <ul>
            <li>
              <Link href="/" className="hover:text-orange-500">
                Home
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-orange-500">
                Meals
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-orange-500">
                Restaurants
              </Link>
            </li>
            <li>
              <Link href="/dashboard" className="hover:text-orange-500">
                Dashboard
              </Link>
            </li>
          </ul>
        </div>
        {/* Support */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white mb-4">
            Support
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="hover:text-orange-500 cursor-pointer">
              Help Center
            </li>
            <li className="hover:text-orange-500 cursor-pointer">
              Privacy Policy
            </li>
            <li className="hover:text-orange-500 cursor-pointer">
              Terms of service
            </li>
            <li className="hover:text-orange-500 cursor-pointer">Contact</li>
          </ul>
        </div>
        {/* Newsletter */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-white mb-4">
            Stay updated
          </h4>
          <p className="text-sm text-zinc-400 mb-4">
            Get special Offers & restaurant updates
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="w-full rounded-md border border-zinc-700 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <Button className="ng-orange-500 hover:bg-orange-600">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
      {/* Bottom Bar */}
      <div className="border-t border-zinc-800 py-6 text-center text-sm text-zinc-500">
      ©{new Date().getFullYear()}
        FoodHub. All rights reserved
      </div>
    </footer>
  );
}
