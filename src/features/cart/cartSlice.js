import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.cartItems.push(action.payload);
    },

    removeItem: (state, action) => {
      const filterdItem = state.cartItems.filter(
        (item) => item._id != action.payload._id
      );
      state.cartItems = filterdItem;
    },

    setCart: (state, action) => {
      state.cartItems = [];
    },
  },
});

export const { addItem, removeItem, setCart } = cartSlice.actions;
export default cartSlice.reducer;
