import React, { useContext, useState } from "react";
import AppContext from "../context/AppContext";

const SignUpForm = () => {
  const { setIsRegister } = useContext(AppContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (
      formData.email === "" ||
      formData.password === "" ||
      formData.confirmPassword === ""
    ) {
      return alert("All fields required");
    }
    if (formData.password !== formData.confirmPassword) {
      return alert("Password not matching");
    }

    fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_API_KEY}`,
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
        alert("User has successfully signed up");
        setFormData({ email: "", password: "", confirmPassword: "" });
      } else {
        return res.json().then((data) => {
          let errorMsg = "Authentication Failed";
          if (data) {
            errorMsg = data?.error?.message;
          }
          alert(errorMsg);
        });
      }
    });
  };

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
          Sign Up
        </div>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
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
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="text"
              className="form-control"
              id="password"
              name="password"
              onChange={changeHandler}
              value={formData.password}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              name="confirmPassword"
              onChange={changeHandler}
              value={formData.confirmPassword}
              required
            />
          </div>
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-primary ">
              SignUp
            </button>
          </div>
        </form>
        <p>
          Already have and account ?{" "}
          <button
            className="btn btn-warning btn-sm"
            onClick={() => setIsRegister(false)}
          >
            Login
          </button>{" "}
        </p>
      </div>
    </>
  );
};

export default SignUpForm;
