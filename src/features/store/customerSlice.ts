// store/slices/customerSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CustomerData } from "@/features/type/type";

interface CustomerState {
  selectedCustomer: CustomerData | null;
}

const initialState: CustomerState = {
  selectedCustomer: null,
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    setCustomer: (state, action: PayloadAction<Partial<CustomerData>>) => {
      state.selectedCustomer = {
        ...state.selectedCustomer,
        ...action.payload,
      } as CustomerData;
    },
    updateContactId: (state, action: PayloadAction<string>) => {
      if (state.selectedCustomer) {
        state.selectedCustomer.ContactId = action.payload;
      }
    },
    clearCustomer: (state) => {
      state.selectedCustomer = null;
    },
  },
});

export const { setCustomer, updateContactId, clearCustomer } =
  customerSlice.actions;
export default customerSlice.reducer;
