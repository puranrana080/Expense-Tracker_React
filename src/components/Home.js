import React, { useState } from "react";
import UpdateProfile from "./UpdateProfile";
import { useNavigate } from "react-router-dom";
import NewExpense from "./NewExpense";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/auth";
import { themeActions } from "../store/theme";

const Home = () => {
  const dispatch = useDispatch();
  const [updateProfile, setUpdateProfile] = useState(false);
  const [profileComplete, setProfileComplete] = useState(
    localStorage.getItem("profileCompleted")
  );
  const navigate = useNavigate();
  const isPremium = useSelector((state) => state.theme.isPremiumActivated);
  const isLight = useSelector((state) => state.theme.isLight);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("profileCompleted");
    dispatch(authActions.logout());
    dispatch(authActions.loggedUserId(null));
    navigate("/");
  };

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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          {isPremium && (
            <button
              onClick={() => dispatch(themeActions.toggleTheme())}
              className="btn btn-light btn-sm"
            >
              {isLight ? "🌑 Dark" : "🔆 Light"}
            </button>
          )}

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

          <button className="btn btn-danger btn-sm" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
      <hr></hr>
      {updateProfile && (
        <UpdateProfile
          onCancel={() => setUpdateProfile(false)}
          onProfileUpdate={() => setProfileComplete(true)}
        />
      )}
      {!updateProfile && <NewExpense />}
    </>
  );
};

export default Home;
