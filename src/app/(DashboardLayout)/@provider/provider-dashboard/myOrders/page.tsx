import { getProviderOrder } from "@/actions/provider.meal.action";
import ProviderOrderForm from "@/components/modules/dashboard/providerDashboard/ProviderOrderForm";
import React from "react";

export default async function MyOrders() {
  const { data, error } = await getProviderOrder();
  if (!data) {
    return <h4>No Order found</h4>;
  }
  return (
    <div className="mt-2">
      <h2 className="text-2xl font-bold text-center">
        Here is Your <span className="text-orange-500">Order</span>{" "}
      </h2>
      <ProviderOrderForm order={data.data} />
    </div>
  );
}
