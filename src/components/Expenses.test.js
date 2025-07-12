import { render, screen } from "@testing-library/react";
import Expenses from "./Expenses";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import store from "../store/index";

test("renders 'All Expenses' heading", () => {
  render(
    <Provider store={store}>
      <Expenses />
    </Provider>
  );

  const heading = screen.getByText("All Expenses");
  expect(heading).toBeInTheDocument();
});
