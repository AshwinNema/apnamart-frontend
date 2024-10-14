import { createSlice } from "@reduxjs/toolkit";

export enum tabKeys {
  profile = "Profile",
  basicDetails = "Basic details",
  address = "address",
  settings = "settings",
  merchantRegistration = "Merchant Registration",
}

interface componentState {
  tab: tabKeys;
}

const initialState: componentState = {
  tab: tabKeys.basicDetails,
};

export const componentDetailsSlice = createSlice({
  name: "componentState",
  initialState,
  reducers: {
    setTab(state, { payload }) {
      state.tab = payload;
    },
  },
});

export const { setTab } = componentDetailsSlice.actions;
