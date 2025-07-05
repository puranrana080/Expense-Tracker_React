import React, {  useMemo } from "react";

import { useDispatch, useSelector } from "react-redux";
import { expenseActions } from "../store/expense";

const Expenses = () => {
  const dispatch = useDispatch();
  const expenseData = useSelector((state) => state.expense.expenseData);
  const userId = useSelector((state) => state.auth.userId);
  const check = useSelector((state) => state.expense.formCheck);
  const isEditing = useSelector((state) => state.expense.isEditing);

  const totalAmount = useMemo(() => {
    return Object.values(expenseData).reduce((acc, curr) => {
      return acc + Number(curr.amount);
    }, 0);
  }, [expenseData]);

  const fetchExpenses = () => {
    fetch(
      `https://expensetracker-534d7-default-rtdb.firebaseio.com/expenses/${userId}.json`,
      {
        method: "GET",
      }
    ).then((res) => {
      if (res.ok) {
        return res.json().then((data) => {
          dispatch(expenseActions.setExpense(data));
          console.log("All Expenses", data);
        });
      }
    });
  };
   fetchExpenses();

  const handleDeleteExpense = async (id) => {
    const response = await fetch(
      `https://expensetracker-534d7-default-rtdb.firebaseio.com/expenses/${userId}/${id}.json`,
      {
        method: "DELETE",
      }
    );
    await response.json();
    fetchExpenses();
    alert("Expense Deleted");
  };

  const handleEditExpense = async (id) => {
    const expenseToEdit = expenseData[id];
    dispatch(
      expenseActions.setEditData({
        id: id,
        enteredAmount: expenseToEdit.amount,
        enteredDescription: expenseToEdit.description,
        enteredCategory: expenseToEdit.category,
      })
    );
    if (!isEditing) {
      dispatch(expenseActions.toggleEditing());
    }

    if (!check) {
      dispatch(expenseActions.toggleFormCheck());
    }
  };

  return (
    <>
      <div>
        <hr></hr>
        <div>
          <h1>All Expenses</h1>
          {totalAmount > 1000 && (
            <div>
              <button className="btn btn-dark btn-sm">Activate Premium </button>
            </div>
          )}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "2px" }}>
          {expenseData ? (
            Object.entries(expenseData)?.map(([key, value]) => (
              <div
                key={key}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  padding: "10px",
                  marginBottom: "10px",
                  backgroundColor: "#f9f9f9",
                  width: "300px",
                  margin: "1rem auto",
                }}
              >
                <p style={{ margin: 0, fontWeight: "bold", color: "#333" }}>
                  ₹{value.amount}
                </p>
                <p style={{ margin: 0, color: "#666" }}>{value.description}</p>
                <p
                  style={{
                    margin: 0,
                    color: "#666",
                    backgroundColor: "pink",
                    borderRadius: "10px",
                  }}
                >
                  {value.category}
                </p>
                <div>
                  <button
                    className="btn btn-primary btn-sm m-2"
                    onClick={() => handleEditExpense(key)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDeleteExpense(key)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center" style={{ width: "100%" }}>
              No expenses yet
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Expenses;
