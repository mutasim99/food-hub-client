"use client";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { FaGithub, FaGoogle } from "react-icons/fa6";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const fromSchema = z.object({
  email: z.email(),
  password: z.string().min(8, "Password must be 8 character"),
});

export default function LoginForm() {
  const router = useRouter()
  const handleGoogleLogin = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
      callbackURL: "http://localhost:3000",
    });
  };
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: fromSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("User LoggingIn");
      try {
        const { data, error } = await authClient.signIn.email(value);
        
        if (error) {
          toast.error(error.message, { id: toastId });
          return
        }
        if (data) {
          router.push('/')
        }
        toast.success("Successfully loggedIn", { id: toastId });
      } catch (error) {
        toast.error("Something went wrong", { id: toastId });
      }
    },
  });
  return (
    <div className="w-full max-w-md p-8 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-2xl">
      <div>
        <div className="space-y-2.5">
          <h2 className="text-lg font-bold text-center">
            Login into your account!!
          </h2>
          <p className="text-center">Welcome Back</p>
        </div>
        <div className="mt-6">
          <form
            id="register"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <FieldGroup>
              <form.Field
                name="email"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor="email">Email</FieldLabel>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={field.state.value}
                        placeholder="Please enter a existing email"
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
                name="password"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor="password">Password</FieldLabel>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        value={field.state.value}
                        placeholder="Please enter password"
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
        <div>
          <Button form="register" className="w-full mt-6 hover:cursor-pointer">
            Login
          </Button>
        </div>

        <hr className="my-4" />
        <div className="flex flex-col md:flex-row justify-center gap-6">
          <button
            className="flex items-center gap-2 p-2  rounded-lg cursor-pointer"
            onClick={() => handleGoogleLogin()}
          >
            <FaGoogle className="text-blue-500" /> LogIn With Google
          </button>
          <button className="flex items-center gap-2 p-2  rounded-lg cursor-pointer">
            <FaGithub className="text-red-500" /> LogIn With Github
          </button>
        </div>
      </div>
    </div>
  );
}