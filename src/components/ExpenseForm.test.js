import { render, screen } from "@testing-library/react";
import ExpenseForm from "./ExpenseForm";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import Expenses from "./Expenses";

const mockStore = configureStore([]);
describe("Renders ExpenseForm", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auth: { userId: "test-user" },
      expense: {
        isEditing: false,
        editData: {},
        formCheck: false,
      },
    });
  });

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
