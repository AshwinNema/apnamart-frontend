import { createSlice } from "@reduxjs/toolkit";

export const cartCountSlice = createSlice({
  name: "cartCount",
  initialState: 0,
  reducers: {
    setCartCount(_, action) {
      return action.payload;
    },
  },
});

export const { setCartCount } = cartCountSlice.actions;
