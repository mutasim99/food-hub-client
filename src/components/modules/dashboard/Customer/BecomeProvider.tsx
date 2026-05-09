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
    <div className="bg-white dark:bg-zinc-900/40 backdrop-blur-xl rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800/50 shadow-2xl shadow-zinc-200/50 dark:shadow-none p-8 md:p-10 transition-all">
    <div className="mb-10 text-center lg:text-left">
      <h2 className="text-2xl font-black text-zinc-900 dark:text-white">
        Provider <span className="text-orange-500">Application</span>
      </h2>
      <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-2 font-medium">
        Verify your business details to get started.
      </p>
    </div>

    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="space-y-8"
    >
      <FieldGroup className="space-y-6">
      
        <form.Field name="shopName">
          {(field) => (
            <div className="space-y-2">
              <FieldLabel className="text-xs font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-400 ml-1">
                Shop Name
              </FieldLabel>
              <div className="relative group">
                <Store className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-orange-500 transition-colors" size={18} />
                <Input
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="e.g. Gourmet Burgers"
                  className="pl-12 bg-zinc-50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 focus:ring-2 focus:ring-orange-500/20 h-14 rounded-2xl transition-all font-medium"
                />
              </div>
              <FieldError className="text-[10px] font-bold text-red-500 uppercase tracking-tighter px-1" errors={field.state.meta.errors} />
            </div>
          )}
        </form.Field>

        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {/* Phone */}
           <form.Field name="phone">
             {(field) => (
               <div className="space-y-2">
                 <FieldLabel className="text-xs font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-400 ml-1">Contact Phone</FieldLabel>
                 <div className="relative group">
                   <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-orange-500 transition-colors" size={18} />
                   <Input
                     value={field.state.value}
                     onChange={(e) => field.handleChange(e.target.value)}
                     placeholder="+1 (555) 000-0000"
                     className="pl-12 bg-zinc-50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 h-14 rounded-2xl font-medium"
                   />
                 </div>
               </div>
             )}
           </form.Field>

           
           <form.Field name="address">
             {(field) => (
               <div className="space-y-2">
                 <FieldLabel className="text-xs font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-400 ml-1">Location</FieldLabel>
                 <div className="relative group">
                   <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-orange-500 transition-colors" size={18} />
                   <Input
                     value={field.state.value}
                     onChange={(e) => field.handleChange(e.target.value)}
                     placeholder="Street, City"
                     className="pl-12 bg-zinc-50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 h-14 rounded-2xl font-medium"
                   />
                 </div>
               </div>
             )}
           </form.Field>
        </div>

        
        <form.Field name="image">
          {(field) => (
            <div className="space-y-2">
              <FieldLabel className="text-xs font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-400 ml-1">Banner Image</FieldLabel>
              <div
                onClick={() => fileInputRef.current?.click()}
                className="relative group cursor-pointer overflow-hidden rounded-[2rem] transition-all"
              >
                {preview ? (
                  <div className="relative w-full h-56 border-2 border-orange-500/20">
                    <img src={preview} alt="preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                       <Button variant="secondary" size="sm" className="rounded-full">Change Photo</Button>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-56 flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-900/50 border-2 border-dashed border-zinc-200 dark:border-zinc-800 group-hover:border-orange-500/50 group-hover:bg-orange-500/5 transition-all">
                    <div className="h-14 w-14 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500 mb-4 group-hover:scale-110 transition-transform">
                      <UploadCloud size={28} />
                    </div>
                    <p className="text-zinc-900 dark:text-zinc-200 font-bold">Upload Shop Banner</p>
                    <p className="text-zinc-500 text-xs mt-1">High resolution PNG or JPG (Max 2MB)</p>
                  </div>
                )}
              </div>
              <input type="file" ref={fileInputRef} className="hidden" accept="image/*" 
                     onChange={(e) => {
                       const file = e.target.files?.[0];
                       if (file) { field.handleChange(file); setPreview(URL.createObjectURL(file)); }
                     }} 
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
              <Loader2 className="animate-spin" />
            ) : (
              "Launch Your Store"
            )}
          </Button>
        )}
      />
    </form>
  </div>
  );
}
