import { render, screen } from "@testing-library/react";
import configureStore from "redux-mock-store";
import NewExpense from "./NewExpense";
import { Provider } from "react-redux";

const mockStore = configureStore([]);
describe("Renders ExpenseForm", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      expense: { formCheck: false, expenseData: {} },
      auth: { userId: "test-user" },
      theme: { isPremiumActivated: false },
    });
  });

  test("Add expense button", () => {
    render(
      <Provider store={store}>
        <NewExpense />
      </Provider>
    );

    const AddExpenseElement = screen.getByText("Add Expense");

    expect(AddExpenseElement).toBeInTheDocument();
  });
});
