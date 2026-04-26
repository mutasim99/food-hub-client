import { getMyOrder } from "@/actions/order.action";
import Link from "next/link";
import React from "react";

export default async function MyOrder() {
  const res = await getMyOrder();
  const orders = res?.data || [];

  return (
    <div className="mt-2">
      <h2 className="text-2xl text-center font-bold">
        My <span className="text-orange-500">Orders</span>
      </h2>
      {!orders.length ? (
        <p className="text-center text-gray-500 mt-6">You have no orders yet.</p>
      ) : (
        <div className="space-y-4 mt-6">
          {orders.map((order: any) => (
            <div
              key={order.id}
              className="border p-4 rounded-l-2xl flex justify-between items-center"
            >
              <p>Total: Tk {order.total}</p>
              <p>Status: {order.status}</p>
              <Link
                href={`/dashboard/my-order/${order.id}`}
                className="text-orange-500"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
