"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { CircleCheck, TriangleAlert } from "lucide-react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LoginSchema } from "@/schemas/authSchema";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signIn } from "@/auth";
import { login } from "@/server/login";

// Error Toast Component
interface FormErrorProps {
  message?: string;
}

const ErrorToast = ({ message }: FormErrorProps) => {
  if (!message) return null;
  return (
    <div className="flex items-center gap-x-2 rounded-md bg-red-500/15 p-3 text-sm font-medium text-red-700">
      <TriangleAlert className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
};

// Success Toast Component
interface FormSuccessProps {
  message?: string;
}

const SuccessToast = ({ message }: FormSuccessProps) => {
  if (!message) return null;
  return (
    <div className="flex items-center gap-x-2 rounded-md bg-emerald-500/15 p-3 text-sm font-medium text-emerald-600">
      <CircleCheck className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
};

// Header Component
interface HeaderProps {
  label: string;
}

const AuthHeader = ({ label }: HeaderProps) => {
  return (
    <div className="flex w-full flex-col items-start justify-start gap-y-2">
      <Link href={"/"}>
        <h1 className={cn("text-3xl font-semibold")}>z1Blog</h1>
      </Link>
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
};

// Auth Card Wrapper Component
interface AuthCardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
}

const AuthCardWrapper = ({ children, headerLabel }: AuthCardWrapperProps) => {
  return (
    <Card className="w-full max-w-[400px] border-none shadow-none md:w-[400px] md:border-2 md:border-slate-300 md:shadow-md">
      <CardHeader>
        <AuthHeader label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

// Login Form Component
export const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      login(values).then((data) => {
        data?.error && setError(data.error);
        // data?.success && setSuccess(data.success);
      });
    });
  };

  return (
    <AuthCardWrapper headerLabel="Login to your account">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <ErrorToast message={error} />
          <SuccessToast message={success} />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username:</FormLabel>
                <FormMessage className="pl-2" />
                <FormControl>
                  <Input
                    placeholder="username"
                    type="email"
                    disabled={isPending}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password:</FormLabel>
                <FormMessage className="pl-2" />
                <FormControl>
                  <Input
                    placeholder="******"
                    type="password"
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full"
            size={"lg"}
            variant={"default"}
            disabled={isPending}
          >
            {isPending && (
              <AiOutlineLoading3Quarters className="mx-3 h-4 w-4 animate-spin" />
            )}
            Login
          </Button>
        </form>
      </Form>
    </AuthCardWrapper>
  );
};
