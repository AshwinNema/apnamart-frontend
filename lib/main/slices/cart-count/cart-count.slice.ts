import { createSlice } from "@reduxjs/toolkit";

export const cartCountSlice = createSlice({
  name: "cartCount",
  initialState: {
    count: 0,
    isFetched: false,
  },
  reducers: {
    clearCartCount(state) {
      state.count = 0;
      state.isFetched = false;
    },
    setCartCount(state, action) {
      state.count = action.payload;
      state.isFetched = true;
    },
    setCartCountLoaded(state) {
      state.isFetched = true;
    },
  },
});

export const { setCartCount, setCartCountLoaded, clearCartCount } =
  cartCountSlice.actions;
