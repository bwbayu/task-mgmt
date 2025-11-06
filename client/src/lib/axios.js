import axios from 'axios';
const BASE = import.meta.env.VITE_API_URL;

export const axiosInstance = axios.create({
    baseURL: BASE,
    headers: {
    "Content-Type": "application/json",
  },
})