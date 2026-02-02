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
import React from "react";
import { toast } from "sonner";
import * as z from "zod";

const fromSchema = z.object({
  shopName: z.string().min(3, "ShopName is required"),
  address: z.string().min(8, "Address is required"),
  phone: z.string().min(8, "Phone number is required"),
  image: z.string().min(8, "Image is required"),
});

export default function BecomeProviderFrom() {
  const form = useForm({
    defaultValues: {
      shopName: "",
      address: "",
      phone: "",
      image: "",
    },
    validators: {
      onSubmit: fromSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Submitting Application...");
      try {
        const shopName = value.shopName;
        const address = value.address;
        const phone = value.phone;
        const image = value.image;
        await becomeAProvider({ shopName, address, phone, image });
        toast.success("Now you are a provider", { id: toastId });
      } catch (error) {
        toast.error("Creation failed");
      }
    },
  });
  return (
    <div>
      <div>
        <form
          id="provider"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field
              name="shopName"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor="name">Sop Name</FieldLabel>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={field.state.value}
                      placeholder="Please enter Shop name"
                      onChange={(e) => field.handleChange(e.target.value)}
                      required
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
            <form.Field
              name="address"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor="address">Address</FieldLabel>
                    <Input
                      id="address"
                      name="address"
                      type="text"
                      value={field.state.value}
                      placeholder="Please enter shop address"
                      onChange={(e) => field.handleChange(e.target.value)}
                      required
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
            <form.Field
              name="phone"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor="phone">Phone</FieldLabel>
                    <Input
                      id="phone"
                      name="phone"
                      type="text"
                      value={field.state.value}
                      placeholder="Please enter a valid contact number"
                      onChange={(e) => field.handleChange(e.target.value)}
                      required
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
            <form.Field
              name="image"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor="image">Image</FieldLabel>
                    <Input
                      id="image"
                      name="image"
                      type="text"
                      value={field.state.value}
                      placeholder="Please enter a valid contact number"
                      onChange={(e) => field.handleChange(e.target.value)}
                      required
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
      </div>
      <Button
        form="provider"
        className="w-full bg-orange-500 py-2.5 mt-6 hover:cursor-pointer"
      >
        Login
      </Button>
    </div>
  );
}
