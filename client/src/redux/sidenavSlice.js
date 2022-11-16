import { createSlice } from "@reduxjs/toolkit";

export const sidenavSlice = createSlice({
  name: "sidenavState",
  initialState: {
    value: false,
    subsidenavValue: false,
    hoverCard: false,
  },
  reducers: {
    setIsOpen: (state) => {
      state.value = !state.value;
    },
    setSubSideNav: (state, action) => {
      state.subsidenavValue = action.payload;
    },
    setHoverCard: (state, action) => {
      state.hoverCard = action.payload;
    },
  },
});

export const { setIsOpen, setSubSideNav, setHoverCard } = sidenavSlice.actions;

export default sidenavSlice.reducer;
