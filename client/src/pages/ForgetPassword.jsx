import React, { useState } from "react";
import { Link, Links, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function ForgetPassword() {
  const [form, setForm] = useState({
    email: "",
  });
  const [isSubmitted, setisSubmitted] = useState(false);

  const { forget, isLoading, error } = useAuthStore();
  const handleSubmit = async (e) => {
    const { email } = form;
    e.preventDefault();
    await forget(email);
    setisSubmitted(true);
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
      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="form p-5 rounded-4 dash">
          <Link className="text-decoration-none text-black" to={"/"}>
            <h3 className="text-center">Auth Tutorial</h3>
          </Link>
          <p className="text-center">Enter email associated with the account</p>
          <hr />
          <input
            className="form-control"
            type="email"
            name="email"
            placeholder="Email Address"
            autoFocus
            onChange={handleChange}
            value={form.email}
          />
          <br />
          {error}
          <button
            type="submit"
            className="btn btn-lg btn-outline-success active w-100"
          >
            {isLoading ? "Submitting" : "Submit"}
          </button>
        </form>
      ) : (
        <div className="text-center container col-6  p-5 rounded-4 dash">
          <div className="card-header h4">Forgot Password</div>
          <hr />
          <div className="card-body">
            <p className="card-text">
              If an account exists for {form.email}, you will receive a password
              reset link shortly
            </p>
            <hr />
            <Link to={"/signin"} className="btn btn-primary">
              Back to Login
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
