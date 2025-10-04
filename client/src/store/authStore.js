import {create} from "zustand"
import axios from "axios"

const URL ="http://localhost:2000/auth"
axios.defaults.withCredentials = true

export const useAuthStore = create((set)=>({
    user:null,
    isLoading:false,
    isAuthenticated:false,
    error:null,
    isCheckingAuth:true,

    signup:async(email,password,name,tel)=>{
        set({isLoading:true,error:null})
        try {
            const response = await axios.post(`${URL}/signup`,{email,password,name,tel})
            set({
                user:response.data.user,
                isAuthenticated:true,
                isLoading:false
            })
        } catch (error) {
            set({error:error.response.data.message || "Error signing up",isLoading:false})     
            throw error       
        }
    },
    verify:async()=>{

    },
}))