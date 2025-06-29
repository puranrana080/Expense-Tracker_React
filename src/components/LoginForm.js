import React, { useContext, useState } from "react";
import AppContext from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const { setIsRegister, setIsLoggedIn } = useContext(AppContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
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
          localStorage.setItem("token", tokenId);
          alert("Logged In");
          setIsLoggedIn(true);
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
          Login
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
              type="password"
              className="form-control"
              id="password"
              name="password"
              onChange={changeHandler}
              value={formData.password}
              required
            />
          </div>
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-primary ">
              Login
            </button>
          </div>
        </form>
        <p>
          New User ?{" "}
          <button
            className="btn btn-warning btn-sm"
            onClick={() => setIsRegister(true)}
          >
            Register
          </button>{" "}
        </p>
      </div>
    </>
  );
};

export default LoginForm;
