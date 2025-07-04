import React, { useState } from "react";
import AppContext from "./AppContext";

const AppState = (props) => {
  const [isRegister, setIsRegister] = useState(true);//jbj
  const [isLoggedIn, setIsLoggedIn] = useState(false);//sfs
  const [expenseData, setExpenseData] = useState({});//s
  const [check, setCheck] = useState(false);//ksd
  const [isEditing, setIsEditing] = useState(false);//sds
  const [editData, setEditData] = useState({});//hb
  const [userId,setUserId]=useState(null)
  // const userId = localStorage.getItem("userId");//h



  return (
    <AppContext.Provider
      value={{
        isRegister,
        setIsRegister,
        isLoggedIn,
        setIsLoggedIn,
        expenseData,
        setExpenseData,
        check,
        setCheck,
        isEditing,
        setIsEditing,
        editData,
        setEditData,
        userId,
        setUserId
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
