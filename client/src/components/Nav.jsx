import React from 'react'
import { Link, Links } from 'react-router-dom'

export default function Nav() {
  return (
    <>
    <nav className="navbar navbar-expand-lg shadow-lg">
  <div className="container-fluid">
    <a className="navbar-brand" href="/">Auth Tutorial</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav w-100 justify-content-center">
        <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to={"/"}>Home</Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to={"/dashboard"}>Dashboard</Link>
        </li>
      </ul>
      <Link to={"/signin"} className='btn btn-danger'>Signin</Link>
    </div>
  </div>
</nav>
    </>
  )
}
