"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

// ✅ Schema
const ForgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email"),
});

type ForgotPasswordInput = z.infer<typeof ForgotPasswordSchema>;

// ✅ API call
const sendResetLink = async (data: ForgotPasswordInput) => {
  const response = await fetch(
    "http://localhost:5000/api/auth/forgot-password",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }
  );

  const result = await response.json();
  if (!response.ok) throw new Error(result.message || "Request failed");
  return result;
};

export default function ForgetPassword() {
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const form = useForm<ForgotPasswordInput>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const mutation = useMutation({
    mutationFn: sendResetLink,
    onSuccess: () => {
      form.reset();
      setSuccessMessage("Reset link sent to your email.");
    },
    onError: (err: any) => {
      setFormError(err.message);
    },
  });

  const onSubmit = (data: ForgotPasswordInput) => {
    setFormError("");
    setSuccessMessage("");
    mutation.mutate(data);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#0f0f0f] to-[#1a1a2e] text-white">
      <Card className="w-full max-w-sm bg-[#16161a] border border-[#2a2a2a] shadow-xl rounded-2xl">
        <CardContent className="p-6">
          <h2 className="mb-6 text-center text-2xl font-semibold text-white">
            Forgot Password
          </h2>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-gray-300">
                      Email Address
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="bg-[#202028] text-white border border-[#3a3a3a] focus:ring-purple-500 focus:border-purple-500"
                        placeholder="you@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {formError && (
                <p className="text-sm text-red-500 mt-1">{formError}</p>
              )}
              {successMessage && (
                <p className="text-sm text-green-500 mt-1">{successMessage}</p>
              )}

              <Button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
              >
                Send Reset Link
              </Button>
            </form>
          </Form>

          <p className="mt-4 text-center text-sm text-gray-400">
            Remember your password?{" "}
            <Link to="/auth/login" className="text-purple-400 hover:underline">
              Go back to login
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
