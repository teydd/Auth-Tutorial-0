import { create } from "zustand"
import axios from "axios"

const URL = "http://localhost:2000/auth"
axios.defaults.withCredentials = true

export const useAuthStore = create((set) => ({
    user: null,
    isLoading: false,
    isAuthenticated: false,
    error: null,
    isCheckingAuth: true,

    signup: async (email, password, name, tel) => {
        set({ isLoading: true, error: null })
        try {
            const response = await axios.post(`${URL}/signup`, { email, password, name, tel })
            set({
                user: response.data.user,
                isAuthenticated: true,
                isLoading: false
            })
        } catch (error) {
            set({ error: error.response.data.message || "Error signing up", isLoading: false })
            throw error
        }
    },
    verify: async () => {

    },
    signin:async(email,password)=>{
        set({isLoading:true,error:null,isAuthenticated:true})
        try {
            const response = await axios.post(`${URL}/signin`,{email,password})
            set({user:response.data.user,isLoading:false,error:null})
        } catch (error) {
            set({error:error.response.data.message || "Error signing up",isLoading:false})
            throw error            
        }
    },
    logout:async()=>{

    },
    forget:async(email)=>{
        set({isLoading:false,error:null})
        try {
            const response = await axios.post(`${URL}/forgot-password`,{email})
            set({user:response.data.user,isLoading:true, error:null})
        } catch (error) {
            
        }
    },
}))