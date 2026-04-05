import axios from "axios";
import { useAuthStore } from "../store/useAuthStore";




export const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE === "development" ? "http://localhost:5001/api/" : import.meta.env.VITE_PROD_BASE_URL,

    withCredentials: true,
});
let refresh = null;

axiosInstance.interceptors.request.use((config) => {


    const authUser = useAuthStore.getState().authUser;
    if (authUser?.token ) {
        config.headers.Authorization = `Bearer ${authUser.token }`;
    }


    return config;
})

export const refreshTokenOnLoad = async () => {
    try {
        const authUser = useAuthStore.getState().authUser;
        if (!authUser) {
            const response = await axiosInstance.get("/auth/refresh");
            useAuthStore.setState({
            authUser: {
                ...useAuthStore.getState().authUser,
                token: response.data.token,
                _id: response.data._id,
                fullName: response.data.fullName,
                email: response.data.email,
                profilePic: response.data.profilePic
            }
        });
        }
    } catch (error) {
        
        // window.location.href = "/session-error";
        console.error("User not logged in", error);
        
    }
};

axiosInstance.interceptors.response.use(
    response => response,
    async error => {

        const originalRequest = error.config;

        if (error.message === 'Network Error') {
            console.error('CORS/Network Error. Check backend configuration.');
        };






        if (error.response?.status === 401 && !originalRequest._retry && originalRequest.url !== "/auth/refresh") {
            originalRequest._retry = true;

            console.error('this is error response', error.response);
            refreshTokenOnLoad();

        };

        return Promise.reject(error);
    }
);
