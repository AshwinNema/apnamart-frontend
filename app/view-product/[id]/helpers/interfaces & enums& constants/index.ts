import { queriedProduct } from "@/app/merchant/products/helpers";
import { Dispatch, SetStateAction } from "react";
import { Subject } from "rxjs";
import { notifier } from "./notifications";
import { modalTypes } from "@/app/layout-components/login-signup/constants";

export interface productDetails extends queriedProduct {
  cartQuantity?: number;
}

export interface mainConfig {
  details: null | productDetails;
  smallerImgWidth: number;
  smallerImgHeight: number;
  buttonLeftMargin: number;
  modalType: modalTypes;
  isDataLoaded: boolean;
  innerWidth: number;
}

export const getDefaultMainConfig = (): mainConfig => ({
  details: null,
  smallerImgWidth: 1,
  smallerImgHeight: 1,
  buttonLeftMargin: 0,
  modalType: modalTypes.login,
  isDataLoaded: false,
  innerWidth: window.innerWidth,
});

export * from "./notifications";
export * from "./subcomponent-config";

export type setMainConfig = Dispatch<SetStateAction<mainConfig>>;

export type mainContext = {
  config: mainConfig;
  setConfig: setMainConfig;
  notifier: Subject<notifier>;
};

export interface productBtnConfig {
  modalType: modalTypes;
  showAddCartLoader: boolean;
  showBuyNowSpinner: boolean;
}

export type setProductBtnConfig = Dispatch<SetStateAction<productBtnConfig>>;
