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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { ShieldCheck, User as UserIcon, Mail } from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string | null;
  role?: string | null;
  status?: string | null;
  createdAt: string;
}

const roles = ["ADMIN", "CUSTOMER", "PROVIDER"];

export default function UserTable({ data }: { data: User[] }) {
  async function changeRole(id: string, role: string) {
    const toastId = toast.loading("Updating security permissions...");
    try {
      await updateUserRole(id, role);
      toast.success(`Role updated to ${role}`, { id: toastId });
    } catch (error) {
      toast.error("Could not update role", { id: toastId });
    }
  }

  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead className="w-75">User</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Join Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((user) => (
            <TableRow key={user.id} className="hover:bg-muted/30 transition-colors">
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9 border border-border">
                    <AvatarImage src={user.image || ""} />
                    <AvatarFallback className="bg-orange-500/10 text-orange-600">
                      {user.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-medium leading-none">{user.name}</span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                      <Mail className="h-3 w-3" /> {user.email}
                    </span>
                  </div>
                </div>
              </TableCell>

              <TableCell>
                <Select
                  defaultValue={user.role || "CUSTOMER"}
                  onValueChange={(value) => changeRole(user.id, value)}
                >
                  <SelectTrigger className="w-32 h-8 text-xs font-semibold focus:ring-orange-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role} value={role} className="text-xs">
                        <div className="flex items-center gap-2">
                          {role === "ADMIN" && <ShieldCheck className="h-3 w-3 text-red-500" />}
                          {role}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>

              <TableCell>
                <Badge 
                  variant={user.status === "ACTIVE" ? "default" : "secondary"}
                  className={`rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                    user.status === "ACTIVE" 
                    ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" 
                    : "bg-orange-500/10 text-orange-600"
                  }`}
                >
                  {user.status || "PENDING"}
                </Badge>
              </TableCell>

              <TableCell className="text-right text-muted-foreground text-xs tabular-nums">
                {new Date(user.createdAt).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}