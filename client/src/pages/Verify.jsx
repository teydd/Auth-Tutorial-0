import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Verify() {
  const [form,setForm] = useState({code:""})
  
  const handleSubmit = (e)=>{
    e.preventDefault()
  }
  const handleChange = (e)=>{
   
  }
  return (
    <>
     <div className="align-items-center justify-content-center d-flex mt-5 ">
      <form onSubmit={handleSubmit} className="form p-5 rounded-4 dash">
        <Link className='text-decoration-none text-black' to={"/"}><h3 className='text-center'>Verify account</h3></Link>
        <hr />
        <input
          className="form-control text-center fs-5"
          name='code'
          maxLength={6}
          onChange={handleChange}
          value={form.code}
          autoFocus
        />
        <br />
      </form>
    </div>
    </>
  )
}
