"use client";
import { useState, useRef } from "react";
import { createCategory } from "@/actions/category.action";
import { Button } from "@/components/ui/button";
import { UploadCloud, X, ImageIcon } from "lucide-react";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(30, "Name must be less than 30 characters"),
  image: z.instanceof(File, { message: "Category image is required" }),
});

export default function CreateCategoryForm() {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm({
    defaultValues: {
      name: "",
      image: null as File | null,
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Creating category...", {
        className: "dark:bg-zinc-900 dark:text-zinc-100 dark:border-zinc-800",
      });

      try {
        const formData = new FormData();
        formData.append("name", value.name);

        if (value.image) {
          formData.append("image", value.image);
        }

        const result = await createCategory(formData);

        if (result.error) {
          toast.error(result.error.message, { id: toastId });
        } else {
          toast.success("Category created successfully!", { id: toastId });
          form.reset();
          setPreview(null);
          if (fileInputRef.current) fileInputRef.current.value = "";
        }
      } catch (error) {
        toast.error("An unexpected error occurred", { id: toastId });
      }
    },
  });

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: any
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      field.handleChange(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = (field: any) => {
    setPreview(null);
    field.handleChange(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="max-w-xl mx-auto p-6 md:p-8 bg-white dark:bg-zinc-950 rounded-2xl shadow-xl border border-zinc-100 dark:border-zinc-800/50 transition-colors duration-300">
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400 mb-4">
          <ImageIcon size={24} />
        </div>
        <h2 className="text-3xl font-extrabold text-zinc-950 dark:text-white tracking-tight">
          Create New Category
        </h2>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400 max-w-sm mx-auto">
          Add a unique name and an engaging image to help customers find what
          they need.
        </p>
      </div>

      <form
        id="category-form"
        className="space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        {/* Category Name  */}
        <form.Field
          name="name"
          children={(field) => {
            const isInvalid = field.state.meta.errors.length > 0;
            return (
              <div className="space-y-2">
                <label
                  htmlFor={field.name}
                  className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200"
                >
                  Category Name
                </label>
                <input
                  id={field.name}
                  name={field.name}
                  type="text"
                  value={field.state.value}
                  placeholder="e.g., Summer Collection"
                  onChange={(e) => field.handleChange(e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 outline-none
                    /* Light Mode */
                    bg-white text-zinc-950 border-zinc-200 placeholder:text-zinc-400
                    focus:border-orange-500 focus:ring-2 focus:ring-orange-100
                    /* Dark Mode */
                    dark:bg-zinc-900 dark:text-white dark:border-zinc-700 dark:placeholder:text-zinc-600
                    dark:focus:border-orange-400 dark:focus:ring-orange-950/50
                    /* Invalid State */
                    ${
                      isInvalid
                        ? "border-red-500 dark:border-red-600 focus:border-red-500 focus:ring-red-100 dark:focus:ring-red-950"
                        : ""
                    }
                  `}
                />
                {isInvalid && (
                  <p className="text-xs font-medium text-red-600 dark:text-red-400 pt-1">
                    {field.state.meta.errors.join(", ")}
                  </p>
                )}
              </div>
            );
          }}
        />

        {/* Category Image  */}
        <form.Field
          name="image"
          children={(field) => {
            const isInvalid = field.state.meta.errors.length > 0;
            return (
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                  Category Image
                </label>

                {!preview ? (
                  <label
                    className={`group flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-200
                      /* Light Mode */
                      bg-zinc-50 border-zinc-300 text-zinc-500 hover:bg-white hover:border-orange-400
                      /* Dark Mode */
                      dark:bg-zinc-900 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-900/50 dark:hover:border-orange-500
                      /* Invalid State */
                      ${
                        isInvalid
                          ? "border-red-400 dark:border-red-700 bg-red-50 dark:bg-red-950/20"
                          : ""
                      }
                    `}
                  >
                    <div className="flex flex-col items-center justify-center p-5 text-center">
                      <UploadCloud
                        className="w-10 h-10 mb-3 text-zinc-400 group-hover:text-orange-500 dark:text-zinc-600 dark:group-hover:text-orange-400 transition-colors"
                        strokeWidth={1.5}
                      />
                      <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                        Click to upload
                      </p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-1">
                        PNG, JPG, or WEBP (Max 1MB)
                      </p>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      className="hidden"
                      accept="image/png, image/jpeg, image/webp"
                      onChange={(e) => handleFileChange(e, field)}
                    />
                  </label>
                ) : (
                  <div className="relative group w-full h-48 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-700 shadow-inner bg-zinc-100 dark:bg-zinc-800">
                    <img
                      src={preview}
                      alt="Category preview"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-linear-to-b from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

                    <button
                      type="button"
                      onClick={() => clearImage(field)}
                      className="absolute top-3 right-3 p-1.5 rounded-full bg-white/80 dark:bg-zinc-900/80 text-zinc-900 dark:text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 hover:bg-red-500 hover:text-white dark:hover:bg-red-600 transition-all duration-200 shadow-md"
                      title="Remove image"
                    >
                      <X size={18} />
                    </button>

                    <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-white/80 dark:bg-zinc-900/80 text-xs font-medium text-zinc-900 dark:text-white backdrop-blur-sm shadow-sm">
                      {field.state.value?.name || "Image selected"}
                    </div>
                  </div>
                )}

                {isInvalid && (
                  <p className="text-xs font-medium text-red-600 dark:text-red-400 pt-1">
                    {field.state.meta.errors.join(", ")}
                  </p>
                )}
              </div>
            );
          }}
        />

        <div className="pt-4">
          <Button
            type="submit"
            form="category-form"
            className="w-full h-12 bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-500 text-white font-semibold rounded-xl shadow-lg shadow-orange-500/20 dark:shadow-orange-950/30 transition-all duration-200 active:scale-[0.98] focus:ring-2 focus:ring-orange-300 dark:focus:ring-orange-800 outline-none"
          >
            Create Category
          </Button>
        </div>
      </form>
    </div>
  );
}
