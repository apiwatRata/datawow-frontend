import { z } from "zod";

export type FormState = 
| {
        success?: boolean;
        error?:{
            email?: string[];
            password?: string[];
            confirmPassword?: string[];
        };
        message?: string;
    } 
| undefined

export const RegisterFormSchema = z.object({
    email: z.email({ message: "Please enter a valid email." }).trim(),
    password: z.string()
    .min(8, { message: "Be at least 8 characters long"})
    .regex(/[a-zA-Z]/, {message: "Contain at least one letter."})
    .regex(/[0-9]/, {message: "Contain at least one number."})
    .regex(/[^a-zA-Z0-9]/, {
        message: "Contain at least one special character."
    }).trim(),
    confirmPassword: z.string()
    .min(8, { message: "Be at least 8 characters long"})
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
})