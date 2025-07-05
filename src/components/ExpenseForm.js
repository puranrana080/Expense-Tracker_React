import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { expenseActions } from "../store/expense";

const ExpenseForm = () => {
  const dispatch = useDispatch();
  const isEditing = useSelector((state) => state.expense.isEditing);
  const userId = useSelector((state) => state.auth.userId);
  const editData = useSelector((state) => state.expense.editData);
  const check = useSelector((state) => state.expense.formCheck);

  const [userInput, setUserInput] = useState({
    enteredAmount: "",
    enteredDescription: "",
    enteredCategory: "",
  });

  useEffect(() => {
    if (check && isEditing && editData && Object.keys(editData).length > 0) {
      setUserInput({
        enteredAmount: editData.enteredAmount || "",
        enteredDescription: editData.enteredDescription || "",
        enteredCategory: editData.enteredCategory || "",
      });
    }
  }, [editData, isEditing, check]);

  const changeHandler = (e) => {
    setUserInput((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const cancelClickHandler = () => {
    dispatch(expenseActions.toggleFormCheck());
    dispatch(expenseActions.setEditData());
    if (isEditing) {
      dispatch(expenseActions.toggleEditing());
    }
  };

  const handleAddExpense = (e) => {
    e.preventDefault();
    //Adding New Expense
    if (!isEditing) {
      fetch(
        `https://expensetracker-534d7-default-rtdb.firebaseio.com/expenses/${userId}.json`,
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
            dispatch(
              expenseActions.addExpense({
                id: generatedId,
                newExpense: newExpense,
              })
            );
            alert("Expense Added");
            dispatch(expenseActions.toggleFormCheck());
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
    }
    // Editing Existing Expense
    else {
      fetch(
        `https://expensetracker-534d7-default-rtdb.firebaseio.com/expenses/${userId}/${editData.id}.json`,
        {
          method: "PUT",
          body: JSON.stringify({
            amount: userInput.enteredAmount,
            description: userInput.enteredDescription,
            category: userInput.enteredCategory,
          }),
          headers: { "Content-Type": "application.json" },
        }
      ).then((res) => {
        if (res.ok) {
          return res.json().then((data) => {
            const editedExpense = {
              amount: userInput.enteredAmount,
              description: userInput.enteredDescription,
              category: userInput.enteredCategory,
            };
            dispatch(
              expenseActions.editExpense({
                id: editData.id,
                updatedExpense: editedExpense,
              })
            );
            alert("Expense Edited");
            dispatch(expenseActions.toggleFormCheck());
            dispatch(expenseActions.setEditData());
            dispatch(expenseActions.toggleEditing());
            setUserInput({
              enteredAmount: "",
              enteredDescription: "",
              enteredCategory: "",
            });
          });
        } else {
          return res.json().then((data) => {
            let errorMsg = " Expense not edited";
            if (data) {
              errorMsg = data?.error?.message;
            }
            alert(errorMsg);
          });
        }
      });
    }
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
          <button className="btn btn-danger" onClick={cancelClickHandler}>
            Cancel
          </button>
          <button className="btn btn-warning" type="submit">
            {!isEditing ? "Add Expense" : "Edit Expense"}
          </button>
        </div>
      </form>
      <hr></hr>
    </div>
  );
};

export default ExpenseForm;
