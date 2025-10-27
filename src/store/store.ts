import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./slices/themeSlice";
import customerReducer from "@/features/store/customerSlice";
import productListReducer from "@/features/store/productListSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    customer: customerReducer,
    productList: productListReducer, // <-- اضافه شد
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
