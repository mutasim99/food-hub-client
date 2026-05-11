"use client";

import { CreateMeal } from "@/actions/meal.action";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@tanstack/react-form";
import { useRef, useState } from "react";
import { toast } from "sonner";
import * as z from "zod";
import {
  UploadCloud,
  Loader2,
  Utensils,
  IndianRupee,
  Tag,
  AlignLeft,
  ImagePlus,
  Sparkles,
  DollarSign,
} from "lucide-react";

const formSchema = z.object({
  name: z.string().min(3, "Name is required"),
  price: z.number().min(1, "Price must be greater than 0"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  categoryId: z.string().min(1, "Please select a category"),
  image: z.instanceof(File, { message: "Please upload a meal image" }),
});

const getFieldError = <T,>(schema: z.ZodType<T>, value: unknown) => {
  const result = schema.safeParse(value);
  if (result.success) return undefined;
  return { message: result.error.issues[0]?.message };
};

export default function CreateMealForm({
  categories,
}: {
  categories: { id: string; name: string }[];
}) {
  const [preview, setPreview] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm({
    defaultValues: {
      name: "",
      price: 0,
      description: "",
      categoryId: "",
      image: null as unknown as File,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Processing meal creation...");
      try {
        const formData = new FormData();
        Object.entries(value).forEach(([k, v]) =>
          formData.append(k, v instanceof File ? v : String(v))
        );
        const res = await CreateMeal(formData);
        if (res?.error) return toast.error(res.error.message, { id: toastId });

        toast.success("Meal Added on menu! 🚀", { id: toastId });
        form.reset();
        setPreview("");
      } catch {
        toast.error("Network error occurred", { id: toastId });
      }
    },
  });

  return (
    <div className="space-y-10">
      <div className="relative p-8 rounded-[2.5rem] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 dark:opacity-20">
          <Utensils size={120} className="text-orange-500 -rotate-12" />
        </div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 text-xs font-bold uppercase tracking-widest mb-4">
            <Sparkles size={12} /> New Listing
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-white tracking-tight">
            Add New Delicacy
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 mt-2 max-w-md font-medium">
            Fill in the details to publish a new meal to your restaurant's
            digital menu.
          </p>
        </div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 rounded-[2rem] shadow-sm space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <form.Field name="name">
                {(field) => (
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
                      <Utensils size={16} className="text-orange-500" /> Meal
                      Name
                    </label>
                    <Input
                      placeholder="e.g. Truffle Mushroom Risotto"
                      className="h-12 bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-800 focus:ring-orange-500/20 rounded-xl"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </div>
                )}
              </form.Field>

              <form.Field name="categoryId">
                {(field) => (
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
                      <Tag size={16} className="text-orange-500" /> Category
                    </label>
                    <select
                      className="w-full h-12 px-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all appearance-none"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    >
                      <option value="">Select a category</option>
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </form.Field>
            </div>

            <form.Field name="description">
              {(field) => (
                <div className="space-y-2">
                  <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
                    <AlignLeft size={16} className="text-orange-500" />{" "}
                    Description
                  </label>
                  <Textarea
                    placeholder="Describe the ingredients, taste, and preparation..."
                    className="min-h-40 bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-800 focus:ring-orange-500/20 resize-none p-4 rounded-xl"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </div>
              )}
            </form.Field>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-[2rem] shadow-sm space-y-6">
            {/* Price Box */}
            <form.Field name="price">
              {(field) => (
                <div className="space-y-2">
                  <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
                    <DollarSign size={16} className="text-orange-500" /> Pricing
                    (Tk)
                  </label>
                  <div className="relative">
                    <Input
                      type="number"
                      className="h-12 pl-10 bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-800 rounded-xl"
                      value={field.state.value}
                      onChange={(e) =>
                        field.handleChange(e.target.valueAsNumber || 0)
                      }
                    />
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 font-bold">
                      Tk
                    </span>
                  </div>
                </div>
              )}
            </form.Field>

            <form.Field name="image">
              {(field) => (
                <div className="space-y-2">
                  <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
                    <ImagePlus size={16} className="text-orange-500" /> Display
                    Image
                  </label>
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className={`relative aspect-square border-2 border-dashed rounded-3xl transition-all flex flex-col items-center justify-center gap-3 cursor-pointer overflow-hidden ${
                      preview
                        ? "border-orange-500"
                        : "border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/30 hover:border-orange-500/50"
                    }`}
                  >
                    {preview ? (
                      <img
                        src={preview}
                        alt="preview"
                        className="h-full w-full object-cover animate-in fade-in zoom-in duration-300"
                      />
                    ) : (
                      <div className="text-center p-4">
                        <UploadCloud
                          className="text-zinc-400 dark:text-zinc-600 mx-auto mb-2"
                          size={32}
                        />
                        <p className="text-xs font-bold text-zinc-500 uppercase tracking-tighter">
                          Click to Upload
                        </p>
                      </div>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          field.handleChange(file);
                          setPreview(URL.createObjectURL(file));
                        }
                      }}
                    />
                  </div>
                </div>
              )}
            </form.Field>

            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
            >
              {([canSubmit, isSubmitting]) => (
                <Button
                  type="submit"
                  disabled={!canSubmit || isSubmitting}
                  className="w-full h-14 rounded-2xl bg-orange-600 hover:bg-orange-500 text-white font-black text-lg transition-all shadow-xl shadow-orange-500/20 active:scale-95"
                >
                  {isSubmitting ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    "Publish Menu Item"
                  )}
                </Button>
              )}
            </form.Subscribe>
          </div>
        </div>
      </form>
    </div>
  );
}
