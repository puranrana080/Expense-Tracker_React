import React from "react";
import ExpenseForm from "./ExpenseForm";
import Expenses from "./Expenses";
import { useDispatch, useSelector } from "react-redux";
import { expenseActions } from "../store/expense";

const NewExpense = () => {
  const dispatch = useDispatch();
  const check = useSelector((state) => state.expense.formCheck);

  return (
    <>
      <div
        className="text-center"
        style={{ width: "50%", margin: "1rem auto" }}
      >
        {!check && (
          <button
            className="btn btn-warning "
            onClick={() => dispatch(expenseActions.toggleFormCheck())}
          >
            Add Expense
          </button>
        )}
        {check && (
          <ExpenseForm
            onCancelClick={() => {
              dispatch(expenseActions.toggleFormCheck());
              dispatch(expenseActions.toggleEditing());
              dispatch(expenseActions.setEditData())
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
