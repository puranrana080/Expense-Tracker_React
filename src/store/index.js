import { configureStore } from "@reduxjs/toolkit";
import expenseReducer from "./expense";
import authReducer from "./auth";
import themeReducer from "./theme";

const store = configureStore({
  reducer: { expense: expenseReducer, auth: authReducer, theme: themeReducer },
});

export default store;
