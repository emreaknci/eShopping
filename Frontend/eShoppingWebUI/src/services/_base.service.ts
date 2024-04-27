import axios from 'axios';
import StorageService from './storage.service';
import { toast } from 'react-toastify';
const base_url = import.meta.env.VITE_API_GATEWAY;

const axiosInstance = axios.create({
    baseURL: `${base_url}`,
    headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "no-cache"
    }
});

axiosInstance.interceptors.request.use(
    async (config) => {
        const token = StorageService.getAccessToken();

        const bearerToken = token;

        config.headers.Authorization = `Bearer ${bearerToken}`;

        return config;
    },
    (error) => {
        console.log("InterceptorError: ", error)
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            const status = error.response.status;
            if (status === 500) {
                toast.error("Sunucu hatası oluştu. Lütfen daha sonra tekrar deneyin.");
                return Promise.resolve(error);
            }
        } else {
            console.log("An unexpected error occurred: ", error);
            toast.error("Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.");
            return Promise.resolve(error);
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;