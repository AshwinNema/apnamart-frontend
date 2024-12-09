import { createSlice } from "@reduxjs/toolkit";

export const cartCountSlice = createSlice({
  name: "cartCount",
  initialState: {
    count: 0,
    isFetched: false,
  },
  reducers: {
    setCartCount(state, action) {
      state.count = action.payload;
      state.isFetched = true;
    },
  },
});

export const { setCartCount } = cartCountSlice.actions;
