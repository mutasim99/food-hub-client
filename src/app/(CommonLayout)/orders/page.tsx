import { getMyOrder } from "@/actions/order.action";
import Link from "next/link";

export default async function OrdersPage() {
  const res = await getMyOrder();
  const orders = res?.data || [];

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      {!orders.length ? (
        <div className="border rounded-xl p-8 text-center">
          <p>No orders found yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order: any) => (
            <div
              key={order.id}
              className="border rounded-xl p-4 flex items-center justify-between gap-4"
            >
              <div>
                <p className="font-semibold">Order #{order.id}</p>
                <p className="text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm">Status: {order.status}</p>
                <p className="font-semibold">Tk {order.total}</p>
              </div>
              <Link href={`/orders/${order.id}`} className="text-orange-500">
                View
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
