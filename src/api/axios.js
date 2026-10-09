import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
    //baseURL: import.meta.env.VITE_API_URL2
});
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if(token) {
        config.headers.Authorization= `Bearer ${token}`;
    }
    return config;
});

export default api;