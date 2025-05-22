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

// Schema
const FormSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// API Function
const loginUser = async (data: z.infer<typeof FormSchema>) => {
  const res = await fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await res.json();
  console.log("🔐 Login API Response:", result);

  if (!res.ok) throw new Error(result.message || "Login failed");

  return result;
};

export default function Login() {
  const navigate = useNavigate();
  const [formError, setFormError] = useState("");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      const token = data?.user?.stsTokenManager?.accessToken;
      if (token) {
        localStorage.setItem("auth_token", token);
        navigate("/dashboard");
      } else {
        setFormError("Access token not found in response.");
      }
    },
    onError: (error: any) => {
      console.error("❌ Login error:", error);
      setFormError(error.message || "Login failed");
    },
  });

  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    setFormError("");
    mutation.mutate(values);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#0f0f0f] to-[#1a1a2e] text-white">
      <Card className="w-full max-w-sm bg-[#16161a] border border-[#2a2a2a] shadow-xl rounded-2xl">
        <CardContent className="p-6">
          <h2 className="mb-6 text-center text-2xl font-semibold text-white">
            Sign In
          </h2>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                        placeholder="you@example.com"
                        className="bg-[#202028] text-white border border-[#3a3a3a] focus:ring-purple-500 focus:border-purple-500"
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
                        placeholder="••••••••"
                        className="bg-[#202028] text-white border border-[#3a3a3a] focus:ring-purple-500 focus:border-purple-500"
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

              <div className="text-right text-sm">
                <Link
                  to="/auth/ForgetPassword"
                  className="text-purple-400 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                disabled={mutation.isPending}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
              >
                {mutation.isPending ? "Signing In..." : "Sign In"}
              </Button>
            </form>
          </Form>

          <p className="mt-4 text-center text-sm text-gray-400">
            Don’t have an account?{" "}
            <Link to="/auth/signup" className="text-purple-400 hover:underline">
              Sign up now
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
