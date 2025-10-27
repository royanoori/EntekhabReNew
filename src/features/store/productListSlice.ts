import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// نوع داده‌ی هر محصول در لیست
export interface ProductItem {
  brandId: string;
  brandName: string;
  productId: string;
  productName: string;
  lifetime: string;
  status: string;
  parts: string;
}

// استیت کلی
interface ProductListState {
  items: ProductItem[];
}

const initialState: ProductListState = {
  items: [],
};

export const productListSlice = createSlice({
  name: "productList",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<ProductItem>) => {
      state.items.push(action.payload);
    },
    removeProduct: (state, action: PayloadAction<number>) => {
      state.items.splice(action.payload, 1);
    },
    clearProducts: (state) => {
      state.items = [];
    },
  },
});

export const { addProduct, removeProduct, clearProducts } =
  productListSlice.actions;
export default productListSlice.reducer;
