"use server"

import axios from "../services/axiosInstance"; 

export const getConcerts = async () =>{
    try{
        const response = await axios.get('/concerts');
        return response.data;
    }catch(err) {
        return null;
    }
}