import React, { useEffect } from "react";
import SignUpForm from "./components/SignUpForm";
import LoginForm from "./components/LoginForm";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import { useDispatch, useSelector } from "react-redux";

import { authActions } from "./store/auth";

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isRegister = useSelector((state) => state.auth.isRegister);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isLight = useSelector((state) => state.theme.isLight);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    if (token && userId) {
      dispatch(authActions.login());
      dispatch(authActions.loggedUserId(userId));
      navigate("/home");
    }

    document.body.style.backgroundColor = isLight ? "white" : "#121212";
    document.body.style.color = isLight ? "black" : "white";
  }, [dispatch, navigate, isLight]);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={isRegister ? <SignUpForm /> : <LoginForm />}
        ></Route>
        <Route
          path="/home"
          element={isLoggedIn ? <Home /> : <Navigate to="/"></Navigate>}
        ></Route>
      </Routes>
    </>
  );
};

export default App;
