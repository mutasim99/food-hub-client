import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

 const status = ["PLACED","PREPARING","READY","DELIVERED","CANCELLED"]

export default function ProviderOrderForm({ order }: any) {

  return (
    <div>
      <Table className="border-4 rounded-md mt-10">
        <TableHeader>
          <TableRow>
            <TableHead>Food Name</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Total price</TableHead>
            <TableHead>Customer name</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {order.map((ord:any) => (
            
            
            <TableRow>
              <TableCell>{ord.items[0].meal.name}</TableCell>
              <TableCell>{ord.items[0].qty}</TableCell>
              <TableCell>{ord.total}</TableCell>
              <TableCell>{ord.customer.name}</TableCell>
              <TableCell>{ord.address}</TableCell>
              <TableCell>{ord.status}</TableCell>
              {/* Change Status */}
              <TableCell>
                <Select
                  defaultValue={ord.status || "PLACED"}
                  
                >
                  <SelectTrigger className="w-35">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {status.map((stat) => (
                      <SelectItem key={stat} value={stat}>
                        {stat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
