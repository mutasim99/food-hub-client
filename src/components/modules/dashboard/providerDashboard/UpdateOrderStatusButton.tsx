"use client";
import { updateProviderOrderStatus } from "@/actions/provider.meal.action";
import { toast } from "sonner";
const flow = ["PLACED", "PREPARING", "READY", "DELIVERED"];
export default function UpdateOrderStatusButton({
  order,
  nextStatus,
}: {
  order: any;
  nextStatus?: string;
}) {
  if (!order || !order.status) {
    return <span className="text-red-400">Invalid</span>;
  }
  if (order.status === "DELIVERED" || order.status === "CANCELLED") {
    return <span className="text-gray-400">Locked</span>;
  }
  const index = flow.indexOf(order.status);
  if (index === -1 || index === flow.length - 1) {
    return <span className="text-gray-400">Locked</span>;
  }

  const computedNext = flow[index + 1];
  const next = nextStatus && flow.includes(nextStatus) ? nextStatus : computedNext;

  if (flow.indexOf(next) <= index) {
    return <span className="text-gray-400">Locked</span>;
  }

  return (
    <div>
      <button
        onClick={async () => {
          const toastId = toast.loading("Updating...");
          const res = await updateProviderOrderStatus(order.id, next);
          if (res.error) {
            toast.error(res.error, { id: toastId });
          } else {
            toast.success("Status updated", { id: toastId });
          }
        }}
        className="px-3 py-1 bg-orange-500 text-white rounded-lg"
      >
        Update to {next}
      </button>
    </div>
  );
}
