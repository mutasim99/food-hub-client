"use client";

import { cancelOrder } from "@/actions/order.action";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MapPin, Package, Calendar, CreditCard, XCircle, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import ReviewForm from "../../home/ReviewForm";

export default function CustomerOrderDetails({ order }: { order: any }) {
  const isDisabled = order.status === "DELIVERED" || order.status === "CANCELLED";

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
   
    <div className="min-h-screen bg-[#0a0a0a] text-slate-200 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <h1 className="text-4xl font-bold text-white tracking-tight">Order Details</h1>
              <Badge 
                className={`px-3 py-1 rounded-md uppercase text-[10px] font-bold ${
                  order.status === "DELIVERED" ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/50" : 
                  order.status === "CANCELLED" ? "bg-red-500/20 text-red-400 border-red-500/50" : 
                  "bg-orange-500/20 text-orange-400 border-orange-500/50"
                }`}
                variant="outline"
              >
                {order.status}
              </Badge>
            </div>
            <div className="flex flex-wrap items-center text-slate-400 gap-y-2 gap-x-6 text-sm">
              <span className="flex items-center gap-2"><Package size={16} className="text-orange-500"/> {order.id}</span>
              <span className="flex items-center gap-2"><Calendar size={16} className="text-orange-500"/> {new Date(order.createdAt).toLocaleDateString(undefined, { dateStyle: 'long' })}</span>
            </div>
          </div>

          {!isDisabled && (
            <Button 
              variant="outline" 
              onClick={handleCancel}
              className="border-red-500/50 text-red-400 hover:bg-red-500 hover:text-white transition-all bg-transparent"
            >
              <XCircle className="mr-2 h-4 w-4" /> Cancel Order
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left: Items List */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-[#141414] border-slate-800 shadow-2xl">
              <CardHeader className="border-b border-slate-800">
                <CardTitle className="text-lg font-medium text-white">Items Summary</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {order.items.map((item: any, index: number) => (
                  <div 
                    key={item.id} 
                    className={`p-6 flex items-center gap-6 ${index !== order.items.length - 1 ? 'border-b border-slate-800/50' : ''}`}
                  >
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-slate-800 border border-slate-700 shrink-0">
                      <Image src={item.meal.image} alt={item.meal.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 flex justify-between items-center">
                      <div>
                        <h4 className="font-bold text-lg text-white">{item.meal.name}</h4>
                        <p className="text-slate-400 text-sm">
                          Tk {item.meal.price} <span className="mx-2 text-slate-600">×</span> {item.qty}
                        </p>
                      </div>
                      <div className="text-right text-orange-500 font-bold text-lg">
                        Tk {item.price * item.qty}
                      </div>
                    </div>
                    {order.status === "DELIVERED" && (
                      <div className="ml-4">
                        <ReviewForm mealId={item.meal.id} />
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right: Payment & Shipping */}
          <div className="space-y-6">
            {/* Payment Summary */}
            <Card className="bg-[#141414] border-slate-800 shadow-xl overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-orange-500" />
              <CardContent className="p-6 pt-8">
                <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
                  <CreditCard size={14} className="text-orange-500"/> Payment Details
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Subtotal</span>
                    <span className="text-white">Tk {order.total}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Delivery Fee</span>
                    <span className="text-emerald-400 font-medium text-xs bg-emerald-500/10 px-2 py-0.5 rounded">FREE</span>
                  </div>
                  <Separator className="bg-slate-800" />
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-white font-medium">Total Amount</span>
                    <span className="text-2xl font-bold text-orange-500">Tk {order.total}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Shipping & Timeline */}
            <Card className="bg-[#141414] border-slate-800 shadow-xl">
              <CardContent className="p-6 space-y-8">
                <div>
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <MapPin size={14} className="text-orange-500"/> Shipping Address
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed bg-slate-800/30 p-3 rounded-lg border border-slate-800">
                    {order.address}
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Status History</h3>
                  <div className="space-y-6 relative before:absolute before:left-1.75 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
                    <div className="relative pl-8">
                      <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] border-2 border-[#141414]" />
                      <p className="text-sm font-semibold text-white">Order Placed</p>
                      <p className="text-[11px] text-slate-500">{new Date(order.createdAt).toLocaleTimeString()}</p>
                    </div>
                    {order.status === "CANCELLED" && (
                      <div className="relative pl-8">
                        <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-red-500 border-2 border-[#141414]" />
                        <p className="text-sm font-semibold text-red-400">Cancelled</p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
}