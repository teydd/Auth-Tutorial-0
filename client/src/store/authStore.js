import { create } from "zustand"
import axios from "axios"

const SERVER_URL = import.meta.env.VITE_REACT_APP_URL
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
            const response = await axios.post(`${SERVER_URL}/signup`, { email, password, name, tel })
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
    verify: async (code) => {
        set({isLoading:true,error:null})
        try {
            const response = await axios.post(`${SERVER_URL}/verify`,{code})
            set({user:response.data.user,isLoading:false,error:null})
        } catch (error) {
            set({error:error.response.data.message || "Error verifying function"})
            throw error
        }
    },
    checkAuth:async()=>{
        set({isCheckingAuth:true,error:null})
        try {
            const response = await axios.get(`${SERVER_URL}/check-auth`)
            set({user:response.data.user,isAuthenticated:true,isCheckingAuth:false})
        } catch (error) {
            set({error:null,isCheckingAuth:false,isAuthenticated:false})            
        }
    },
    signin:async(email,password)=>{
        set({isLoading:true,error:null,isAuthenticated:true})
        try {
            const response = await axios.post(`${SERVER_URL}/signin`,{email,password})
            set({user:response.data.user,isLoading:false,error:null})
        } catch (error) {
            set({error:error.response.data.message || "Error signing up",isLoading:false})
            throw error            
        }
    },
    logout:async()=>{
        set({isLoading:true,error:null})
        try {
            await axios.post(`${SERVER_URL}/logout`)
            set({user:null,isLoading:false,isAuthenticated:false,error:null})
        } catch (error) {
            set({error:"Error Logging out",isLoading:false})
            throw error            
        }
    },
    forget:async(email)=>{
        set({isLoading:true,error:null})
        try {
            const response = await axios.post(`${SERVER_URL}/forgot-password`,{email})
            set({user:response.data.user,isLoading:false})
        } catch (error) {
            set({error:error.response.data.message || "Error sending reset password link" ,isLoading:false})
            throw error            
        }
    },
    resetPassword:async(token,password)=>{
        set({isLoading:true,error:null})
        try {
            const response = await axios.post(`${SERVER_URL}/reset-password/${token}`,{password})
            set({user:response.data.user,isLoading:false})
        } catch (error) {
            set({error:error.response.data.message || "Error resetting password"})
            throw error
        }

    }
}))