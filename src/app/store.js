import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";
import authSliceReducer from "../features/auth/authSlice";
import productsSliceReducer from "../features/products/productSlice";
import cartSliceReducer from "../features/cart/cartSlice";
import orderSliceReducer from "../features/order/orderSlice";
import promocodeSlice from "../features/promcode/promocodeSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    user: authSliceReducer,
    products: productsSliceReducer,
    carts: cartSliceReducer,
    orders: orderSliceReducer,
    promocodes: promocodeSlice,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat(apiSlice.middleware),
});
