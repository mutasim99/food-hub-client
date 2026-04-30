import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon, TrendingUp } from "lucide-react";

interface StatCardProps {
  label: string;
  value: number;
  icon: LucideIcon;
  colorClass: string; 
  bgClass: string;
  indicatorColor: string; 
}

export function StatCard({
  label,
  value,
  icon: Icon,
  colorClass,
  bgClass,
  indicatorColor,
}: StatCardProps) {
  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-md overflow-hidden relative group transition-all hover:shadow-2xl hover:border-orange-500/30">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
          {label}
        </CardTitle>
        <div className={`p-2 rounded-lg ${bgClass} ${colorClass}`}>
          <Icon size={16} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold tracking-tight">{value}</div>
        <div className="flex items-center text-[10px] text-emerald-500 font-bold mt-1 uppercase">
          <TrendingUp className="mr-1 h-3 w-3" />
          <span>+2.5% vs last week</span>
        </div>
      </CardContent>
      {/* Visual indicator on hover */}
      <div
        className={`absolute bottom-0 left-0 h-1 w-full ${indicatorColor} opacity-0 group-hover:opacity-100 transition-opacity`}
      />
    </Card>
  );
}
