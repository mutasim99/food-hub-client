import { getMyOrder } from "@/actions/order.action";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Calendar, 
  ChevronRight, 
  Package, 
  ShoppingBag, 
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function MyOrderPage() {
 
  const res = await getMyOrder();
  const orders = res?.data || [];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-slate-200 py-10 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        
       
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-white tracking-tight">
              Order <span className="text-orange-500">History</span>
            </h1>
            <p className="text-slate-500 mt-1">Manage and track your recent culinary adventures</p>
          </div>
        </div>

     
        {!orders.length ? (
          <div className="flex flex-col items-center justify-center py-20 bg-[#141414] rounded-3xl border border-slate-800 border-dashed">
            <div className="bg-orange-500/10 p-4 rounded-full mb-4">
              <ShoppingBag className="text-orange-500 h-10 w-10" />
            </div>
            <h3 className="text-xl font-semibold text-white">No orders yet</h3>
            <p className="text-slate-500 mt-2 mb-6 text-center max-w-xs">
              Looks like you haven't discovered your favorite meal yet!
            </p>
            <Button asChild className="bg-orange-500 hover:bg-orange-600 text-white px-8 h-12 rounded-xl">
              <Link href="/browse-meals">Browse Menu</Link>
            </Button>
          </div>
        ) : (
   
          <div className="grid gap-6">
            {orders.map((order: any) => (
              <Card 
                key={order.id} 
                className="bg-[#141414] border-slate-800 overflow-hidden group hover:border-orange-500/40 transition-all duration-300 shadow-2xl"
              >
                <CardContent className="p-0">

                  <div className="flex flex-wrap items-center justify-between p-5 border-b border-slate-800/50 bg-zinc-900/30">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500">
                        <Package size={20} />
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Order ID</p>
                        <p className="text-sm font-mono text-white">#{order.id.slice(-10).toUpperCase()}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                       <Badge 
                          className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                            order.status === "DELIVERED" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30" : 
                            order.status === "CANCELLED" ? "bg-red-500/10 text-red-400 border-red-500/30" : 
                            "bg-orange-500/10 text-orange-400 border-orange-500/30"
                          }`}
                          variant="outline"
                        >
                          {order.status}
                        </Badge>
                    </div>
                  </div>
                  <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    <div className="lg:col-span-7 flex items-center gap-6">
                      <div className="flex -space-x-6 overflow-hidden">
                        {order.items.slice(0, 3).map((item: any, idx: number) => (
                          <div 
                            key={idx} 
                            className="relative h-16 w-16 rounded-2xl border-4 border-[#141414] overflow-hidden bg-slate-800 shrink-0"
                            style={{ zIndex: 3 - idx }}
                          >
                            <Image src={item.meal.image} alt={item.meal.name} fill className="object-cover" />
                          </div>
                        ))}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="text-white font-semibold truncate text-lg">
                          {order.items[0]?.meal?.name || "Order Item"}
                          {order.items.length > 1 && <span className="text-slate-500 text-sm font-normal"> + {order.items.length - 1} more</span>}
                        </h4>
                        <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                           <Calendar size={12}/> {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="lg:col-span-5 flex items-center justify-between lg:justify-end gap-10">
                      <div className="text-left lg:text-right">
                        <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">Total Pay</p>
                        <p className="text-2xl font-black text-white group-hover:text-orange-500 transition-colors">
                          Tk {order.total}
                        </p>
                      </div>

                      <Link href={`/dashboard/my-order/${order.id}`}>
                        <Button variant="outline" className="border-slate-800 bg-slate-800/50 hover:bg-orange-500 text-white rounded-xl h-11 gap-2">
                          Details <ChevronRight size={16} />
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