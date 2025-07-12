import { render, screen } from "@testing-library/react";
import SignUpForm from "./SignUpForm";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import store from "../store/index";

describe("SignUpForm Component", () => {
  test("Sign Up button in the form", () => {
    render(
      <Provider store={store}>
        <SignUpForm />
      </Provider>
    );
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
  });

  test("password in the form", () => {
    render(
      <Provider store={store}>
        <SignUpForm />
      </Provider>
    );
    expect(screen.getByText("Password")).toBeInTheDocument();
  });

  test("confirm password in the form", () => {
    render(
      <Provider store={store}>
        <SignUpForm />
      </Provider>
    );
    expect(screen.getByText("Confirm Password")).toBeInTheDocument();
  });

  test("email address in the form", () => {
    render(
      <Provider store={store}>
        <SignUpForm />
      </Provider>
    );
    expect(screen.getByText(/signup/i)).toBeInTheDocument();
  });

  test("email address in the form", () => {
    render(
      <Provider store={store}>
        <SignUpForm />
      </Provider>
    );
    expect(screen.getByText("Already have an account ?")).toBeInTheDocument();
  });
});
