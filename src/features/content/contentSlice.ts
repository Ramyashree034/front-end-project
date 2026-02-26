import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ContentItem {
  id: string;
  title: string;
  description: string;
  image?: string;
  url?: string;
  source?: string;
}

interface ContentState {
  items: ContentItem[];
  favorites: ContentItem[];
}

const initialState: ContentState = {
  items: [],
  favorites: [],
};

const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    setContent(state, action: PayloadAction<ContentItem[]>) {
      state.items = action.payload;
    },
    toggleFavorite(state, action: PayloadAction<ContentItem>) {
      const exists = state.favorites.find(
        (i) => i.id === action.payload.id
      );
      if (exists) {
        state.favorites = state.favorites.filter(
          (i) => i.id !== action.payload.id
        );
      } else {
        state.favorites.push(action.payload);
      }
    },
  },
});

export const { setContent, toggleFavorite } = contentSlice.actions;
export default contentSlice.reducer;