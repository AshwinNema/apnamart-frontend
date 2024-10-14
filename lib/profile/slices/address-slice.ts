import { createSlice } from "@reduxjs/toolkit";

export enum addressType {
  home = "home",
  work = "work",
  others = "others",
}

interface address {
  latitude: number;
  longtitude: number;
  addressLine1: string;
  addressLine2: string;
  addressType: addressType;
  otherAddress: string;
  zoom: number;
}

const initialState: address = {
  latitude: 12.923946516889448,
  longtitude: 77.5526110768168,
  addressLine1: "",
  addressLine2: "",
  addressType: addressType.home,
  otherAddress: "",
  zoom: 16,
};

export const addressDetailsSlice = createSlice({
  name: "addressDetails",
  initialState,
  reducers: {
    setAddressDetails(state, { payload }) {
      Object.assign(state, payload);
    },
  },
});

export const { setAddressDetails } = addressDetailsSlice.actions;
