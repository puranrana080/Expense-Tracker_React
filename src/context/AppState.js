import React, { useState } from "react";
import AppContext from "./AppContext";

const AppState = (props) => {
  const [isRegister, setIsRegister] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [expenseData, setExpenseData] = useState({});
  const [check, setCheck] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const userId = localStorage.getItem("userId");

  const fetchExpenses = () => {
    fetch(
      `https://expensetracker-534d7-default-rtdb.firebaseio.com/expenses/${userId}.json`,
      {
        method: "GET",
      }
    ).then((res) => {
      if (res.ok) {
        return res.json().then((data) => {
          setExpenseData(data);
          console.log("All the data ", data);
        });
      }
    });
  };

  return (
    <AppContext.Provider
      value={{
        isRegister,
        setIsRegister,
        isLoggedIn,
        setIsLoggedIn,
        expenseData,
        setExpenseData,
        fetchExpenses,
        check,
        setCheck,
        isEditing,
        setIsEditing,
        editData,
        setEditData,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
