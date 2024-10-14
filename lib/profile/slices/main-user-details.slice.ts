import { createSlice } from "@reduxjs/toolkit";

interface mainDetails {
  name: string;
  email: string;
  password: string;
}

const initialState: mainDetails = {
  name: "",
  email: "",
  password: "",
};

export const mainUserDetailsSlice = createSlice({
  name: "mainUserDetails",
  initialState,
  reducers: {
    setUserDetails(state, { payload }) {
      Object.assign(state, payload);
    },
  },
});

export const { setUserDetails } = mainUserDetailsSlice.actions;
