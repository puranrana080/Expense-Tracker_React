import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = { isRegister: true, isLoggedIn: false, userId: null };
const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    loginForm(state) {
      state.isRegister = false;
    },
    register(state) {
      state.isRegister = true;
    },

    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
    },
    loggedUserId(state, action) {
      state.userId = action.payload;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
