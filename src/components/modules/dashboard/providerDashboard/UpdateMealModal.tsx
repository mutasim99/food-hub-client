"use client";

import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { toast } from "sonner";
import { updateMeal } from "@/actions/provider.meal.action";
import {
  X,
  Upload,
  Save,
  UtensilsCrossed,
  DollarSign,
  AlignLeft,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { useRouter } from "next/navigation";

const updateMealSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  price: z
    .string()
    .refine(
      (val) => val === "" || !isNaN(Number(val)),
      "Price must be a number"
    )
    .optional(),
  description: z.string().optional(),
  image: z.any().optional(),
});

export default function UpdateMealModal({ meal, onClose }: any) {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      name: meal.name || "",
      price: String(meal.price || ""),
      description: meal.description || "",
      image: undefined as File | undefined,
    },
    validators: {
      onSubmit: ({ value }) => {
        const result = updateMealSchema.safeParse(value);
        if (!result.success) {
          return result.error.issues[0]?.message ?? "Validation failed";
        }
        return undefined;
      },
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Syncing changes...");
      try {
        const formData = new FormData();

        if (value.name && value.name !== meal.name) formData.append("name", value.name);
        if (value.price && Number(value.price) !== meal.price) formData.append("price", value.price);
        if (value.description !== meal.description) formData.append("description", value.description);
        if (value.image instanceof File) formData.append("image", value.image);

        if ([...formData.keys()].length === 0) {
          toast.warning("No changes detected", { id: toastId });
          return;
        }

        const result = await updateMeal(meal.id, formData);

        if (result?.success) {
          toast.success("Meal updated successfully", { id: toastId });
          onClose();
          router.refresh();
        } else {
          toast.error(result?.message || "Update failed", { id: toastId });
        }
      } catch (error) {
        toast.error("An unexpected error occurred", { id: toastId });
      }
    },
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-zinc-950/40 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-xl overflow-hidden rounded-[2rem] border border-zinc-200 bg-white shadow-2xl transition-all dark:border-zinc-800 dark:bg-[#0a0a0a]">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-100 bg-zinc-50/50 px-8 py-6 dark:border-zinc-800/50 dark:bg-zinc-900/20">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-500 shadow-inner">
              <UtensilsCrossed size={22} />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                Update <span className="text-orange-500">Meal</span>
              </h2>
              <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                Reference: #{meal.id.slice(-8)}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="group flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-zinc-200/50 dark:hover:bg-zinc-800"
          >
            <X size={20} className="text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-zinc-100" />
          </button>
        </div>

        {/* Form Content */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="p-8"
        >
          <FieldGroup className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* NAME */}
              <form.Field name="name">
                {(field) => {
                  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                        <AlignLeft size={14} className="mr-2 text-orange-500" /> Meal Name
                      </FieldLabel>
                      <Input
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Salmon Steak..."
                        className="h-11 rounded-xl border-zinc-200 bg-zinc-50/50 focus:ring-orange-500/20 dark:border-zinc-800 dark:bg-zinc-900/50"
                      />
                      {isInvalid && <FieldError errors={field.state.meta.errors} />}
                    </Field>
                  );
                }}
              </form.Field>

              {/* PRICE */}
              <form.Field name="price">
                {(field) => {
                  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                        <DollarSign size={14} className="mr-2 text-orange-500" /> Price (Tk)
                      </FieldLabel>
                      <Input
                        type="number"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="0.00"
                        className="h-11 rounded-xl border-zinc-200 bg-zinc-50/50 focus:ring-orange-500/20 dark:border-zinc-800 dark:bg-zinc-900/50"
                      />
                      {isInvalid && <FieldError errors={field.state.meta.errors} />}
                    </Field>
                  );
                }}
              </form.Field>
            </div>

            {/* DESCRIPTION */}
            <form.Field name="description">
              {(field) => (
                <Field>
                  <FieldLabel className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                    <FileText size={14} className="mr-2 text-orange-500" /> Description
                  </FieldLabel>
                  <Textarea
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    rows={3}
                    className="resize-none rounded-xl border-zinc-200 bg-zinc-50/50 focus:ring-orange-500/20 dark:border-zinc-800 dark:bg-zinc-900/50"
                    placeholder="Describe the flavors, ingredients..."
                  />
                </Field>
              )}
            </form.Field>

            {/* IMAGE UPLOAD */}
            <form.Field name="image">
              {(field) => (
                <Field>
                  <FieldLabel className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                    <Upload size={14} className="mr-2 text-orange-500" /> Visual Preview
                  </FieldLabel>
                  <div className="relative">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => field.handleChange(e.target.files?.[0])}
                      className="cursor-pointer rounded-xl border-zinc-200 bg-zinc-50/50 file:mr-4 file:rounded-lg file:border-0 file:bg-orange-500 file:px-3 file:py-1 file:text-[10px] file:font-bold file:uppercase file:text-white dark:border-zinc-800 dark:bg-zinc-900/50"
                    />
                  </div>
                  <p className="mt-2 text-[10px] font-medium italic text-zinc-400">
                    Leave blank to maintain current photography.
                  </p>
                </Field>
              )}
            </form.Field>
          </FieldGroup>

          {/* Footer Actions */}
          <div className="mt-10 flex items-center justify-end gap-4 border-t border-zinc-100 pt-8 dark:border-zinc-800">
            <Button 
              type="button" 
              variant="ghost" 
              onClick={onClose}
              className="px-6 font-semibold text-zinc-500 hover:text-zinc-900 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
            >
              Cancel
            </Button>

            <form.Subscribe selector={(s) => s.isSubmitting}>
              {(isSubmitting) => (
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-11 min-w-40 rounded-xl bg-orange-500 px-8 font-bold text-white shadow-lg shadow-orange-500/20 transition-all hover:bg-orange-600 hover:shadow-orange-500/40 active:scale-95 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Saving...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Save size={18} /> Save Changes
                    </span>
                  )}
                </Button>
              )}
            </form.Subscribe>
          </div>
        </form>
      </div>
    </div>
  );
}