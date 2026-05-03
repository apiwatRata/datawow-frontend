"use client"

import {Button, Description, FieldError, Form, Input, Label, TextField} from "@heroui/react";
import SubmitButton from "@/components/submitButton";
import { login } from "@/lib/auth";
import { useActionState } from "react";

interface LoginFormProps {
  type: "admin" | "user";
}

export default function LoginForm({ type }: LoginFormProps) {

    const [state, action] = useActionState(login, undefined);

    return (
        <Form className="space-y-6" action={action}>
          <TextField
            className="block space-y-2 text-sm font-medium text-slate-700"
            isRequired
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
            minLength={8}
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
