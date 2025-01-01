import { createSlice } from "@reduxjs/toolkit";

export interface checkoutItem {
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

const initialState: checkoutItem[] = [];

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
