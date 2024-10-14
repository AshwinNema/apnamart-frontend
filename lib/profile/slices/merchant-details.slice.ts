import { Merchantdetails } from "@/lib/main/slices/user/user.slice";
import { createSlice } from "@reduxjs/toolkit";

export interface merchantRegistrationDetails extends Merchantdetails {
  totalCompletedSteps: number;
  currentStep: number;
  zoom: number;
  showImage: boolean;
  showUpdateSaveImgBtn: boolean;
  showImgChangeBtn: boolean;
}

const initialState: merchantRegistrationDetails = {
  totalCompletedSteps: 0,
  currentStep: 0,
  isMerchantBlocked: false,
  latitude: 12.923946516889448,
  longtitude: 77.5526110768168,
  addressLine1: "",
  addressLine2: "",
  bankAcNo: "",
  gstIn: "",
  panCard: "",
  zoom: 16,
  pinCode: "",
  showImage: false,
  showUpdateSaveImgBtn: false,
  name: "",
  description: "",
  photo: "",
  registrationStatus: null,
  showImgChangeBtn: true,
};

export const merchantDetailsSlice = createSlice({
  name: "merchantDetails",
  initialState,
  reducers: {
    setMerchantDetails: (state, { payload }) => {
      Object.assign(state, payload);
    },
  },
});

export const { setMerchantDetails } = merchantDetailsSlice.actions;
