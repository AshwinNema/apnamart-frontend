import { addressConfig, mainConfig } from "./configs & default-vals";
import { modalConfig, paymentOptions } from "./enums & interfaces";
import { Dispatch, SetStateAction } from "react";

export * from "./configs & default-vals";
export * from "./enums & interfaces";

export type setModalConfig = Dispatch<SetStateAction<modalConfig>>;

export type setMainConfig = Dispatch<SetStateAction<mainConfig>>;

export type setAddressConfig = Dispatch<SetStateAction<addressConfig>>;

export const paymentSelectOptions: { label: string; key: paymentOptions }[] = [
  {
    label: "Cash",
    key: paymentOptions.cash,
  },
  {
    label: "Razorpay",
    key: paymentOptions.razorpay,
  },
  { label: "Stripe", key: paymentOptions.stripe },
];

export type componentNotifier = {
  type: "payment mode change";
  details: paymentOptions;
};
