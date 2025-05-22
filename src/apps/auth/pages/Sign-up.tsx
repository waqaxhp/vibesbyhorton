"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

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
const SignUpSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignUpInputs = z.infer<typeof SignUpSchema>;

// ✅ API Call
const signupUser = async (data: SignUpInputs) => {
  const response = await fetch("http://localhost:5000/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  if (!response.ok)
    throw new Error(result.error || result.message || "Signup failed");
  return result;
};

export default function SignUp() {
  const navigate = useNavigate();
  const [statusMessage, setStatusMessage] = useState("");

  const form = useForm<SignUpInputs>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const mutation = useMutation({
    mutationFn: signupUser,
    onSuccess: (data) => {
      const message = data.message || "Signup successful!";
      setStatusMessage(message);

      // Redirect to login after short delay
      setTimeout(() => {
        navigate("/auth/login");
      }, 2000);
    },
    onError: (error: any) => {
      setStatusMessage(error.message || "Signup failed. Please try again.");
    },
  });

  const onSubmit = (data: SignUpInputs) => {
    setStatusMessage("");
    mutation.mutate(data);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#0f0f0f] to-[#1a1a2e] text-white">
      <Card className="w-full max-w-sm bg-[#16161a] border border-[#2a2a2a] shadow-xl rounded-2xl">
        <CardContent className="p-6">
          <h2 className="mb-6 text-center text-2xl font-semibold text-white">
            Create Account
          </h2>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-gray-300">
                      First Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="bg-[#202028] text-white border border-[#3a3a3a] focus:ring-purple-500 focus:border-purple-500"
                        placeholder="John"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-gray-300">
                      Last Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="bg-[#202028] text-white border border-[#3a3a3a] focus:ring-purple-500 focus:border-purple-500"
                        placeholder="Doe"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-gray-300">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        className="bg-[#202028] text-white border border-[#3a3a3a] focus:ring-purple-500 focus:border-purple-500"
                        placeholder="you@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-gray-300">
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        className="bg-[#202028] text-white border border-[#3a3a3a] focus:ring-purple-500 focus:border-purple-500"
                        placeholder="••••••••"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-gray-300">
                      Confirm Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        className="bg-[#202028] text-white border border-[#3a3a3a] focus:ring-purple-500 focus:border-purple-500"
                        placeholder="••••••••"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {statusMessage && (
                <p
                  className={`text-sm mt-1 ${
                    statusMessage.toLowerCase().includes("success")
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {statusMessage}
                </p>
              )}

              <Button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
              >
                Sign Up
              </Button>
            </form>
          </Form>

          <p className="mt-4 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link to="/auth/login" className="text-purple-400 hover:underline">
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
