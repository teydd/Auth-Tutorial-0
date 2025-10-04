import React from 'react'
import { Link } from 'react-router-dom'

export default function Verify() {
  return (
    <>
     <div className="align-items-center justify-content-center d-flex mt-5 ">
      <form  className="form p-5 rounded-4 dash">
        <Link className='text-decoration-none text-black' to={"/"}><h3 className='text-center'>Verify account</h3></Link>
        <hr />
        <input
          className="form-control text-center fs-5"
          maxLength={6}
        />
        <br />
      </form>
    </div>
    </>
  )
}
