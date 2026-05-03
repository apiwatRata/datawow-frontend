"use client"

import {Button, Description, FieldError, Form, Input, Label, TextField} from "@heroui/react";
import SubmitButton from "@/components/submitButton";

export default function RegisterForm() {
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data: Record<string, string> = {};
        // Convert FormData to plain object
        formData.forEach((value, key) => {
        data[key] = value.toString();
        });
        alert(`Form submitted with: ${JSON.stringify(data, null, 2)}`);
    };

    return (
        <Form className="space-y-6" onSubmit={onSubmit}>
            <TextField
                className="block space-y-2 text-sm font-medium text-slate-700"
                isRequired
                name="full_name"
                type="text"
                validate={(value) => {
                if (value.length < 2) {
                    return "Full name must be at least 2 characters";
                }
                return null;
                }}
            >
                <Label>Full Name</Label>
                <Input className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200" placeholder="Enter your Full Name" />
                <FieldError />
            </TextField>
            <TextField
                className="block space-y-2 text-sm font-medium text-slate-700"
                isRequired
                name="email"
                type="email"
                validate={(value) => {
                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                    return "Please enter a valid email address";
                }
                return null;
                }}
            >
                <Label>Email</Label>
                <Input className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200" placeholder="Enter your Email Address" />
                <FieldError />
            </TextField>
            <TextField
                className="block space-y-2 text-sm font-medium text-slate-700"
                isRequired
                name="password"
                type="password"
                validate={(value) => {
                if (value.length < 8) {
                    return "Password must be at least 8 characters";
                }
                if (!/[A-Z]/.test(value)) {
                    return "Password must contain at least one uppercase letter";
                }
                if (!/[0-9]/.test(value)) {
                    return "Password must contain at least one number";
                }
                return null;
                }}
            >
                <Label>Password</Label>
                <Input className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200" placeholder="Enter your Password" />
                <FieldError />
            </TextField>
            <TextField
                isRequired
                minLength={8}
                name="confirm_password"
                type="password"
                className="block space-y-2 text-sm font-medium text-slate-700"
                validate={(value) => {
                if (value.length < 8) {
                    return "Password must be at least 8 characters";
                }
                if (!/[A-Z]/.test(value)) {
                    return "Password must contain at least one uppercase letter";
                }
                if (!/[0-9]/.test(value)) {
                    return "Password must contain at least one number";
                }
                return null;
                }}
            >
                <Label>Confirm Password</Label>
                <Input  placeholder="Confirm your Password" className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200" />
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