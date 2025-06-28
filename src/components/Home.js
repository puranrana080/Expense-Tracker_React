import React, { useState } from "react";
import UpdateProfile from "./UpdateProfile";

const Home = () => {
  const [updateProfile, setUpdateProfile] = useState(false);
  const [profileComplete, setProfileComplete] = useState(localStorage.getItem('profileCompleted'));

  


  // useEffect(() => {
  //   const profileStatus = localStorage.getItem("profileCompleted");
  //   console.log("Checking profile status");
  //   if (profileStatus) {
  //     setProfileComplete(true);
  //   }
  // }, []);

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
        <div>
          <p
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
             {profileComplete?"Update Now":"Complete Now"}
            </span>
          </p>
        </div>
      </div>
      <hr></hr>
      {updateProfile && (
        <UpdateProfile onCancel={() => setUpdateProfile(false)} onProfileUpdate={()=>setProfileComplete(true)} />
      )}
    </>
  );
};

export default Home;
