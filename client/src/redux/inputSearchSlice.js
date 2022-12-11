import { createSlice } from "@reduxjs/toolkit";

export const inputSearchSlice = createSlice({
  name: "inputSearch",
  initialState: {
    search: "",
    categoryId: 0,
  },
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setCategoryId: (state, action) => {
      state.categoryId = action.payload;
    },
    resetAll: (state) => {
      state.search = "";
      state.categoryId = 0;
    },
  },
});

export const { setSearch, setCategoryId, resetAll } = inputSearchSlice.actions;

export default inputSearchSlice.reducer;
