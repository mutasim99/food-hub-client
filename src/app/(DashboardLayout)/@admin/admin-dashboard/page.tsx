import { getCategory } from "@/actions/category.action";
import { getAllUser } from "@/actions/user.action";
import { prepareGrowthData } from "@/components/lib/utlis/Chart";
import { StatCard } from "@/components/lib/utlis/StatCard";
import ChartWrapper from "@/components/modules/dashboard/admin/ChartWarper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  UserCheck,
  UtensilsCrossed,
  Layers,
  TrendingUp,
  Plus,
} from "lucide-react";

export default async function AdminDashboardPage() {
  const usersRes = await getAllUser();
  const categoryRes = await getCategory();

  const users = usersRes?.data?.data || [];
  const categories = categoryRes?.data?.data || [];

  const customerCount = users.filter((u: any) => u.role === "CUSTOMER").length;
  const providerCount = users.filter((u: any) => u.role === "PROVIDER").length;
  const growthData = prepareGrowthData(users);

  return (
    <div className="flex-1 space-y-8 p-8 pt-6 animate-in fade-in duration-700">
      <header>
        <h2 className="text-3xl font-bold tracking-tight">
          Admin <span className="text-orange-500">Dashboard</span>
        </h2>
        <p className="text-muted-foreground text-sm">
          Platform overview and user acquisition metrics.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total Users"
          value={users.length}
          icon={Users}
          colorClass="text-blue-500"
          bgClass="bg-blue-500/10"
          indicatorColor="bg-blue-500"
        />
        <StatCard
          label="Customers"
          value={customerCount}
          icon={UserCheck}
          colorClass="text-orange-500"
          bgClass="bg-orange-500/10"
          indicatorColor="bg-orange-500"
        />
        <StatCard
          label="Providers"
          value={providerCount}
          icon={UtensilsCrossed}
          colorClass="text-emerald-500"
          bgClass="bg-emerald-500/10"
          indicatorColor="bg-emerald-500"
        />
        <StatCard
          label="Categories"
          value={categories.length}
          icon={Layers}
          colorClass="text-purple-500"
          bgClass="bg-purple-500/10"
          indicatorColor="bg-purple-500"
        />
      </section>

      <section className="grid gap-6 md:grid-cols-7">
        <Card className="col-span-full lg:col-span-4 bg-card/40 backdrop-blur-sm border-border/50 shadow-xl overflow-hidden">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-orange-500" />
              Growth Analytics
            </CardTitle>
          </CardHeader>
          <CardContent className="h-87.5 px-2">
            <ChartWrapper data={growthData} />
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
