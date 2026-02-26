import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PreferencesState {
  categories: string[];
  darkMode: boolean;
}

const initialState: PreferencesState = {
  categories: ["technology"],
  darkMode: false,
};

const preferencesSlice = createSlice({
  name: "preferences",
  initialState,
  reducers: {
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode;
    },

    toggleCategory(state, action: PayloadAction<string>) {
      const cat = action.payload;

      if (state.categories.includes(cat)) {
        state.categories = state.categories.filter((c) => c !== cat);
      } else {
        state.categories.push(cat);
      }
    },
  },
});

export const { toggleDarkMode, toggleCategory } = preferencesSlice.actions;
export default preferencesSlice.reducer;