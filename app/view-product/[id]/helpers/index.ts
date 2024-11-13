import { queriedProduct } from "@/app/merchant/products/helpers";
import { createContext, Dispatch, SetStateAction } from "react";

export * from "./apis";

export interface mainConfig {
  details: null | queriedProduct;
}

export type setMainConfig = Dispatch<SetStateAction<mainConfig>>;

export const MainContext = createContext<null | {
  config: mainConfig;
  setConfig: setMainConfig;
}>(null);
