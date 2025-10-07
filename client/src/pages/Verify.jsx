import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import toast from 'react-hot-toast'

export default function Verify() {
  const [code,setCode] = useState("")
  const {verify,error} = useAuthStore()
  useEffect(()=>{
    if(code.length ===6){
      handleSubmit()
    }
  },[code])

  const handleChange = (e)=>{
    setCode(e.target.value.replace(/\D/g,"").slice(0,6))
  }
  const navigate = useNavigate()
  
  const handleSubmit = async (e)=>{
    if(e) e.preventDefault()
      if(code.length === 6){
        await verify(code)
        navigate("/dashboard")
        toast.success("Verified successfully")
      }
      
  }
  return (
    <>
     <div className="align-items-center justify-content-center d-flex mt-5 ">
      <form onSubmit={handleSubmit} className="form p-5 rounded-4 dash">
        <Link className='text-decoration-none text-black' to={"/"}><h3 className='text-center'>Verify account</h3></Link>
        <hr />
        <input
          className="form-control text-center fs-5"
          type='text'
          maxLength={6}
          onChange={handleChange}
          value={code}
          autoFocus
        />
        <p className='text-center text-danger'>{error}</p>
      </form>
    </div>
    </>
  )
}
