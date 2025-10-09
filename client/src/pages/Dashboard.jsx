import React from "react";
import ProfileCard from "../bits/ProfileCard";
import teddy from "../assets/teddy.jpg"
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
export default function Dashboard() {
  const {user,logout} = useAuthStore()
  const navigate = useNavigate()

  const handleLogOut = async()=>{
    await logout()
    navigate("/signin")
    toast.success("Logout successful")

  }
  return (
    <>
      <p className="text-center lead py-2">Welcome {user?.name}</p>
      <button onClick={handleLogOut} className="float-end btn btn-danger">Logout</button>
      <br />
      <div className="align-items-center justify-content-center d-flex" style={{height:"70vh"}}>
        <ProfileCard
  name="Teddy Chemos"
  title="Software Engineer"
  handle="Teddy"
  status="Online"
  contactText="Contact Me"
  avatarUrl={teddy}
  showUserInfo={true}
  enableTilt={true}
  enableMobileTilt={true}
  onContactClick={() => console.log('Contact clicked')}
/>
      </div>
    </>
  );
}
