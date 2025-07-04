import React from "react";
import SignUpForm from "./components/SignUpForm";
import LoginForm from "./components/LoginForm";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const App = () => {
  const isRegister = useSelector(state=>state.auth.isRegister)
  const isLoggedIn = useSelector(state=>state.auth.isLoggedIn)


  return (
    <>
      <Routes>
        <Route
          path="/"
          element={isRegister ? <SignUpForm /> : <LoginForm />}
        ></Route>
        <Route path="/home" element={isLoggedIn? <Home />:<Navigate to='/' /> }></Route>
      </Routes>
    </>
  );
};

export default App;
