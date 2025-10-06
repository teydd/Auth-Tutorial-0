import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function ResetPassword() {
    const [form,setForm] = useState({
        password:"",
        newpassword:""
    })

    const handleSubmit = async(e)=>{
        e.preventDefault()
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
          name="email"
          placeholder="Password"
          autoFocus
          onChange={handleChange}
          value={form.password}
         
        />
        <br />
        <input
          className="form-control"
          type="text"
          name="email"
          placeholder="Confirm Password"
          onChange={handleChange}
          value={form.newpassword}
         
        />
        <br />
        <button
          type="submit"
          className="btn btn-lg btn-outline-success active w-100"
        >
          Submit
        </button>
      </form>
    </div>
  )
}
