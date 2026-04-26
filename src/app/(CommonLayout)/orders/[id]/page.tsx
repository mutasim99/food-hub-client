import { getOrderById } from "@/actions/order.action";
import CustomerOrderDetails from "@/components/modules/dashboard/Customer/OrderDetails";

export default async function OrderDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const res = await getOrderById(id);
  const order = res?.data;

  if (!order) {
    return <h2 className="text-xl mt-10 text-center">Order not found</h2>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <CustomerOrderDetails order={order} />
    </div>
  );
}
