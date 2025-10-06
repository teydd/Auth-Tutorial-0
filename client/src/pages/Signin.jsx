import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function Signin() {
  const [form,setForm] = useState({
    email:"",
    password:""
  })
  const navigate = useNavigate()
  const {signin,isLoading,error} = useAuthStore()
  const handleSubmit = async (e)=>{
    const {email,password} = form
    e.preventDefault()
    await signin(email,password)
    navigate("/dashboard")
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
        <p className="text-center">Sign up and have an account</p>
        <hr />
        <input
          className="form-control"
          type="email"
          name="email"
          placeholder="Email Address"
          autoFocus
          value={form.email}
          onChange={handleChange}
        />
        <br />
        <input
          className="form-control"
          type="password"
          name="password"
          placeholder="Enter Password"
          value={form.password}
          onChange={handleChange}
        />
        <Link to={"/forgot-password"} className="text-dark text-decoration-none">Forgot Password?</Link>
        {error && <p className="text-danger fw-bold">{error}</p>}
        <button
          type="submit"
          className="btn btn-lg btn-outline-success active w-100"
        >
          {isLoading ? "Signing in" : "Sign in"}
        </button>
        <hr />
        <p>
          Already have an account?{" "}
          <Link className="text-black text-decoration-none" to="/signup">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
}
