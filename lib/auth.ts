"use server"

import axios from "../services/axiosInstance"; 
import { FormState, LoginFormSchema } from "./types/auth-type";
import { FormState as RegisterState, RegisterFormSchema} from "./types/register-type";
import { redirect } from "next/navigation";
import { AxiosError } from "axios";
import { createSession, updateTokens } from "./session";

export async function signUp(state: RegisterState, formData: FormData): Promise<RegisterState> {
    const validationFields = RegisterFormSchema.safeParse({
        email: formData.get("email"),
        password: formData.get("password"),
        confirmPassword :  formData.get("confirmPassword")
    });
    if(!validationFields.success){
        return {
            error: validationFields.error.flatten().fieldErrors
        };
    }

    try{
     const response = await axios.post('/users', {
        email: validationFields.data.email,
        password: validationFields.data.password
     })
     if(response.data?.status != 'success'){
        return {
            message: response.data?.message ?? "Registration failed."
        };
     }
     return { success: true };
    }catch(err){
        if (err instanceof AxiosError) {
            return {
                message: err.response?.data.message ?? "Registration failed."
            }
        } else {
            return {
                message: "Internal Server Error."
            }
        }
    }
}

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
    console.log('validationFields.data',validationFields.data);
    try{
     const response = await axios.post('/auth/login', JSON.stringify(validationFields.data))
     await createSession(response.data);
     return { success: true };
    }catch(err){
        console.log('err',err);
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

export const refreshToken = async (oldRefreshToken: string) =>{
    try{
        const response = await axios.post('/auth/refresh', JSON.stringify({
            refresh: oldRefreshToken
        }))

        const { accessToken, refreshToken }  = response.data;
        await updateTokens( { accessToken, refreshToken });

        return accessToken;
    }catch(err) {
        return null;
    }
}