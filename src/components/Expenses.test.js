import { render, screen } from "@testing-library/react";
import Expenses from "./Expenses";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";

const mockStore = configureStore([]);

test("renders 'All Expenses' heading", () => {
  const store = mockStore({
    auth: { userId: "test-user" },
    expense: { expenseData: {}, formCheck: false, isEditing: false },
    theme: { isPremiumActivated: false },
  });

  render(
    <Provider store={store}>
      <Expenses />
    </Provider>
  );

  const heading = screen.getByText("All Expenses");
  expect(heading).toBeInTheDocument();
});
