import { getMyOrder } from "@/actions/order.action";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Calendar,
  ChevronRight,
  Package,
  ShoppingBag,
  Clock,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function MyOrderPage() {
  const res = await getMyOrder();
  const orders = res?.data || [];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#050505] transition-colors duration-500 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20">
              <Clock size={14} className="text-orange-500" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-orange-600 dark:text-orange-500">
                Real-time Tracking
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white tracking-tight">
              My <span className="text-orange-500">Orders</span>
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400 max-w-md">
              Manage your recent cravings and track your delivery status in
              real-time.
            </p>
          </div>
        </div>

        {!orders.length ? (
          <div className="flex flex-col items-center justify-center py-24 bg-white dark:bg-zinc-900/30 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800/50 border-dashed transition-all">
            <div className="relative">
              <div className="absolute inset-0 bg-orange-500 blur-2xl opacity-20 rounded-full" />
              <div className="relative bg-orange-500/10 p-6 rounded-3xl mb-6">
                <ShoppingBag className="text-orange-500 h-12 w-12" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">
              Empty Plate?
            </h3>
            <p className="text-zinc-500 dark:text-zinc-400 mt-2 mb-8 text-center max-w-xs leading-relaxed">
              Looks like you haven&apos;t ordered anything yet. Your favorite
              meals are just a click away!
            </p>
            <Button
              asChild
              className="bg-orange-500 hover:bg-orange-600 text-white px-10 h-14 rounded-2xl shadow-lg shadow-orange-500/20 transition-all hover:scale-105 active:scale-95"
            >
              <Link href="/browse-meals">Explore the Menu</Link>
            </Button>
          </div>
        ) : (

          <div className="grid gap-6">
            {orders.map((order: any) => (
              <Card
                key={order.id}
                className="bg-white dark:bg-zinc-900/40 border-zinc-200 dark:border-zinc-800/50 overflow-hidden group hover:border-orange-500/40 transition-all duration-500 rounded-[2rem] shadow-sm hover:shadow-xl hover:shadow-orange-500/5"
              >
                <CardContent className="p-0">

                  <div className="flex flex-row items-center justify-between p-6 border-b border-zinc-100 dark:border-zinc-800/50 bg-zinc-50/50 dark:bg-zinc-800/20">
                    <div className="flex items-center gap-4">
                      <div className="hidden sm:flex h-12 w-12 rounded-2xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 items-center justify-center text-orange-500 shadow-sm">
                        <Package size={22} />
                      </div>
                      <div>
                        <p className="text-[10px] text-zinc-400 dark:text-zinc-500 uppercase tracking-widest font-black">
                          Reference
                        </p>
                        <p className="text-sm font-mono font-bold text-zinc-900 dark:text-zinc-200">
                          #{order.id.slice(-8).toUpperCase()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">

                      <div className="hidden sm:block">
                        {order.status === "DELIVERED" ? (
                          <CheckCircle2
                            className="text-emerald-500"
                            size={18}
                          />
                        ) : order.status === "CANCELLED" ? (
                          <XCircle className="text-red-500" size={18} />
                        ) : (
                          <div className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
                        )}
                      </div>
                      <Badge
                        className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider border transition-colors ${
                          order.status === "DELIVERED"
                            ? "bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                            : order.status === "CANCELLED"
                            ? "bg-red-500/5 text-red-600 dark:text-red-400 border-red-500/20"
                            : "bg-orange-500/5 text-orange-600 dark:text-orange-400 border-orange-500/20"
                        }`}
                        variant="outline"
                      >
                        {order.status}
                      </Badge>
                    </div>
                  </div>


                  <div className="p-6 md:p-8 flex flex-col lg:flex-row gap-8 items-center lg:justify-between">
                    <div className="flex flex-col sm:flex-row items-center gap-6 w-full lg:w-auto">

                      <div className="flex -space-x-4 hover:space-x-1 transition-all duration-300">
                        {order.items
                          .slice(0, 3)
                          .map((item: any, idx: number) => (
                            <div
                              key={idx}
                              className="relative h-16 w-16 sm:h-20 sm:w-20 rounded-[1.5rem] border-4 border-white dark:border-zinc-900 overflow-hidden bg-zinc-200 dark:bg-zinc-800 shrink-0 shadow-lg"
                              style={{ zIndex: 3 - idx }}
                            >
                              <Image
                                src={item.meal.image}
                                alt={item.meal.name}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                              />
                            </div>
                          ))}
                        {order.items.length > 3 && (
                          <div className="relative h-16 w-16 sm:h-20 sm:w-20 rounded-[1.5rem] border-4 border-white dark:border-zinc-900 bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-xs font-bold text-zinc-500 z-0">
                            +{order.items.length - 3}
                          </div>
                        )}
                      </div>

                      <div className="text-center sm:text-left space-y-1">
                        <h4 className="text-zinc-900 dark:text-white font-black text-xl lg:text-2xl leading-tight">
                          {order.items[0]?.meal?.name || "Order Item"}
                          {order.items.length > 1 && (
                            <span className="text-zinc-400 dark:text-zinc-500 font-medium text-sm ml-2">
                              & {order.items.length - 1} other delicious treats
                            </span>
                          )}
                        </h4>
                        <p className="text-xs text-zinc-500 font-medium flex items-center justify-center sm:justify-start gap-1.5 uppercase tracking-wider">
                          <Calendar size={14} className="text-orange-500" />
                          {new Date(order.createdAt).toLocaleDateString(
                            "en-US",
                            { day: "numeric", month: "short", year: "numeric" }
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-row sm:flex-row items-center justify-between lg:justify-end gap-8 w-full lg:w-auto pt-6 lg:pt-0 border-t lg:border-t-0 border-zinc-100 dark:border-zinc-800/50">
                      <div className="text-left lg:text-right">
                        <p className="text-[10px] text-zinc-400 dark:text-zinc-500 uppercase font-black tracking-widest mb-1">
                          Payment
                        </p>
                        <p className="text-3xl font-black text-zinc-900 dark:text-white group-hover:text-orange-500 transition-colors">
                          <span className="text-sm font-bold mr-1 text-orange-500">
                            Tk
                          </span>
                          {order.total}
                        </p>
                      </div>

                      <Link href={`/dashboard/my-order/${order.id}`}>
                        <Button
                          variant="outline"
                          className="h-14 px-8 rounded-2xl border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-800/50 hover:bg-orange-500 dark:hover:bg-orange-500 hover:text-white dark:hover:border-orange-500 group/btn transition-all duration-300 shadow-sm font-bold gap-3"
                        >
                          Track Details{" "}
                          <ChevronRight
                            size={18}
                            className="transition-transform group-hover/btn:translate-x-1"
                          />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
