"use client";
import * as z from "zod";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { ShoppingBag, X } from "lucide-react";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { createOrder } from "@/actions/order.action";
import { authClient } from "@/lib/auth-client";

type Meal = {
  id: string;
  name: string;
};

const orderSchema = z.object({
  address: z.string().min(10, "Enter full delivery address"),
  qty: z.number().min(1, "Quantity must be at least 1"),
});

export default function OrderButton({ meal }: { meal: Meal }) {
  
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
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
        closeModal();
      } catch (error) {
        toast.error("Order creation failed", { id: toastId });
      }
    },
  });
  return (
    <>
      <button
        onClick={openModal}
        className="bg-orange-500 hover:bg-orange-600 text-white px-2 py-2 rounded-xl font-bold flex items-center gap-3 transition-all active:scale-95 shadow-lg shadow-orange-500/20 cursor-pointer"
      >
        <ShoppingBag className="w-5 h-5" /> OrderNow
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={closeModal}
          />
          <div className="relative bg-zinc-900 border border-zinc-800 w-full max-w-md rounded-3xl p-8 shadow-2xl animate-in zoom-in-95 duration-200">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold text-white mb-2">Checkout</h2>
            <p className="text-zinc-400 mb-6">
              Confirm your order for {""}{" "}
              <span className="text-orange-500 font-semibold">{meal.name}</span>
            </p>

            <form
              id="order"
              onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
              }}
              className="space-y-6"
            >
              <FieldGroup>
                <form.Field
                  name="address"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>
                          Delivery Address
                        </FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          type="text"
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="House, Road, Area"
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
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
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                />
              </FieldGroup>
            </form>
            <div className="my-4">
              <Button
                form="order"
                className="w-full bg-orange-500 hover:bg-orange-600 cursor-pointer"
              >
                Confirm Order
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
