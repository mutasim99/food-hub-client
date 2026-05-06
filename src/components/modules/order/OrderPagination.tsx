"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function OrderPagination({ meta }: { meta: any }) {
  const router = useRouter();
  const params = useSearchParams();

  const changePage = (page: number) => {
    const query = new URLSearchParams(params.toString());
    query.set("page", page.toString());

    router.push(`?${query.toString()}`);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => changePage(meta.page - 1)}
        disabled={meta.page <= 1}
        className="p-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      <div className="flex gap-1">
        {Array.from({ length: meta.totalPage }, (_, i) => (
          <button
            key={i}
            onClick={() => changePage(i + 1)}
            className={`px-3.5 py-1.5 text-sm font-medium rounded-lg transition-all ${
              meta.page === i + 1
                ? "bg-black text-white shadow-md"
                : "border hover:bg-gray-50 text-gray-600"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <button
        onClick={() => changePage(meta.page + 1)}
        disabled={meta.page >= meta.totalPage}
        className="p-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}