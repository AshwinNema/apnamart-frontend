import {
  getLocalStorageKey,
  storageAttributes,
} from "@/app/_services/web-storage.service";
import { addressType } from "@/lib/profile/slices/address-slice";

import { createSlice } from "@reduxjs/toolkit";

export enum UserRole {
  customer = "customer",
  admin = "admin",
  merchant = "merchant",
}

export enum merchantRegistrationStatus {
  adminReview = "review_by_admin",
  completed = "completed",
}

export interface Merchantdetails {
  id?: number;
  name: string;
  description: string;
  isMerchantBlocked: boolean;
  registrationStatus: merchantRegistrationStatus | null;
  latitude: number;
  longtitude: number;
  addressLine1: string;
  addressLine2: string;
  bankAcNo: string;
  gstIn: string;
  panCard: string;
  pinCode: string;
  photo: string;
}

export interface UserInterface {
  id: number;
  name: string;
  email: string;
  password: string;
  userRoles: UserRole[];
  role: UserRole;
  address?: {
    addressLine1: string;
    addressLine2: string;
    addressType: addressType;
    latitude: number;
    longtitude: number;
    otherAddress?: string;
  };
  phoneNo: string;
  photo: string;
  cloudinary_public_id: string;
  createdAt: Date;
  updatedAt: Date;
  isBlackListed: boolean;
  archive: boolean;
  merchantDetails?: Merchantdetails | null;
}

export const userSlice = createSlice({
  name: "user",
  initialState:
    getLocalStorageKey<UserInterface>(storageAttributes.user) || null,
  reducers: {
    setUser(_, action) {
      return action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
