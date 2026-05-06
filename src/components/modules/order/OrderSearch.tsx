"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function OrderSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const query = new URLSearchParams(searchParams.toString());
      if (searchTerm) {
        query.set("search", searchTerm);
      } else {
        query.delete("search");
      }
      query.set("page", "1");
      router.push(`?${query.toString()}`, { scroll: false });
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, router, searchParams]);

  return (
    <div className="relative w-full md:w-80">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-gray-400 dark:text-slate-500" />
      </div>

      <input
        type="text"
        value={searchTerm}
        placeholder="Search by meal or customer..."
        onChange={(e) => setSearchTerm(e.target.value)}
        className="block w-full pl-10 pr-3 py-2 border border-gray-200 dark:border-slate-700 rounded-lg 
                   focus:ring-2 focus:ring-black dark:focus:ring-indigo-500 focus:border-transparent 
                   text-sm transition-all outline-none bg-white dark:bg-slate-900 
                   text-slate-900 dark:text-white placeholder-gray-400 shadow-sm"
      />
    </div>
  );
}
