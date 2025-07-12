import { render, screen } from "@testing-library/react";
import configureStore from "redux-mock-store";
import NewExpense from "./NewExpense";
import { Provider } from "react-redux";
import store from "../store/index";

describe("Renders ExpenseForm", () => {
  test("Add expense button", () => {
    render(
      <Provider store={store}>
        <NewExpense />
      </Provider>
    );

    const AddExpenseElement = screen.getByText("Add Expense", { exact: true });

    expect(AddExpenseElement).toBeInTheDocument();
  });
});
