"use server"

import axios from "../services/axiosInstance"; 
import { FormState, LoginFormSchema } from "./types/auth-type";
import { redirect } from "next/navigation";
import { AxiosError } from "axios";
import { createSession } from "./session";

export async function login(state: FormState, formData: FormData): Promise<FormState>{
    const validationFields = LoginFormSchema.safeParse({
        email: formData.get("email"),
        password: formData.get("password")
    })

    if(!validationFields.success){
        return {
            error: validationFields.error.flatten().fieldErrors
        };
    }

    try{
     const response = await axios.post('/auth/login', JSON.stringify(validationFields.data))
     await createSession(response.data?.accessToken);
     redirect("/home");
    }catch(err){
        if (err instanceof AxiosError) {
            return {
                message: err.response?.data.message
            }
        } else {
            return {
                message: "Internal Server Error."
            }
        }
    }
}