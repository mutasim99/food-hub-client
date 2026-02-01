"use client";
import { createCategory } from "@/actions/category.action";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().max(30),
  image: z.url(),
});
export default function CreateCategoryForm() {
  const form = useForm({
    defaultValues: {
      name: "",
      image: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Crating category...");
      try {
        await createCategory(value.name, value.image);
        toast.success("Category Added", { id: toastId });
      } catch (error) {
        toast.error("Something went wrong", { id: toastId });
      }
    },
  });
  return (
    <div className="max-w-md mx-auto space-y-4">
      <form
        className="space-y-4"
        id="category"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <form.Field
          name="name"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Category Name</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  placeholder="Enter a category name"
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
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
                <FieldLabel htmlFor={field.name}>Category ImageURL</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  placeholder="Enter Category Image"
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />
      </form>
      <div>
        <Button
          form="category"
          className="w-full mt-6 bg-orange-500 hover:cursor-pointer"
        >
          Create category
        </Button>
      </div>
    </div>
  );
}
