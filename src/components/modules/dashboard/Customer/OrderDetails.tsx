"use client";

import { cancelOrder } from "@/actions/order.action";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  MapPin,
  Package,
  Calendar,
  XCircle,
  ChevronLeft,
  Clock,
} from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import ReviewForm from "../../home/ReviewForm";
import Link from "next/link";

export default function CustomerOrderDetails({ order }: { order: any }) {
  const isDisabled =
    order.status === "DELIVERED" || order.status === "CANCELLED";

  const handleCancel = async () => {
    const toastId = toast.loading("Processing cancellation...");
    try {
      await cancelOrder(order.id);
      toast.success("Order cancelled", { id: toastId });
    } catch (error) {
      toast.error("Failed to cancel", { id: toastId });
    }
  };

  return (
    <div className="p-4 md:p-8 lg:p-12">
      <div className="max-w-6xl mx-auto space-y-8">

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <Link
            href="/dashboard/customer/orders"
            className="flex items-center gap-2 text-zinc-500 hover:text-orange-500 transition-colors text-sm font-medium w-fit"
          >
            <ChevronLeft size={16} /> Back to Orders
          </Link>

          {!isDisabled && (
            <Button
              variant="ghost"
              onClick={handleCancel}
              className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all rounded-xl font-bold"
            >
              <XCircle className="mr-2 h-4 w-4" /> Cancel This Order
            </Button>
          )}
        </div>

        {/* Header Section */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] p-8 shadow-sm">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-white tracking-tight">
                  Order Details
                </h1>
                <Badge
                  className={`rounded-full px-4 py-1 text-[10px] font-black tracking-widest uppercase border-2 ${
                    order.status === "DELIVERED"
                      ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                      : order.status === "CANCELLED"
                      ? "bg-red-500/10 text-red-600 border-red-500/20"
                      : "bg-orange-500/10 text-orange-600 border-orange-500/20 animate-pulse"
                  }`}
                  variant="outline"
                >
                  {order.status}
                </Badge>
              </div>
              <div className="flex flex-wrap items-center gap-6 text-zinc-500 dark:text-zinc-400 text-sm font-medium">
                <span className="flex items-center gap-2">
                  <Package size={16} className="text-orange-500" /> ID:{" "}
                  <span className="text-zinc-900 dark:text-zinc-200">
                    {order.id.slice(-8)}
                  </span>
                </span>
                <span className="flex items-center gap-2">
                  <Calendar size={16} className="text-orange-500" />
                  {new Date(order.createdAt).toLocaleDateString(undefined, {
                    dateStyle: "medium",
                  })}
                </span>
              </div>
            </div>

            <div className="bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800">
              <p className="text-xs text-zinc-500 uppercase font-black tracking-tighter mb-1">
                Total Paid
              </p>
              <p className="text-3xl font-black text-orange-500">
                Tk {order.total}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 rounded-[2rem] overflow-hidden shadow-sm">
              <div className="p-6 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/30">
                <h3 className="font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                  Items Summary{" "}
                  <span className="text-xs font-normal text-zinc-500">
                    ({order.items.length} items)
                  </span>
                </h3>
              </div>
              <CardContent className="p-0">
                {order.items.map((item: any, index: number) => (
                  <div
                    key={item.id}
                    className={`p-6 flex flex-col sm:flex-row items-center gap-6 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/20 ${
                      index !== order.items.length - 1
                        ? "border-b border-zinc-100 dark:border-zinc-800"
                        : ""
                    }`}
                  >
                    <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-inner">
                      <Image
                        src={item.meal.image}
                        alt={item.meal.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                      <h4 className="font-black text-xl text-zinc-900 dark:text-white">
                        {item.meal.name}
                      </h4>
                      <p className="text-zinc-500 font-medium mt-1">
                        Tk {item.meal.price}{" "}
                        <span className="mx-2 text-zinc-300">×</span> {item.qty}
                      </p>
                    </div>
                    <div className="flex flex-col items-center sm:items-end gap-3">
                      <span className="text-xl font-black text-orange-500">
                        Tk {item.price * item.qty}
                      </span>
                      {order.status === "DELIVERED" && (
                        <ReviewForm mealId={item.meal.id} />
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>


          <div className="space-y-6">
            {/* Delivery Info */}
            <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 rounded-[2rem] p-6 shadow-sm">
              <h3 className="text-xs font-black text-zinc-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                <MapPin size={14} className="text-orange-500" /> Shipping Info
              </h3>
              <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800">
                <p className="text-zinc-700 dark:text-zinc-300 text-sm font-semibold leading-relaxed">
                  {order.address}
                </p>
              </div>

              <Separator className="my-6 bg-zinc-100 dark:bg-zinc-800" />

              <h3 className="text-xs font-black text-zinc-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                <Clock size={14} className="text-orange-500" /> Timeline
              </h3>
              <div className="space-y-6 relative ml-2 border-l-2 border-zinc-100 dark:border-zinc-800 pl-6">
                <div className="relative">
                  <div className="absolute -left-7.75 top-0 w-4 h-4 rounded-full bg-emerald-500 border-4 border-white dark:border-zinc-900 shadow-lg shadow-emerald-500/20" />
                  <p className="text-sm font-bold text-zinc-900 dark:text-white">
                    Order Placed
                  </p>
                  <p className="text-[11px] text-zinc-500 font-medium">
                    {new Date(order.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                {order.status === "CANCELLED" && (
                  <div className="relative">
                    <div className="absolute -left-7.75 top-0 w-4 h-4 rounded-full bg-red-500 border-4 border-white dark:border-zinc-900" />
                    <p className="text-sm font-bold text-red-500">Cancelled</p>
                  </div>
                )}
              </div>
            </Card>

            <div className="p-6 rounded-[2rem] bg-orange-500/5 border border-orange-500/10 dark:bg-orange-500/10">
              <p className="text-xs font-black text-orange-600 dark:text-orange-400 uppercase tracking-widest mb-2">
                Need help?
              </p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 font-medium">
                If you have issues with your order, please contact our 24/7
                support.
              </p>
              <Button
                variant="link"
                className="p-0 h-auto text-orange-500 font-bold mt-2"
              >
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
