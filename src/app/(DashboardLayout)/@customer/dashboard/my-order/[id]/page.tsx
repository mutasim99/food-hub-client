import { getOrderById } from "@/actions/order.action";
import CustomerOrderDetails from "@/components/modules/dashboard/Customer/OrderDetails";
import React from "react";

export default async function OrderDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const res = await getOrderById(id);
  const order = res?.data ||[]
  if (!order) {
    return <h2 className="text-xl mt-10">Order not found</h2>
  }
  return (
    <div>
      <CustomerOrderDetails order={order} />
    </div>
  );
}
