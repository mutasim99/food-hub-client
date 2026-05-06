import { MoreHorizontal, Eye, Mail, Package } from "lucide-react";

interface OrderTableProps {
  orders: any[];
}

export default function OrderTable({ orders }: OrderTableProps) {
  if (!orders || orders.length === 0) {
    return (
      <div className="p-10 text-center text-gray-500">
        <Package className="w-12 h-12 mx-auto mb-3 opacity-20" />
        <p>No orders found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-4 font-semibold">Customer</th>
            <th className="px-6 py-4 font-semibold">Meals Ordered</th>
            <th className="px-6 py-4 font-semibold">Date</th>
            <th className="px-6 py-4 font-semibold">Status</th>
            <th className="px-6 py-4 font-semibold text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {orders.map((order) => (
            <tr key={order.id} className="hover:bg-gray-50 transition-colors">
          
              <td className="px-6 py-4">
                <div className="flex flex-col">
                  <span className="font-medium text-gray-900">
                    {order.customer?.name || "Guest User"}
                  </span>
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <Mail className="w-3 h-3" /> {order.customer?.email}
                  </span>
                </div>
              </td>

            
              <td className="px-6 py-4">
                <div className="flex flex-wrap gap-1">
                  {order.items?.map((item: any, idx: number) => (
                    <span
                      key={idx}
                      className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100"
                    >
                      {item.meal?.name} x{item.quantity || 1}
                    </span>
                  ))}
                </div>
              </td>
              <td className="px-6 py-4 text-gray-600">
                {new Date(order.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </td>
              <td className="px-6 py-4">
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    order.status === "DELIVERED"
                      ? "bg-green-100 text-green-700"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {order.status || "Pending"}
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <button className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
