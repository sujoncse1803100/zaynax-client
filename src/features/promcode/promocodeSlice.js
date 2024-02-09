import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  promocodes: [],
};

const promocodeSlice = createSlice({
  name: "promocodes",
  initialState,
  reducers: {
    setPromocodes: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const { setPromocodes } = promocodeSlice.actions;
export default promocodeSlice.reducer;
