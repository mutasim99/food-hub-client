import { getOrderById } from "@/actions/order.action";
import CustomerOrderDetails from "@/components/modules/dashboard/Customer/OrderDetails";
import React from "react";

export default async function OrderDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data } = await getOrderById(id);
  return (
    <div>
      <CustomerOrderDetails order={data} />
    </div>
  );
}
