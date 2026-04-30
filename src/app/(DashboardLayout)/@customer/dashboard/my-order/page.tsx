import { getMyOrder } from "@/actions/order.action";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, ChevronRight, Package, ShoppingBag } from "lucide-react";
import Link from "next/link";
import React from "react";

export default async function MyOrder() {
  const res = await getMyOrder();
  const orders = res?.data || [];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-slate-200 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-10 text-center md:text-left">
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            My <span className="text-orange-500">Orders</span>
          </h2>
          <p className="text-slate-500 mt-2 text-sm">
            Track and manage your recent meal deliveries.
          </p>
        </div>

        {!orders.length ? (
          /* Enhanced Empty State */
          <div className="flex flex-col items-center justify-center py-20 bg-[#141414] rounded-3xl border border-slate-800 border-dashed">
            <div className="bg-orange-500/10 p-4 rounded-full mb-4">
              <ShoppingBag className="text-orange-500 h-10 w-10" />
            </div>
            <h3 className="text-xl font-semibold text-white">No orders yet</h3>
            <p className="text-slate-500 mt-2 mb-6 text-center max-w-xs">
              Looks like you haven't discovered your favorite meal yet!
            </p>
            <Button asChild className="bg-orange-500 hover:bg-orange-600 text-white">
              <Link href="/browse-meals">Browse Menu</Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-4 mt-6">
            {orders.map((order: any) => (
              <Card 
                key={order.id} 
                className="bg-[#141414] border-slate-800 hover:border-orange-500/50 transition-all duration-300 group shadow-xl"
              >
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 gap-6">
                    
                    {/* Order Info Group */}
                    <div className="flex items-center gap-4">
                      <div className="bg-slate-800/50 p-3 rounded-2xl group-hover:bg-orange-500/10 transition-colors">
                        <Package className="text-slate-400 group-hover:text-orange-500 transition-colors" size={24} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-mono text-slate-500 uppercase tracking-tighter">
                            ID: {order.id.slice(-8)}
                          </span>
                          <Badge 
                            variant="outline"
                            className={`text-[10px] uppercase font-bold py-0 px-2 rounded-sm ${
                              order.status === "DELIVERED" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30" :
                              order.status === "CANCELLED" ? "bg-red-500/10 text-red-400 border-red-500/30" :
                              "bg-orange-500/10 text-orange-400 border-orange-500/30"
                            }`}
                          >
                            {order.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-slate-400 text-sm">
                          <Calendar size={14} className="text-slate-600" />
                          {new Date(order.createdAt).toLocaleDateString(undefined, { 
                            dateStyle: 'medium' 
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Pricing and Action */}
                    <div className="w-full md:w-auto flex items-center justify-between md:justify-end gap-8 border-t md:border-t-0 border-slate-800 pt-4 md:pt-0">
                      <div className="text-left md:text-right">
                        <p className="text-xs text-slate-500 uppercase font-semibold">Total Amount</p>
                        <p className="text-xl font-bold text-white group-hover:text-orange-500 transition-colors">
                          Tk {order.total}
                        </p>
                      </div>
                      
                      <Link 
                        href={`/dashboard/my-order/${order.id}`}
                        className="flex items-center gap-1 text-sm font-medium text-white bg-slate-800 hover:bg-orange-500 px-4 py-2 rounded-xl transition-all"
                      >
                        Details
                        <ChevronRight size={16} />
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