import { createSlice } from "@reduxjs/toolkit";

export const sidenavSlice = createSlice({
  name: "sidenavState",
  initialState: {
    value: false,
    subsidenavValue: false,
  },
  reducers: {
    setIsOpen: (state) => {
      console.log(state);
      state.value = !state.value;
    },
    setSubSideNav: (state, action) => {
      state.subsidenavValue = action.payload;
    },
  },
});

export const { setIsOpen, setSubSideNav } = sidenavSlice.actions;

export default sidenavSlice.reducer;
