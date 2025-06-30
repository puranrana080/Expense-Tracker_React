import React, { useState } from "react";

const ExpenseForm = (props) => {
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
  console.log(userInput);
  return (
    <div>
      <form>
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
              <option value="shopping">Groceries</option>
              <option value="entertainment">Shopping</option>
              <option value="entertainment">Subscriptions</option>
              <option value="entertainment">Insurance</option>
              <option value="entertainment">Investments</option>
              <option value="entertainment">Salary</option>
              <option value="entertainment">Entertainment</option>
              <option value="entertainment">Other</option>
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
    </div>
  );
};

export default ExpenseForm;
