import React from 'react'
import { Link } from 'react-router-dom';

export default function Signup() {
  return (
    <div className="align-items-center justify-content-center d-flex mt-5 ">
      <form  className="dash p-5 rounded-4">
        <Link className='text-decoration-none text-black' to={"/"}><h3 className='text-center'>Auth Tutorial</h3></Link>
        <p className="text-center">Sign up and have an account</p>
        <hr />
        <input
          className="form-control"
          type="email"
          name="email"
          placeholder="Email Address"
          autoFocus
        />
        <br />
        <input
          className="form-control"
          type="text"
          name="name"
          placeholder="Name"
        />
        <br />
        <input
          className="form-control"
          type="tel"
          name="tel"
          placeholder="Phone number"
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
          Sign up
        </button>
        <hr />
        <p>
          Already have an account? <Link className="text-black text-decoration-none" to="/signin">Signin</Link>
        </p>
      </form>
    </div>
  );
}

 
