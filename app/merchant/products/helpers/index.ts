import { createContext, Dispatch, SetStateAction } from "react";
import {
  createUpdateProductConfig,
  mainConfig,
} from "./interfaces & enums & constants";

export * from "./apis";
export * from "./interfaces & enums & constants";
export * from "./validations";
export * from "./specifications";

export const MainContext = createContext<{
  config: mainConfig;
  setConfig: Dispatch<SetStateAction<mainConfig>>;
} | null>(null);

export const MainCreateUpdateProductContext = createContext<{
  config: createUpdateProductConfig;
  setConfig: Dispatch<SetStateAction<createUpdateProductConfig>>;
} | null>(null);
