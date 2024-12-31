import { addressType } from "@/lib/profile/slices/address-slice";
import {
  addressDrawerConfig,
  cartCheckoutItem,
  paymentOptions,
} from "./enums & interfaces";
import { AddressDisplayState } from "@/app/profile/shared-components/shared-map";

export interface mainConfig {
  checkoutId: null | number;
  cartItems: cartCheckoutItem[];
  address: {
    id: null | number;
    latitude: number;
    longtitude: number;
    addressLine1: string;
    addressLine2: string;
    addressType: addressType | null;
    otherAddress: string;
  };
  selectedStage: null | number;
  areCartItemsLoaded: boolean;
  paymentMode: paymentOptions;
  stripeClientSecret?: string;
}

export const getDefaultConfig = (): mainConfig => ({
  checkoutId: null,
  cartItems: [],
  address: {
    id: null,
    latitude: 12.923946516889448,
    longtitude: 77.5526110768168,
    addressLine1: "",
    addressLine2: "",
    addressType: addressType.home,
    otherAddress: "",
  },
  selectedStage: null,
  areCartItemsLoaded: false,
  paymentMode: paymentOptions.cash,
});

export const getDefaultAddressConfig = (): addressConfig => ({
  address: "",
  isAddLoaded: false,
  details: getDefaultConfig().address,
  flyToLocation: null,
  fly: false,
  accordionVal: new Set([]),
});

export interface addressConfig extends AddressDisplayState {
  details: mainConfig["address"];
  accordionVal: Set<string>;
}

export const getDefaultAddressDrawerConfig = (): addressDrawerConfig => ({
  addressLine1: "",
  addressLine2: "",
  addressType: null,
  otherAddress: "",
});
