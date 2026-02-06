"use client";
import { cancelOrder } from "@/actions/order.action";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { toast } from "sonner";
import ReviewForm from "../../home/ReviewForm";

export default function CustomerOrderDetails({ order }: { order: any }) {
  const isDisable =
    order.status === "DELIVERED" || order.status === "CANCELLED";
  const handleCancel = async () => {
    const toastId = toast.loading("Cancelling order...");
    try {
      await cancelOrder(order.id);
      toast.success("Orders cancelled", { id: toastId });
    } catch (error) {
      toast.error("cancelled failed", { id: toastId });
    }
  };
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Order #{order.id}</h2>
          <p className="text-sm text-gray-500">
            {new Date(order.createdAt).toLocaleString()}
          </p>
        </div>
        <Badge
          className="w-fit px-4 py-1 text-sm"
          variant={
            order.status === "DELIVERED"
              ? "secondary"
              : order.status === "CANCELED"
              ? "destructive"
              : "outline"
          }
        >
          {order.status}
        </Badge>
        <Button
          variant="destructive"
          disabled={isDisable}
          onClick={handleCancel}
          className="hover:cursor-pointer"
        >
          Cancel Order
        </Button>
      </div>
      {/* info sections */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-5 space-y-2">
          <h3 className="text-sm text-gray-400">Delivery Address</h3>
          <p className="font-medium">{order.address}</p>
        </Card>
        <Card className="p-5 space-y-2">
          <h3 className="text-sm text-gray-400">Order Total</h3>
          <p className="font-medium">৳{order.total}</p>
        </Card>
        {/* Items */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Ordered Items</h3>
          <div className="space-y-4">
            {order.items.map((item: any) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b-2 pb-4"
              >
                <div className="flex items-center gap-4">
                  <div className="relative w-15 h-16 rounded-md overflow-hidden">
                    <Image
                      src={item.meal.image}
                      alt={item.meal.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold">{item.meal.name}</p>
                    <p className="text-sm text-gray-500">
                      ৳{item.meal.price} x {item.qty}
                    </p>
                  </div>
                </div>
                <p>{item.price * item.qty} tk</p>
                {order.status === "DELIVERED" && (
                  <Card>
                    <ReviewForm mealId={item.meal.id} />
                  </Card>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
