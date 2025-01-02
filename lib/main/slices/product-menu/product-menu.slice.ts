import { createSlice } from "@reduxjs/toolkit";

export interface item {
  id: number;
  name: string;
}

export interface subCategory {
  id: number;
  name: string;
  items: item[];
  photo: string;
}

export interface menuOption {
  id: number;
  name: string;
  photo: string;
  subCategory: subCategory[];
}

interface menuDetails {
  isLoaded: boolean;
  items: menuOption[];
}
const initialState: menuDetails = {
  isLoaded: false,
  items: [],
};

export const productMenuSlice = createSlice({
  name: "productMenu",
  initialState: initialState,
  reducers: {
    setMenuOptions(_, { payload }: { payload: menuDetails }) {
      return payload;
    },
  },
});

export const { setMenuOptions } = productMenuSlice.actions;
