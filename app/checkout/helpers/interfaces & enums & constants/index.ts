import { AddressDisplayState } from "@/app/profile/shared-components/shared-map";
import { checkoutItem } from "@/lib/main/slices/checkout-items/checkout-items.slice";
import { addressType } from "@/lib/profile/slices/address-slice";
import { Dispatch, SetStateAction } from "react";

export enum modalTypes {
  noAddress = "No user address",
  emptyCart = "Empty cart",
}

export interface modalConfig {
  type: null | modalTypes;
  isDismissable: boolean;
  hideCloseButton: boolean;
}

export type setModalConfig = Dispatch<SetStateAction<modalConfig>>;

export interface mainConfig {
  cartItems: checkoutItem[];
  address: {
    latitude: number;
    longtitude: number;
    addressLine1: string;
    addressLine2: string;
    addressType: addressType | null;
    otherAddress: string;
  };
  selectedStage: null | number;
}

export type setMainConfig = Dispatch<SetStateAction<mainConfig>>;

export const getDefaultConfig = (): mainConfig => ({
  cartItems: [],
  address: {
    latitude: 12.923946516889448,
    longtitude: 77.5526110768168,
    addressLine1: "",
    addressLine2: "",
    addressType: addressType.home,
    otherAddress: "",
  },
  selectedStage: null,
});

export interface addressConfig extends AddressDisplayState {
  details: mainConfig["address"];
  accordionVal: Set<string>;
}

export type setAddressConfig = Dispatch<SetStateAction<addressConfig>>;

export const getDefaultAddressConfig = (): addressConfig => ({
  address: "",
  isAddLoaded: false,
  details: getDefaultConfig().address,
  flyToLocation: null,
  fly: false,
  accordionVal: new Set([]),
});

export interface addressDrawerConfig {
  addressLine1: string;
  addressLine2: string;
  addressType: addressType | null;
  otherAddress: string;
}

export const getDefaultAddressDrawerConfig = (): addressDrawerConfig => ({
  addressLine1: "",
  addressLine2: "",
  addressType: null,
  otherAddress: "",
});

export type setAddressDrawerConfig = Dispatch<
  SetStateAction<addressDrawerConfig>
>;
