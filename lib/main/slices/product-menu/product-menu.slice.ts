import { createSlice } from "@reduxjs/toolkit";

export interface item {
  id: number;
  name: string;
}

export interface subCategory {
  id: number;
  name: string;
  items: item[];
}

export interface menuOption {
  id: number;
  name: string;
  photo: string;
  subCategory: subCategory[];
}

const initialState: menuOption[] = [];

export const productMenuSlice = createSlice({
  name: "productMenu",
  initialState: initialState,
  reducers: {
    setMenuOptions(_, { payload }: { payload: menuOption[] }) {
      return payload;
    },
  },
});

export const { setMenuOptions } = productMenuSlice.actions;
