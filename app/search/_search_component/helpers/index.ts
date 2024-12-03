import {
  mainConfig,
  setMainConfig,
} from "./interfaces & constants & enums";
import { createContext } from "react";

export * from "./api";
export * from "./interfaces & constants & enums";
export * from "./price-filter";

export const MainContext = createContext<null | {
  config: mainConfig;
  setConfig: setMainConfig;
}>(null);
