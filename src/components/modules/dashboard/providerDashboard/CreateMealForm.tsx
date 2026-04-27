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
    <div className="max-w-2xl mx-auto">
      {/* Header Section */}
      <div className="mb-10 text-center md:text-left">
        <h2 className="text-3xl font-extrabold text-white tracking-tight">
          Add New Delicacy
        </h2>
        <p className="text-zinc-400 mt-2">
          Fill in the details to publish a new meal to your restaurant's digital
          menu.
        </p>
      </div>

      <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-3xl shadow-2xl backdrop-blur-sm">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="space-y-8"
        >
          <FieldGroup className="space-y-6">
            {/* Grid for Name and Price */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <form.Field
                  name="name"
                  validators={{
                    onChange: ({ value }) =>
                      getFieldError(formSchema.shape.name, value),
                  }}
                >
                  {(field) => (
                    <Field>
                      <FieldLabel className="flex items-center gap-2 text-zinc-300 mb-2">
                        <Utensils size={16} className="text-orange-500" /> Meal
                        Name
                      </FieldLabel>
                      <Input
                        placeholder="e.g. Truffle Mushroom Risotto"
                        className="h-12 bg-zinc-950 border-zinc-800 focus:ring-orange-500/20"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      <FieldError
                        className="text-red-400 text-xs mt-1"
                        errors={field.state.meta.errors}
                      />
                    </Field>
                  )}
                </form.Field>
              </div>

              <form.Field
                name="price"
                validators={{
                  onChange: ({ value }) =>
                    getFieldError(formSchema.shape.price, value),
                }}
              >
                {(field) => (
                  <Field>
                    <FieldLabel className="flex items-center gap-2 text-zinc-300 mb-2">
                      Price
                    </FieldLabel>
                    <div className="relative">
                      <Input
                        type="number"
                        placeholder="0.00"
                        min={0}
                        className="h-12 pl-9 bg-zinc-950 border-zinc-800 focus:ring-orange-500/20"
                        value={field.state.value}
                        onChange={(e) => {
                          let val = e.target.valueAsNumber;
                          if (Number.isNaN(val)) {
                            val = 0;
                          }
                          if (val < 0) {
                            val = 0;
                          }
                          field.handleChange(val)
                        }}
                      />
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">
                        $
                      </span>
                    </div>
                    <FieldError
                      className="text-red-400 text-xs mt-1"
                      errors={field.state.meta.errors}
                    />
                  </Field>
                )}
              </form.Field>
            </div>

            {/* Category Dropdown */}
            <form.Field
              name="categoryId"
              validators={{
                onChange: ({ value }) =>
                  getFieldError(formSchema.shape.categoryId, value),
              }}
            >
              {(field) => (
                <Field>
                  <FieldLabel className="flex items-center gap-2 text-zinc-300 mb-2">
                    <Tag size={16} className="text-orange-500" /> Category
                  </FieldLabel>
                  <select
                    className="w-full h-12 px-4 rounded-xl border border-zinc-800 bg-zinc-950 text-zinc-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all appearance-none"
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
                  <FieldError
                    className="text-red-400 text-xs mt-1"
                    errors={field.state.meta.errors}
                  />
                </Field>
              )}
            </form.Field>

            {/* Description Area */}
            <form.Field
              name="description"
              validators={{
                onChange: ({ value }) =>
                  getFieldError(formSchema.shape.description, value),
              }}
            >
              {(field) => (
                <Field>
                  <FieldLabel className="flex items-center gap-2 text-zinc-300 mb-2">
                    <AlignLeft size={16} className="text-orange-500" />{" "}
                    Description
                  </FieldLabel>
                  <Textarea
                    placeholder="Describe the ingredients, taste, and preparation..."
                    className="min-h-30 bg-zinc-950 border-zinc-800 focus:ring-orange-500/20 resize-none p-4"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldError
                    className="text-red-400 text-xs mt-1"
                    errors={field.state.meta.errors}
                  />
                </Field>
              )}
            </form.Field>

            {/* Professional Image Upload */}
            <form.Field name="image">
              {(field) => (
                <Field>
                  <FieldLabel className="flex items-center gap-2 text-zinc-300 mb-2">
                    <ImagePlus size={16} className="text-orange-500" /> Display
                    Image
                  </FieldLabel>
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className={`relative h-56 border-2 border-dashed rounded-3xl transition-all flex flex-col items-center justify-center gap-3 group cursor-pointer overflow-hidden
                      ${
                        preview
                          ? "border-orange-500/50"
                          : "border-zinc-800 hover:border-zinc-700 bg-zinc-950/50"
                      }`}
                  >
                    {preview ? (
                      <>
                        <img
                          src={preview}
                          alt="preview"
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <p className="text-white text-sm font-medium">
                            Click to replace image
                          </p>
                        </div>
                      </>
                    ) : (
                      <div className="text-center p-6">
                        <div className="w-12 h-12 rounded-2xl bg-zinc-900 flex items-center justify-center mx-auto mb-3 border border-zinc-800 group-hover:scale-110 transition-transform">
                          <UploadCloud className="text-orange-500" size={24} />
                        </div>
                        <p className="text-sm font-medium text-zinc-300">
                          Drop your image here
                        </p>
                        <p className="text-xs text-zinc-500 mt-1">
                          High resolution PNG or JPG (max 5MB)
                        </p>
                      </div>
                    )}
                  </div>
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
                  <FieldError
                    className="text-red-400 text-xs mt-1"
                    errors={field.state.meta.errors}
                  />
                </Field>
              )}
            </form.Field>
          </FieldGroup>

          {/* Subscribe to Submit Button */}
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit, isSubmitting]) => (
              <Button
                type="submit"
                disabled={!canSubmit || isSubmitting}
                className="w-full h-14 rounded-2xl bg-orange-600 hover:bg-orange-500 text-white text-lg font-bold transition-all shadow-xl shadow-orange-900/20 active:scale-[0.98] disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Publish to Menu"
                )}
              </Button>
            )}
          </form.Subscribe>
        </form>
      </div>
    </div>
  );
}
