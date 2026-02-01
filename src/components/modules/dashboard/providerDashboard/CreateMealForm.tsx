"use client";
import { CreateMeal } from "@/actions/meal.action";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import * as z from "zod";

const createMealSchema = z.object({
  name: z.string().min(3, "Name is required"),
  price: z.number().min(1, "Price must be grater than 0"),
  description: z.string().min(10, "description is too short"),
  categoryId: z.string().min(1, "Please select a category"),
  image: z.url("Invalid image URL"),
});

export default function CreateMealForm({
  categories,
}: {
  categories: { id: string; name: string }[];
}) {
  const form = useForm({
    defaultValues: {
      name: "",
      price: 0,
      description: "",
      categoryId: "",
      image: "",
    },
    validators: {
      onSubmit: createMealSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        await CreateMeal(value);
        toast.success("Meal created");
      } catch (error) {
        toast.error("Failed to create meal");
      }
    },
  });
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="space-y-4"
      >
        {/* Meal Name */}
        <form.Field
          name="name"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Meal Name</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  type="text"
                  value={field.state.value}
                  placeholder="Enter a Meal name"
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />
        {/* Price */}
        <form.Field
          name="price"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Price</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  type="number"
                  placeholder="Enter Meal Price"
                  onChange={(e) => field.handleChange(Number(e.target.value))}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />
        {/* Description */}
        <form.Field
          name="description"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Meal Description</FieldLabel>
                <Textarea
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  placeholder="Enter a meal descriptions"
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />
        {/* Category dropdown */}
        <form.Field
          name="categoryId"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Select Category</FieldLabel>
                <select
                  className="w-full p-2 border rounded-md dark:bg-zinc-900 
                dark:text-white dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-offset-amber-500"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </Field>
            );
          }}
        />
        {/* Image */}
        <form.Field
          name="image"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Image Url</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  type="url"
                  value={field.state.value}
                  placeholder="Enter Image URL"
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />
        <Button
          type="submit"
          className="w-full text-white font-semibold bg-orange-500 hover:bg-orange-600 cursor-pointer"
        >
          Create Meal
        </Button>
      </form>
    </div>
  );
}
