"use client";

import { becomeAProvider } from "@/actions/customer.action";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "@tanstack/react-form";
import { useState, useRef } from "react";
import { toast } from "sonner";
import * as z from "zod";
import {
  Store,
  MapPin,
  Phone,
  Image as ImageIcon,
  Loader2,
  UploadCloud,
} from "lucide-react";

const formSchema = z.object({
  shopName: z.string().min(3, "Shop name must be at least 3 characters"),
  address: z.string().min(8, "Please provide a full address"),
  phone: z.string().min(8, "Valid phone number is required"),
  image: z.instanceof(File, { message: "Shop image is required" }).nullable(),
});

export default function BecomeProviderForm() {
  const [preview, setPreview] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm({
    defaultValues: {
      shopName: "",
      address: "",
      phone: "",
      image: null as File | null,
    },
    
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Submitting your application...");

      try {
        const formData = new FormData();
        formData.append("shopName", value.shopName);
        formData.append("address", value.address);
        formData.append("phone", value.phone);

        if (value.image) {
          formData.append("image", value.image);
        }

        const result = await becomeAProvider(formData);

        if (result?.error) {
          toast.error(result.error, { id: toastId });
        } else {
          toast.success("Congratulations! You are now a provider 🎉", {
            id: toastId,
          });
          
        }
      } catch (error) {
        toast.error("Something went wrong. Please try again.", { id: toastId });
      }
    },
  });

  return (
    <div className="max-w-2xl mx-auto p-8 bg-zinc-950 rounded-2xl border border-zinc-800 shadow-2xl">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Store className="text-orange-500" /> Become a Provider
        </h2>
        <p className="text-zinc-400 text-sm mt-1">
          Fill out the details below to start selling on FoodHub.
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-6"
      >
        <FieldGroup className="space-y-4">
          {/* Shop Name */}
          <form.Field name="shopName">
            {(field) => (
              <Field className="space-y-2">
                <FieldLabel className="text-zinc-300 flex items-center gap-2">
                  <Store size={14} className="text-orange-500" /> Shop Name
                </FieldLabel>
                <Input
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="e.g. Gourmet Burgers"
                  className="bg-zinc-900/50 border-zinc-800 focus:border-orange-500/50 h-11"
                />
                <FieldError
                  className="text-xs text-red-500"
                  errors={field.state.meta.errors}
                />
              </Field>
            )}
          </form.Field>

          {/* Address */}
          <form.Field name="address">
            {(field) => (
              <Field className="space-y-2">
                <FieldLabel className="text-zinc-300 flex items-center gap-2">
                  <MapPin size={14} className="text-orange-500" /> Business
                  Address
                </FieldLabel>
                <Input
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Street, City, Postal Code"
                  className="bg-zinc-900/50 border-zinc-800 focus:border-orange-500/50 h-11"
                />
                <FieldError
                  className="text-xs text-red-500"
                  errors={field.state.meta.errors}
                />
              </Field>
            )}
          </form.Field>

          {/* Phone */}
          <form.Field name="phone">
            {(field) => (
              <Field className="space-y-2">
                <FieldLabel className="text-zinc-300 flex items-center gap-2">
                  <Phone size={14} className="text-orange-500" /> Contact Phone
                </FieldLabel>
                <Input
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="bg-zinc-900/50 border-zinc-800 focus:border-orange-500/50 h-11"
                />
                <FieldError
                  className="text-xs text-red-500"
                  errors={field.state.meta.errors}
                />
              </Field>
            )}
          </form.Field>

          {/* Image Upload */}
          <form.Field name="image">
            {(field) => (
              <Field className="space-y-2">
                <FieldLabel className="text-zinc-300 flex items-center gap-2">
                  <ImageIcon size={14} className="text-orange-500" /> Shop
                  Banner Image
                </FieldLabel>

                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="relative group cursor-pointer"
                >
                  {preview ? (
                    <div className="relative w-full h-48 rounded-xl overflow-hidden border border-zinc-700">
                      <img
                        src={preview}
                        alt="preview"
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className="text-white text-xs font-medium">
                          Click to change image
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-48 flex flex-col items-center justify-center bg-zinc-900/50 border-2 border-dashed border-zinc-800 rounded-xl hover:border-orange-500/40 hover:bg-zinc-900 transition-all">
                      <UploadCloud className="text-zinc-600 mb-2" size={32} />
                      <p className="text-zinc-500 text-sm">
                        Click to upload shop banner
                      </p>
                      <p className="text-zinc-600 text-[10px] mt-1 uppercase tracking-widest">
                        JPG, PNG up to 2MB
                      </p>
                    </div>
                  )}
                </div>

                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    field.handleChange(file);
                    setPreview(URL.createObjectURL(file));
                  }}
                />
                <FieldError
                  className="text-xs text-red-500"
                  errors={field.state.meta.errors}
                />
              </Field>
            )}
          </form.Field>
        </FieldGroup>

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button
              type="submit"
              disabled={!canSubmit || isSubmitting}
              className="w-full h-12 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-orange-900/20 active:scale-[0.98]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Submit Application"
              )}
            </Button>
          )}
        />
      </form>
    </div>
  );
}
