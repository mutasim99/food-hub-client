"use client";
import { createOrder } from "@/actions/order.action";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import * as z from "zod";

const orderSchema = z.object({
  address: z.string().min(10, "Enter full delivery address"),
  qty: z.number().min(1, "Quantity must be at least 1"),
});

export default function OrderForm({
  meal,
  onClose,
}: {
  meal: { id: string; name: string } | null;
  onClose: () => void;
}) {
  const form = useForm({
    defaultValues: {
      address: "",
      qty: 1,
    },
    validators: {
      onSubmit: orderSchema,
    },
    onSubmit: async ({ value }) => {
      if (!meal) {
        toast.error("Meal not selected");
        return;
      }
      const toastId = toast.loading("Creating order...");
      try {
        await createOrder({
          address: value.address,
          items: [{ mealId: meal?.id, qty: value.qty }],
        });
        toast.success("Order Created", { id: toastId });
        onClose();
      } catch (error) {
        toast.error("Order creation failed", { id: toastId });
      }
    },
  });
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="space-y-4"
      >
        <FieldGroup>
          <form.Field
            name="address"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Delivery Address</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    type="text"
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="House, Road, Area"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />
          <form.Field
            name="qty"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Quantity</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    type="number"
                    min={1}
                    step={1}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      if (!Number.isInteger(value) || value < 1) {
                        return;
                      }
                      field.handleChange(value);
                    }}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />
        </FieldGroup>

        <div className="my-4">
          <Button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 cursor-pointer"
          >
            Confirm Order
          </Button>
        </div>
      </form>
    </div>
  );
}
