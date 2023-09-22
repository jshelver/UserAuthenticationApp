import { watchEffect } from "vue";
import { useAuthStore } from "../stores/auth";
import { axiosInstance } from "../utils/axios";

export default function useApi() {

    const authStore = useAuthStore();

    watchEffect(() => {
        axiosInstance.interceptors.request.use(
            (config) => {
                if (!config.headers["Authorization"]) {
                    config.headers["Authorization"] = `Bearer ${authStore.accessToken}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );
    
        axiosInstance.interceptors.response.use(
            (response) => response,
            async (error) => {
                const previousRequest = error?.config;
    
                if ((error?.response?.status === 401 || error?.response?.status === 403) && !previousRequest.sent) {
                    previousRequest.sent = true;
                    await authStore.refresh();
    
                    previousRequest.headers["Authorization"] = `Bearer ${authStore.accessToken}`;
                    return axiosInstance(previousRequest);
                }
    
                return Promise.reject(error);
            }
        );
    })

    return axiosInstance;
}