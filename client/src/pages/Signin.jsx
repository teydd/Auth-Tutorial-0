import React, { useState } from "react";

import { Link } from "react-router-dom";

export default function Signin() {
  return (
    <div className="align-items-center justify-content-center d-flex mt-5 ">
      <form className="form p-5 rounded-4 dash">
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
        />
        <br />
        <input
          className="form-control"
          type="password"
          name="password"
          placeholder="Enter Password"
        />
        <br />
        <button
          type="submit"
          className="btn btn-lg btn-outline-success active w-100"
        >
          Sign in
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
