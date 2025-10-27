// store/slices/customerSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ContactInfo } from "@/features/type/type";

interface CustomerState {
  selectedCustomer: ContactInfo | null;
}

const initialState: CustomerState = {
  selectedCustomer: null,
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    setCustomer: (state, action: PayloadAction<Partial<ContactInfo>>) => {
      state.selectedCustomer = {
        ...state.selectedCustomer,
        ...action.payload,
      } as ContactInfo;
    },
    clearCustomer: (state) => {
      state.selectedCustomer = null;
    },
  },
});

export const { setCustomer, clearCustomer } = customerSlice.actions;
export default customerSlice.reducer;
