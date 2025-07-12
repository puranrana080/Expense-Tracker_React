import { render, screen } from "@testing-library/react";
import ExpenseForm from "./ExpenseForm";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import Expenses from "./Expenses";
import store from "../store/index";

describe("Renders ExpenseForm", () => {
  test("amount label in the form", () => {
    render(
      <Provider store={store}>
        <ExpenseForm />
      </Provider>
    );
    const amountElement = screen.getByLabelText("Amount");
    expect(amountElement).toBeInTheDocument();
  });
  test("description label in the form", () => {
    render(
      <Provider store={store}>
        <ExpenseForm />
      </Provider>
    );
    const amountElement = screen.getByLabelText("Description");
    expect(amountElement).toBeInTheDocument();
  });
  test("category: label in the form", () => {
    render(
      <Provider store={store}>
        <ExpenseForm />
      </Provider>
    );
    const amountElement = screen.getByLabelText("Category:");
    expect(amountElement).toBeInTheDocument();
  });
});
