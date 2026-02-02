import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import React from "react";
import OrderForm from "./OrderForm";

export default function OrderModal({
  open,
  onClose,
  meal,
}: {
  open: boolean;
  onClose: () => void;
  meal: {id:string, name:string} |null;
}) {
  if (!meal) {
    return null;
  }
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-center"> Order: {meal.name}</DialogTitle>
        </DialogHeader>
        <OrderForm meal={meal} onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
}
