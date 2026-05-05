"use server"

import axios from "../services/axiosInstance"; 
import type { FormState } from "./types/concert-type";
import { ConcertFormSchema } from "./types/concert-type";
import { AxiosError } from "axios";

export const getConcerts = async () =>{
    try{
        const response = await axios.get('/concerts');
        return response.data;
    }catch(err) {
        return null;
    }
}

export const getSeats = async () =>{
    try{
        const response = await axios.get('/concerts/seats');
        return response.data;
    }catch(err) {
        return null;
    }
}

export const adminGetConcerts = async () =>{
    try{
        const response = await axios.get('/concerts/admin');
        return response.data;
    }catch(err) {
        return null;
    }
}

export const updateConcerts = async (state: FormState, formData: FormData): Promise<FormState> => {
    const validationFields = ConcertFormSchema.safeParse({
        name: formData.get("name"),
        description: formData.get("description"),
        total_seats: formData.get("total_seats"),
        event_date: formData.get("event_date")
    })

    if(!validationFields.success){
        return {
            error: validationFields.error.flatten().fieldErrors
        };
    }
    try{
     const response = await axios.patch('/concerts/'+ formData.get("id"), JSON.stringify({
        ...validationFields.data,
        event_date: new Date(validationFields.data.event_date)
     }))
     return { success: true };
    }catch(err){
        if (err instanceof AxiosError) {
            console.log(' message: err.response?.data.message', err.response?.data.message);
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