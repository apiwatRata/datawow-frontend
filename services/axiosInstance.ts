"use server"

import axios from "axios";
import { getSession, updateTokens } from "@/lib/session";
import { refreshToken } from "@/lib/auth";
const api = axios.create({
  baseURL: process.env.API_URL, 
  timeout: 5000, 
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(
  async function (config) {
    const session = await getSession();

    if (session?.accessToken) {
      config.headers.Authorization = `Bearer ${session.accessToken}`;
    }

    return config;
  },
  function (error) {

    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  function (response) {

    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const session = await getSession();
        const new_token = await refreshToken(session.refreshToken);
        originalRequest.headers.Authorization = `Bearer ${new_token}`;
        return api(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);


export default api;