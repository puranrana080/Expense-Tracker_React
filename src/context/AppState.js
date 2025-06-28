import React, { useState } from "react";
import AppContext from "./AppContext";

const AppState = (props) => {
  const [isRegister, setIsRegister] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AppContext.Provider
      value={{ isRegister, setIsRegister, isLoggedIn, setIsLoggedIn }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
