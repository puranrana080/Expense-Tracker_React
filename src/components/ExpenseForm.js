import React, { useContext, useState } from "react";
import AppContext from "../context/AppContext";

const ExpenseForm = (props) => {
  const {setExpenseData} = useContext(AppContext)
  const [userInput, setUserInput] = useState({
    enteredAmount: "",
    enteredDescription: "",
    enteredCategory: "",
  });
  const changeHandler = (e) => {
    setUserInput((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleAddExpense = (e) => {
    e.preventDefault();
    fetch(
      `https://expensetracker-534d7-default-rtdb.firebaseio.com/expenses.json`,
      {
        method: "POST",
        body: JSON.stringify({
          amount: userInput.enteredAmount,
          description: userInput.enteredDescription,
          category: userInput.enteredCategory,
        }),
        headers: { "Content-Type": "application/json" },
      }
    ).then((res) => {
      if (res.ok) {
        return res.json().then((data) => {
          const generatedId = data.name;
          const newExpense = {
            amount: userInput.enteredAmount,
            description: userInput.enteredDescription,
            category: userInput.enteredCategory,
          };
          setExpenseData((prev) => ({
            ...prev,
            [generatedId]: newExpense,
          }));
          alert("Expense Added");
          props.onAddClick();
          setUserInput({
            enteredAmount: "",
            enteredDescription: "",
            enteredCategory: "",
          });
        });
      } else {
        return res.json().then((data) => {
          let errorMsg = " Expense not added";
          if (data) {
            errorMsg = data?.error?.message;
          }
          alert(errorMsg);
        });
      }
    });
  };
  return (
    <div>
      <form onSubmit={handleAddExpense}>
        <div className="expense__controls">
          <div className="new-expense__control">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              id="amount"
              name="enteredAmount"
              value={userInput.enteredAmount}
              onChange={changeHandler}
            />
          </div>
          <div className="new-expense__control">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              id="description"
              name="enteredDescription"
              value={userInput.enteredDescription}
              onChange={changeHandler}
            />
          </div>
          <div className="new-expense__control">
            <label htmlFor="category">Category:</label>
            <select
              id="category"
              name="enteredCategory"
              value={userInput.enteredCategory}
              onChange={changeHandler}
            >
              <option value="">--Select Category--</option>
              <option value="food">Food</option>
              <option value="travel">Travel</option>
              <option value="Groceries">Groceries</option>
              <option value="Shopping">Shopping</option>
              <option value="Subscriptions">Subscriptions</option>
              <option value="Insurance">Insurance</option>
              <option value="Investments">Investments</option>
              <option value="Salary">Salary</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
        <div className="new-expense__button">
          <button className="btn btn-danger" onClick={props.onCancelClick}>
            Cancel
          </button>
          <button className="btn btn-warning" type="submit">
            Add Expense
          </button>
        </div>
      </form>
      <hr></hr>
    </div>
  );
};

export default ExpenseForm;
