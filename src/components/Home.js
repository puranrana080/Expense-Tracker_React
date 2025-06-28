import React, { useState } from "react";
import UpdateProfile from "./UpdateProfile";

const Home = () => {
  const [updateProfile, setUpdateProfile] = useState(false);

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
            Your Profile is incomplete.{" "}
            <span
              onClick={() => setUpdateProfile(true)}
              style={{ color: "blue" }}
            >
              Complete Now
            </span>
          </p>
        </div>
      </div>
      <hr></hr>
      {updateProfile && (
        <UpdateProfile onCancel={() => setUpdateProfile(false)} />
      )}
    </>
  );
};

export default Home;
