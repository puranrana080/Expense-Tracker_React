import { createSlice } from "@reduxjs/toolkit";

const initialThemeState = { isPremiumActivated: false, isLight: true };
const themeSlice = createSlice({
  name: "theme",
  initialState: initialThemeState,
  reducers: {
    activatePremium(state) {
      state.isPremiumActivated = true;
    },

    toggleTheme(state) {
      state.isLight = !state.isLight;
    },
  },
});

export const themeActions = themeSlice.actions;
export default themeSlice.reducer;
