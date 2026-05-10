import { getOrderById } from "@/actions/order.action";
import CustomerOrderDetails from "@/components/modules/dashboard/Customer/OrderDetails";
import { notFound } from "next/navigation";

export default async function OrderDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const res = await getOrderById(id);
  const order = res?.data;

  if (!order) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#080808] transition-colors duration-500">
      <CustomerOrderDetails order={order} />
    </div>
  );
}
