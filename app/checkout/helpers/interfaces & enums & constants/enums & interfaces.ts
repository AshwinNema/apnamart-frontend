import { uploadedImgDetails } from "@/app/merchant/products/helpers";
import { addressType } from "@/lib/profile/slices/address-slice";
import { Dispatch, SetStateAction } from "react";

export enum modalTypes {
  noAddress = "No user address",
  emptyCart = "Empty cart",
}

export enum paymentOptions {
  stripe = "stripe",
  razorpay = "razorpay",
  cash = "cash",
}

export interface modalConfig {
  type: null | modalTypes;
  isDismissable: boolean;
  hideCloseButton: boolean;
}

export interface addressDrawerConfig {
  addressLine1: string;
  addressLine2: string;
  addressType: addressType | null;
  otherAddress: string;
}

export type setAddressDrawerConfig = Dispatch<
  SetStateAction<addressDrawerConfig>
>;

export interface orderSummaryConfig {
  accordionVal: Set<string>;
}

export const defaultOrderSummaryConfig = (): orderSummaryConfig => ({
  accordionVal: new Set(),
});

export interface cartCheckoutItem {
  id: number;
  name: string;
  price: number;
  productId: number;
  quantity: number;
  photos: uploadedImgDetails[];
  allowedUnitsPerOrder: number;
}
