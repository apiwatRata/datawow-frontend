import { z } from "zod";

export type FormState = 
| {
        error?:{
            email?: string[];
            password?: string[];
        };
        message?: string;
    } 
| undefined

export const LoginFormSchema = z.object({
    email: z.email({ message: "Please enter a valid email." }).trim(),
    password: z.string()
})