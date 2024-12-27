import { createContext } from "react";
import {
  addressConfig,
  addressDrawerConfig,
  mainConfig,
  setAddressConfig,
  setMainConfig,
} from "./interfaces & enums & constants";
import { successToast, validateZodSchema } from "@/app/_utils";
import { produce } from "immer";
import * as _ from "lodash";
import { drawerValidation } from "@/app/profile/address/utils";
export * from "./order-summary";
export * from "./interfaces & enums & constants";
export * from "./apis";
export * from "./checkout";

export type MainContextType = {
  config: mainConfig;
  setConfig: setMainConfig;
};

export const MainContext = createContext<null | MainContextType>(null);

export const AddressContext = createContext<null | {
  config: addressConfig;
  setConfig: setAddressConfig;
}>(null);

export const saveAddressDrawerVals = (
  details: addressDrawerConfig,
  setConfig: setAddressConfig,
  onClose: () => void,
) => {
  const { error, data } = validateZodSchema(details, drawerValidation, true);
  if (error || !data) return;
  setConfig(
    produce((draft) => {
      draft.details.addressLine1 = data.addressLine1;
      draft.details.addressLine2 = data.addressLine2;
      draft.details.addressType = data.addressType;
      draft.details.otherAddress = data.otherAddress;
    }),
  );
  successToast({
    msg: "Address details updated. Please click on save button to get details saved for checkout",
  });
  onClose();
};
