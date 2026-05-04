"use client"

import { Alert, FieldError, Form, Input, Label, TextField, CloseButton } from "@heroui/react";
import SubmitButton from "@/components/submitButton";
import { signUp } from "@/lib/auth";
import { useActionState } from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
    const router = useRouter();
    const [state, action] = useActionState(signUp, undefined);
    const [showAlert, setShowAlert] = useState(false); 
    
    useEffect(() => {
      if (state?.success) {
        setShowAlert(true);
        const timer = setTimeout(() => {
          router.push("/");
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
                <Alert.Title>Register successfully</Alert.Title>
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
                className="block space-y-2 text-sm font-medium text-slate-700"
                isRequired
                name="password"
                type="password"
            >
                <Label>Password</Label>
                <Input className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200" placeholder="Enter your Password" />
                {state?.error?.password && (
                    <p className="text-sm text-red-500">{state.error.password}</p>
                )}
                <FieldError />
            </TextField>
            <TextField
                isRequired
                minLength={8}
                name="confirmPassword"
                type="password"
                className="block space-y-2 text-sm font-medium text-slate-700"
            >
                <Label>Confirm Password</Label>
                <Input  placeholder="Confirm your Password" className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"/>
                {state?.error?.confirmPassword && (
                    <p className="text-sm text-red-500">{state.error.confirmPassword}</p>
                )}
                <FieldError />
            </TextField>
            <div className="flex gap-2">
                <SubmitButton>
                    Sign Up
                </SubmitButton>
            </div>
        </Form>
    )
}