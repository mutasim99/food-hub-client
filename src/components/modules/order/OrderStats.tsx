import { ShoppingBag, Users, CheckCircle } from "lucide-react";

export default function OrderStats({
  orders,
  meta,
}: {
  orders: any[];
  meta?: any;
}) {
  const stats = [
    {
      label: "Total Orders",
      value: meta?.total ?? orders.length ?? 0,
      icon: ShoppingBag,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      label: "Total Users",
      value:meta?.totalUsers ??0,
      icon: Users,
      color: "text-purple-600",
      bg: "bg-purple-100",
    },

    {
      label: "Completed",
      value:meta?.completeCount ?? 0,
      icon: CheckCircle,
      color: "text-green-600",
      bg: "bg-green-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="bg-white p-6 rounded-xl border border-gray-200 flex items-center gap-4"
        >
          <div className={`${stat.bg} p-3 rounded-lg`}>
            <stat.icon className={`w-6 h-6 ${stat.color}`} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
