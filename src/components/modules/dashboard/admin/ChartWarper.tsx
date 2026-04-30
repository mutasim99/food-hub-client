"use client";

import dynamic from "next/dynamic";

interface ChartWrapperProps {
  data: { date: string; count: number }[];
}

const UserGrowthChart = dynamic(
  () => import("@/components/modules/dashboard/admin/UserGrowth"),
  {
    ssr: false,
    loading: () => (
      <div className="h-64 w-full bg-muted/20 animate-pulse rounded-xl" />
    ),
  }
);

export default function ChartWrapper({ data }: ChartWrapperProps) {
 
  if (!data || data.length === 0) {
    return (
      <div className="h-64 w-full flex items-center justify-center border-2 border-dashed border-border rounded-xl text-muted-foreground italic text-sm">
        No growth data available for this period.
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      
       <UserGrowthChart data={data} />
    </div>
  );
}