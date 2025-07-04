import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";

const LoginForm = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [passwordForgot, setPasswordForgot] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!passwordForgot) {
      if (formData.email === "" || formData.password === "") {
        return alert("All fields required");
      }

      fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_API_KEY}`,
        {
          method: "POST",
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => {
        if (res.ok) {
          return res.json().then((data) => {
            console.log("Data when user logged in ", data);
            let tokenId = data.idToken;
            const currentUserId = data.localId;
            localStorage.setItem("token", tokenId);
            dispatch(authActions.loggedUserId(currentUserId));
            alert("Logged In");
            dispatch(authActions.login());
            navigate("/home");
          });
        } else {
          return res.json().then((data) => {
            let errorMsg = "Wrong Credential";
            if (data) {
              errorMsg = data?.error?.message;
            }
            alert(errorMsg);
          });
        }
      });
    } else {
      fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${process.env.REACT_APP_FIREBASE_API_KEY}`,
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "PASSWORD_RESET",
            email: formData.email,
          }),
          headers: { "Content-Type": "application/json" },
        }
      ).then((res) => {
        if (res.ok) {
          return res.json().then((data) => {
            console.log("password reset for email ", data);
            alert("Password Reset Link Send to email");
            setFormData({ email: "", password: "" });
            navigate("/");
          });
        } else {
          return res.json().then((data) => {
            let errorMsg = "Password reset email not sent";
            if (data) {
              errorMsg = data?.error?.message;
            }
            alert(errorMsg);
          });
        }
      });
    }
  };
  console.log("form data", formData);

  return (
    <>
      <div
        style={{
          width: "50%",
          margin: "auto",
          marginTop: "100px",
          padding: "10px",
        }}
      >
        <div className="text-center my-5" style={{ fontWeight: "bold" }}>
          {!passwordForgot ? "Login" : "Reset Password"}
        </div>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              {!passwordForgot
                ? "Email address"
                : "Enter the email with which you have registered."}
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              onChange={changeHandler}
              value={formData.email}
              required
            />
          </div>

          {!passwordForgot && (
            <>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  onChange={changeHandler}
                  value={formData.password}
                  required
                />
              </div>
            </>
          )}

          <div className="text-center my-2" style={{ color: "red" }}>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => setPasswordForgot(!passwordForgot)}
            >
              {!passwordForgot ? "Forgot Password?" : "Already a user?Login"}
            </span>
          </div>
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-primary ">
              {!passwordForgot ? "Login" : "Send Reset Link"}
            </button>
          </div>
        </form>
        <p>
          New User ?{" "}
          <button
            className="btn btn-warning btn-sm"
            onClick={() => dispatch(authActions.register())}
          >
            Register
          </button>{" "}
        </p>
      </div>
    </>
  );
};

export default LoginForm;
