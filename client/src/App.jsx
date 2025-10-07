import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Verify from "./pages/Verify";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import {Toaster} from "react-hot-toast"
import { useAuthStore } from "./store/authStore";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  const {isCheckingAuth,checkAuth,isAuthenticated,user} = useAuthStore()
  useEffect(()=>{
    checkAuth()
  },[checkAuth])

  console.log("User",user)
  console.log("is Authenticated",isAuthenticated)
  return (
    <>
      <Router>
        <Nav></Nav>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard></Dashboard></ProtectedRoute>}></Route>
          <Route path="/signup" element={<Signup></Signup>}></Route>
          <Route path="/signin" element={<Signin></Signin>}></Route>
          <Route path="/verify" element={<Verify></Verify>}></Route>
          <Route path="/forgot-password" element={<ForgetPassword></ForgetPassword>}></Route>
          <Route path="/reset-password" element={<ResetPassword></ResetPassword>}></Route>
        </Routes>
        <Toaster></Toaster>
      </Router>
    </>
  );
}

export default App;
