"use client";
import { updateUserRole } from "@/actions/user.action";
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
import { toast } from "sonner";

interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string | null;
  role?: string | null;
  phone?: string | null;
  status?: string | null;
  createdAt: string;
  updatedAt: string;
}
const roles = ["ADMIN", "CUSTOMER", "PROVIDER"];
export default function UserTable({ data }: { data: User[] }) {
  async function changeRole(id: string, role: string) {
    const toastId = toast.loading("Updating Role...");
    try {
      await updateUserRole(id, role);
      toast.success("Role updated", { id: toastId });
    } catch (error) {
      toast.error("Failed", { id: toastId });
    }
  }
  return (
    <div>
      <Table className="border-4 rounded-md">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              {/* Role drop down */}
              <TableCell>
                <Select
                  defaultValue={user.role || "CUSTOMER"}
                  onValueChange={(value) => changeRole(user.id, value)}
                >
                  <SelectTrigger className="w-35">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role} value={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>{user.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
