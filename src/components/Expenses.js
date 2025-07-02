import React, { useContext, useEffect } from "react";
import AppContext from "../context/AppContext";

const Expenses = () => {
  const { expenseData, fetchExpenses, setCheck, setIsEditing, setEditData } =
    useContext(AppContext);
  const userId = localStorage.getItem("userId");
  console.log("new data", expenseData);

  useEffect(() => {
    fetchExpenses();
  }, []);
  const handleDeleteExpense = async (id) => {
    const response = await fetch(
      `https://expensetracker-534d7-default-rtdb.firebaseio.com/expenses/${userId}/${id}.json`,
      {
        method: "DELETE",
      }
    );
    const data = await response.json();
    console.log("delete dta", data);
    fetchExpenses();
  };

  const handleEditExpense = async (id) => {
    const expenseToEdit = expenseData[id];
    setEditData({
      id: id,
      enteredAmount: expenseToEdit.amount,
      enteredDescription: expenseToEdit.description,
      enteredCategory: expenseToEdit.category,
    });
    setIsEditing(true);
    setCheck(true);
  };

  return (
    <>
      <div>
        <hr></hr>
        <div>
          <h1>All Expenses</h1>
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
