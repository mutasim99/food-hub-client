"use client";

import { ChevronDown } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function OrderSort() {
  const router = useRouter();
  const params = useSearchParams();

  const handleSort = (value: string) => {
    const query = new URLSearchParams(params.toString());

    query.set("sortBy", "createdAt");
    query.set("sortOrder", value);

    router.push(`?${query.toString()}`,{ scroll: false });
  };

  return (
    <div className="relative">
      <select
        onChange={(e) => handleSort(e.target.value)}
        value={params.get("sortOrder") || "desc"}
        className="appearance-none bg-white border border-gray-200 text-gray-700 py-2 pl-4 pr-10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black transition-all cursor-pointer"
      >
        <option value="desc">Newest First</option>
        <option value="asc">Oldest First</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
        <ChevronDown className="h-4 w-4" />
      </div>
    </div>
  );
}