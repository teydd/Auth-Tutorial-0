import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import toast from 'react-hot-toast'

export default function ResetPassword() {
    const [form,setForm] = useState({
        password:"",
        newpassword:""
    })
    const {resetPassword,isLoading,error}=useAuthStore()
    const {token} =useParams()
    const navigate =useNavigate()

    const handleSubmit = async(e)=>{
      const {password} = form
        e.preventDefault()
        if(form.password !== form.newpassword){
          toast.error("Passwords do not match")
          return
        }
        try {
           await resetPassword(token,password)
        toast.success("Password reset successfully")
        navigate("/signin")
        } catch (error) {
          toast.error("Error resetting password")          
        }
    }
    const handleChange = (e)=>{
        const {name,value} = e.target
        setForm((prev)=>({
            ...prev,
            [name]:value
        }))
    }
  return (
   <div className="align-items-center justify-content-center d-flex mt-5 ">
      <form onSubmit={handleSubmit} className="form p-5 rounded-4 dash">
        <Link className="text-decoration-none text-black" to={"/"}>
          <h3 className="text-center">Auth Tutorial</h3>
        </Link>
        <p className="text-center">Enter email associated with the account</p>
        <hr />
        <input
          className="form-control"
          type="text"
          name="password"
          placeholder="Password"
          autoFocus
          onChange={handleChange}
          value={form.password}
          required
         
        />
        <br />
        <input
          className="form-control"
          type="text"
          name="newpassword"
          placeholder="Confirm Password"
          onChange={handleChange}
          value={form.newpassword}
         
        />
        <br />
        <button
          type="submit"
          className="btn btn-lg btn-outline-success active w-100"
        >
          {isLoading ? "Resetting " : "Set New Password"}
        </button>
      </form>
    </div>
  )
}
