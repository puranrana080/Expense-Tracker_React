import React, { useState } from "react";
import UpdateProfile from "./UpdateProfile";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [updateProfile, setUpdateProfile] = useState(false);
  const [profileComplete, setProfileComplete] = useState(
    localStorage.getItem("profileCompleted")
  );
  const navigate=useNavigate()

  const handleLogout=()=>{
    localStorage.removeItem('token')
    localStorage.removeItem('profileCompleted')
    navigate('/')
    
  

  }



  return (
    <>
      <div
        className="m-3"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <p>Welcome to Expense Tracker</p>
        </div>
        <div style={{
      display: "flex",
      alignItems: "center",
      gap: "1rem",
    }}>
          
          <div
            style={{
              backgroundColor: "pink",
              borderRadius: "10px",
              padding: "4px",
            }}
          >
            {profileComplete
              ? "Update Your Profile "
              : "Your Profile is incomplete "}
            <span
              onClick={() => setUpdateProfile(true)}
              style={{ color: "blue", cursor: "pointer" }}
            >
              {profileComplete ? "Update Now" : "Complete Now"}
            </span>
          </div>
          <button className="btn btn-danger btn-sm" onClick={handleLogout} >Logout</button>
        </div>
      </div>
      <hr></hr>
      {updateProfile && (
        <UpdateProfile
          onCancel={() => setUpdateProfile(false)}
          onProfileUpdate={() => setProfileComplete(true)}
        />
      )}
    </>
  );
};

export default Home;
