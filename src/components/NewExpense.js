import React, { useState } from "react";
import ExpenseForm from "./ExpenseForm";
import Expenses from "./Expenses";

const NewExpense = () => {
  const [check, setCheck] = useState(false);
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
        {check && <ExpenseForm onCancelClick={() => setCheck(false)} />}
      </div>
      <div
        className="text-center"
        style={{
          width: "70%",
          margin: "1rem auto",
          border: "1px solid yellow",
        }}
      >
        <Expenses />
      </div>
    </>
  );
};

export default NewExpense;
