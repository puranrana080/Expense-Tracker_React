import React, { useContext } from "react";
import ExpenseForm from "./ExpenseForm";
import Expenses from "./Expenses";
import AppContext from "../context/AppContext";
import { useDispatch, useSelector } from "react-redux";
import { expenseActions } from "../store/expense";

const NewExpense = () => {
  const dispatch = useDispatch()
  const check=useSelector(state=>state.expense.formCheck)
  const {  setCheck, setIsEditing } = useContext(AppContext);
  return (
    <>
      <div
        className="text-center"
        style={{ width: "50%", margin: "1rem auto" }}
      >
        {!check && (
          <button className="btn btn-warning " onClick={() => dispatch(expenseActions.toggleFormCheck())}>
            Add Expense
          </button>
        )}
        {check && (
          <ExpenseForm
            onCancelClick={() => {
              // setCheck(false);
              dispatch(expenseActions.toggleFormCheck())
              // setIsEditing(false);
              dispatch(expenseActions.toggleEditing())
            }}
            onAddClick={() => dispatch(expenseActions.toggleFormCheck())}
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
