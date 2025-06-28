import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UpdateProfile = (props) => {
  const navigate = useNavigate();
  const [updateData, setUpdateData] = useState({
    fullName: "",
    profileImageUrl: "",
  });
  const idToken = localStorage.getItem("token");

  //fetching existing user data
  useEffect(() => {
    fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${process.env.REACT_APP_FIREBASE_API_KEY}`,
      {
        method: "POST",
        body: JSON.stringify({
          idToken: idToken,
        }),
        headers: { "Content-Type": "application/json" },
      }
    ).then((res) => {
      if (res.ok) {
        return res.json().then((data) => {
          console.log(data.users[0]);
          let user = data.users[0];
          if (user?.displayName || user?.photoUrl) {
            localStorage.setItem("profileCompleted", true);
            props.onProfileUpdate();
            setUpdateData({
              fullName: user.displayName || "",
              profileImageUrl: user.photoUrl || "",
            });
          }
        });
      } else {
        return res.json().then((data) => {
          let errorMsg = "Error in fetcing user data";
          if (data) {
            errorMsg = data?.error?.message;
          }
          alert(errorMsg);
        });
      }
    });

    let profileUpdated = localStorage.getItem("profileCompleted");
    if (profileUpdated) props.onProfileUpdate();
  }, [idToken, props]);

  const changeHandler = (e) => {
    setUpdateData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  console.log("update", updateData);
  //Updating user Profile Data
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${process.env.REACT_APP_FIREBASE_API_KEY}`,
      {
        method: "POST",
        body: JSON.stringify({
          idToken: idToken,
          displayName: updateData.fullName,
          photoUrl: updateData.profileImageUrl,
          returnSecureToken: true,
        }),
        headers: { "Content-Type": "application/json" },
      }
    ).then((res) => {
      if (res.ok) {
        return res.json().then((data) => {
          console.log("Updated", data);
          alert("Profile Updated");
          localStorage.setItem("profileCompleted", true);
          navigate("/home");
        });
      } else {
        return res.json().then((data) => {
          let errorMsg = "Something went Wrong";
          if (data) {
            errorMsg = data?.error?.message;
          }
          alert(errorMsg);
        });
      }
    });
  };

  return (
    <div
      style={{
        width: "70%",
        margin: "2rem auto",
        backgroundColor: "pink",
        borderRadius: "10px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "auto",
          padding: "1rem",
        }}
      >
        <div>
          <h2>Contact Details</h2>
        </div>
        <div>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => props.onCancel()}
          >
            Cancel
          </button>
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        style={{ padding: "1rem", margin: "2rem auto" }}
      >
        <div
          style={{
            display: "flex",
            gap: "1rem",
            marginBottom: "1rem",
          }}
        >
          {/* Full Name */}
          <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
            <span role="img" aria-label="user" style={{ marginRight: "8px" }}>
              👤
            </span>
            <label
              htmlFor="fullName"
              style={{ marginRight: "8px", minWidth: "80px" }}
            >
              Full Name:
            </label>
            <input
              id="fullName"
              type="text"
              name="fullName"
              value={updateData.fullName}
              onChange={changeHandler}
              style={{ flex: 1 }}
            />
          </div>

          {/* Profile Photo URL */}
          <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
            <span role="img" aria-label="photo" style={{ marginRight: "8px" }}>
              🌐
            </span>
            <label
              htmlFor="photoUrl"
              style={{ marginRight: "8px", minWidth: "100px" }}
            >
              Profile Photo URL:
            </label>
            <input
              id="photoUrl"
              type="text"
              name="profileImageUrl"
              value={updateData.profileImageUrl}
              onChange={changeHandler}
              style={{ flex: 1 }}
            />
          </div>
        </div>

        <button className="btn btn-success btn-sm">Update</button>
      </form>
    </div>
  );
};

export default UpdateProfile;
