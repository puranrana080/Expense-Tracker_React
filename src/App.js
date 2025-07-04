import React, { useContext } from "react";
import SignUpForm from "./components/SignUpForm";
import LoginForm from "./components/LoginForm";
import { Route, Routes } from "react-router-dom";
import AppContext from "./context/AppContext";
import Home from "./components/Home";
import { useSelector } from "react-redux";

const App = () => {
  const isRegister = useSelector(state=>state.auth.isRegister)
  const isLoggedIn = useSelector(state=>state.auth.isLoggedIn)
  // const { isLoggedIn } = useContext(AppContext);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={isRegister ? <SignUpForm /> : <LoginForm />}
        ></Route>
        <Route path="/home" element={isLoggedIn? <Home />:<LoginForm/>}></Route>
      </Routes>
    </>
  );
};

export default App;
