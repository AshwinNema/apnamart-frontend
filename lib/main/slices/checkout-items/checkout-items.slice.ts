import { createSlice } from "@reduxjs/toolkit";

export interface checkOutItem {
  count: number;
  details: {
    id: number;
    name: string;
    price: number;
    photos: {
      url: string;
    }[];
    allowedUnitsPerOrder: number;
  };
}

const initialState: checkOutItem[] = [];

export const cartCheckoutItemSlice = createSlice({
  name: "cartCheckoutItems",
  initialState,
  reducers: {
    setCartCheckoutItems(_, { payload }) {
      return payload;
    },
  },
});

export const { setCartCheckoutItems } = cartCheckoutItemSlice.actions;
