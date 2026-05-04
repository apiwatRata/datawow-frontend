"use server"

import axios from "../services/axiosInstance"; 
import { getSession } from "./session";

export const booking = async (concertId : string) =>{
    try{
        const session = await getSession();
        const response = await axios.post(`reservations/reserve/${concertId}/user/${session.user?.id}`);
        return response.data?.data;
    }catch(err) {
        return null;
    }
}

export const cancel = async (reservationId : string) =>{
    try{
        const response = await axios.post(`reservations/cancel/${reservationId}`);
        return response.data?.data;
    }catch(err) {
        return null;
    }
}