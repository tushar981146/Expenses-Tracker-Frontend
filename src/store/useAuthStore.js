import { create } from 'zustand'
import { axiosInstance } from '../libs/axios.js'
import toast from 'react-hot-toast';


export const useAuthStore = create((set, get) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingUp: false,
    isUpdatingProfile: false,
    isGeneralUpdating: false,
    isPasswordUpdating: false,
    socket: null,
    


    ischeckingAuth: true,

    

    signup: async (data) => {
        set({ isSigningUp: true })
        try {
            const res = await axiosInstance.post("/auth/signup", data);

            toast.success("Account created sucessfully");
            set({ authUser: res.data })



        } catch (error) {
            toast.error(error.response.data.message)


        } finally {
            set({ isSigningUp: false })
        }
    },
    login: async (data) => {
        set({ isLoggingUp: true });

        try {
            const res = await axiosInstance.post("/auth/login", data);

            console.log("this is logn data", res.data)
            set({ authUser: res.data });
            toast.success("login successfully");
        } catch (error) {
            toast.error(error.response.data.message || "Login failed");
        } finally {
            set({ isLoggingUp: false });
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({ authUser: null })
            toast.success("logout sucessfully");
        } catch (error) {
            toast.error(error.response.data.message);

        }
    },

    updateProfile: async (data) => {
        set({ isUpdatingProfile: true })

        try {
            const res = await axiosInstance.put("/auth/update-profile", data);
            set({ authUser: res.data })
            toast.success("profile updated sucessessfully");
        } catch (error) {
            console.error("error in update profile:", error);
            toast.error(error.response.data.message)
        } finally {
            set({ isUpdatingProfile: false })
        }
    },

    generalUpdate: async (data) => {
        set({ isGeneralUpdating: true })

        try {
            const res = await axiosInstance.put("/auth/general-update", data);
            set({ authUser: res.data })
            toast.success("updated sucessessfully");
        } catch (error) {
            console.error("error in update profile:", error);
            toast.error(error.response.data.message)
        } finally {
            set({ isGeneralUpdating: false })
        }

    },

    passwordUpdate: async (data) => {
        set({ isPasswordUpdating: true })

        try {
            const res = await axiosInstance.put("/auth/password-update", data);
            set({ authUser: res.data })
            toast.success("passsword updated sucessessfully");
        } catch (error) {
            console.error("error in update profile:", error);
            toast.error(error.response.data.message)
        } finally {
            set({ isPasswordUpdating: false })
        }

    },
}));