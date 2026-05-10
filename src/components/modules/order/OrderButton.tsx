"use client";

import * as z from "zod";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { ShoppingBag, X, MapPin, Plus, Minus, Loader2 } from "lucide-react";
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

type Meal = {
  id: string;
  name: string;
};

const orderSchema = z.object({
  address: z.string().min(10, "Enter full delivery address (min 10 chars)"),
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
        const result = await createOrder({
          address: value.address,
          items: [{ mealId: meal?.id, qty: value.qty }],
        });
        if (result.error) {
          toast.error(
            typeof result.error === "string"
              ? result.error
              : "Order creation failed",
            { id: toastId }
          );
          return;
        }
        toast.success("Order Created successfully! 🎉", { id: toastId });
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
        className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-2xl font-black flex items-center gap-3 transition-all active:scale-95 shadow-xl shadow-orange-500/20 cursor-pointer"
      >
        <ShoppingBag className="w-5 h-5" /> Order Now
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
  
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-md animate-in fade-in duration-300"
            onClick={closeModal}
          />

      
          <div className="relative bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl animate-in zoom-in-95 duration-200">
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-8">
              <h2 className="text-3xl font-black text-zinc-900 dark:text-white tracking-tight">
                Checkout
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400 mt-2">
                Ordering{" "}
                <span className="text-orange-500 font-bold underline decoration-orange-500/30 underline-offset-4">
                  {meal.name}
                </span>
              </p>
            </div>

            <form
              id="order-form"
              onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
              }}
              className="space-y-8"
            >
              <FieldGroup className="space-y-6">

                <form.Field name="address">
                  {(field) => (
                    <div className="space-y-2">
                      <FieldLabel className="text-xs font-black uppercase tracking-widest text-zinc-500 ml-1">
                        Delivery Address
                      </FieldLabel>
                      <div className="relative group">
                        <MapPin
                          className="absolute left-4 top-4 text-zinc-400 group-focus-within:text-orange-500 transition-colors"
                          size={18}
                        />
                        <textarea
                          id={field.name}
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="House #, Road #, Area Name"
                          className="w-full min-h-25 pl-11 pr-4 py-3 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all text-sm font-medium resize-none"
                        />
                      </div>
                      <FieldError
                        className="text-[10px] font-bold text-red-500 uppercase tracking-tight px-1"
                        errors={field.state.meta.errors}
                      />
                    </div>
                  )}
                </form.Field>


                <form.Field name="qty">
                  {(field) => (
                    <div className="space-y-2">
                      <FieldLabel className="text-xs font-black uppercase tracking-widest text-zinc-500 ml-1">
                        How many portions?
                      </FieldLabel>
                      <div className="flex items-center gap-4 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 p-2 rounded-2xl w-fit">
                        <button
                          type="button"
                          onClick={() =>
                            field.handleChange(
                              Math.max(1, field.state.value - 1)
                            )
                          }
                          className="h-10 w-10 flex items-center justify-center rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:text-orange-500 transition-colors"
                        >
                          <Minus size={16} />
                        </button>

                        <span className="text-xl font-black min-w-10 text-center dark:text-white">
                          {field.state.value}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            field.handleChange(field.state.value + 1)
                          }
                          className="h-10 w-10 flex items-center justify-center rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:text-orange-500 transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <FieldError
                        className="text-[10px] font-bold text-red-500 uppercase tracking-tight px-1"
                        errors={field.state.meta.errors}
                      />
                    </div>
                  )}
                </form.Field>
              </FieldGroup>

              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit, isSubmitting]) => (
                  <Button
                    type="submit"
                    disabled={!canSubmit || isSubmitting}
                    className="w-full h-16 bg-orange-500 hover:bg-orange-600 text-white font-black text-lg rounded-2xl transition-all shadow-xl shadow-orange-500/20 active:scale-[0.98] disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Confirm & Pay"
                    )}
                  </Button>
                )}
              />
            </form>
          </div>
        </div>
      )}
    </>
  );
}
