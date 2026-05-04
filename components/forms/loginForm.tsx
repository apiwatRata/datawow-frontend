"use client"

import {Button, Description, FieldError, Form, Input, Label, TextField, CloseButton, Alert} from "@heroui/react";
import SubmitButton from "@/components/submitButton";
import { login } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
interface LoginFormProps {
  type: "admin" | "user";
}

export default function LoginForm({ type }: LoginFormProps) {
    const router = useRouter();
    const [state, action] = useActionState(login, undefined);
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
      if (state?.success) {
        setShowAlert(true);
        const timer = setTimeout(() => {
          router.push("/home");
        }, 2000);
        return () => clearTimeout(timer);
      }
    }, [state, router]);

    return (
        <Form className="space-y-6" action={action}>
          {showAlert && (
            <Alert status="success">
              <Alert.Indicator />
              <Alert.Content>
              <Alert.Title>Login successfully</Alert.Title>
              </Alert.Content>
              <CloseButton />
            </Alert>
          )}
          <TextField
            className="block space-y-2 text-sm font-medium text-slate-700"
            isRequired
            name="email"
            type="email"
          >
            {state?.message && (
              <p className="text-sm text-red-500">{state.message}</p>
            )}
            <Label>Email</Label>
            <Input className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200" placeholder="Enter your Email Address" />
            {state?.error?.email && (
              <p className="text-sm text-red-500">{state.error.email}</p>
            )}
            <FieldError />
          </TextField>
          <TextField
            isRequired
            name="password"
            type="password"
            className="block space-y-2 text-sm font-medium text-slate-700"
          >
            <Label>Password</Label>
            <Input  placeholder="Enter your Password" className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200" />
            {state?.error?.password && (
              <p className="text-sm text-red-500">{state.error.password}</p>
            )}
            <FieldError />
          </TextField>
          <div className="flex gap-2">
            <SubmitButton>
              Login as { type === 'admin'? "Adminstrator" : "User" }
            </SubmitButton>
          </div>
        </Form>
    )
}
