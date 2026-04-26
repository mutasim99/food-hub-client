"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import UpdateOrderStatusButton from "./UpdateOrderStatusButton";
import { useMemo, useState } from "react";

const statuses = ["PLACED", "PREPARING", "READY", "DELIVERED", "CANCELLED"];

export default function ProviderOrderForm({ order }: any) {
  const initialMap = useMemo(
    () =>
      (order || []).reduce((acc: Record<string, string>, ord: any) => {
        acc[ord.id] = ord.status || "PLACED";
        return acc;
      }, {}),
    [order]
  );

  const [selectedStatus, setSelectedStatus] = useState<Record<string, string>>(
    initialMap
  );

  if (!order?.length) {
    return <p className="text-center mt-8 text-gray-500">No orders found</p>;
  }

  return (
    <div>
      <Table className="border-4 rounded-md mt-10">
        <TableHeader>
          <TableRow>
            <TableHead>Food Name</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Total Price</TableHead>
            <TableHead>Customer Name</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {order.map((ord: any) => (
            <TableRow key={ord.id}>
              <TableCell>{ord.items?.[0]?.meal?.name || "N/A"}</TableCell>
              <TableCell>{ord.items?.[0]?.qty || 0}</TableCell>
              <TableCell>{ord.total}</TableCell>
              <TableCell>{ord.customer?.name || "N/A"}</TableCell>
              <TableCell>{ord.address}</TableCell>
              <TableCell>
                <Select
                  value={selectedStatus[ord.id] || ord.status || "PLACED"}
                  onValueChange={(value) =>
                    setSelectedStatus((prev) => ({ ...prev, [ord.id]: value }))
                  }
                >
                  <SelectTrigger className="w-35">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map((stat) => (
                      <SelectItem key={stat} value={stat}>
                        {stat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>
                <UpdateOrderStatusButton
                  order={ord}
                  nextStatus={selectedStatus[ord.id]}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
