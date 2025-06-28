import React, { useContext } from "react";
import SignUpForm from "./components/SignUpForm";
import LoginForm from "./components/LoginForm";
import { Route, Routes } from "react-router-dom";
import AppContext from "./context/AppContext";
import Profile from "./components/Profile";

const App = () => {
  const { isRegister } = useContext(AppContext);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={isRegister ? <SignUpForm /> : <LoginForm />}
        ></Route>
        <Route path="/profile" element={<Profile />}></Route>
      </Routes>
    </>
  );
};

export default App;
