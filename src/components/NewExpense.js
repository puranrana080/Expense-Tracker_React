import React, { useContext } from "react";
import ExpenseForm from "./ExpenseForm";
import Expenses from "./Expenses";
import AppContext from "../context/AppContext";

const NewExpense = () => {
  const { check, setCheck, setIsEditing } = useContext(AppContext);
  return (
    <>
      <div
        className="text-center"
        style={{ width: "50%", margin: "1rem auto" }}
      >
        {!check && (
          <button className="btn btn-warning " onClick={() => setCheck(true)}>
            Add Expense
          </button>
        )}
        {check && (
          <ExpenseForm
            onCancelClick={() => {
              setCheck(false);
              setIsEditing(false);
            }}
            onAddClick={() => setCheck(false)}
          />
        )}
      </div>
      <div
        className="text-center"
        style={{
          width: "70%",
          margin: "1rem auto",
        }}
      >
        <Expenses />
      </div>
    </>
  );
};

export default NewExpense;
