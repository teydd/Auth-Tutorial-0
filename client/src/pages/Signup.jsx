import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function Signup() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    tel: "",
  });
  const navigate = useNavigate();
  const { signup, error, isLoading } = useAuthStore();
  const handleSubmit = async (e) => {
    const { email, password, name, tel } = form;
    e.preventDefault();
    try {
      await signup(email, password, name, tel);
      navigate("/verify");
    } catch (error) {
      console.log("Error handlesubmit", error);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="align-items-center justify-content-center d-flex mt-5 ">
      <form onSubmit={handleSubmit} className="dash p-5 rounded-4">
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
          onChange={handleChange}
          value={form.email}
          autoFocus
        />
        <br />
        <input
          className="form-control"
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          value={form.name}
        />
        <br />
        <input
          className="form-control"
          type="tel"
          name="tel"
          placeholder="Phone number"
          onChange={handleChange}
          value={form.tel}
        />
        <br />
        <input
          className="form-control"
          type="password"
          name="password"
          placeholder="Enter Password"
          onChange={handleChange}
          value={form.password}
        />
        <br />
        {error && <p className="text-black">{error}</p>}
        <button
          type="submit"
          className="btn btn-lg btn-outline-success active w-100"
        >
          {isLoading ? "Signing up " : "Submit"}
        </button>
        <hr />
        <p>
          Already have an account?{" "}
          <Link className="text-black text-decoration-none" to="/signin">
            Signin
          </Link>
        </p>
      </form>
    </div>
  );
}
