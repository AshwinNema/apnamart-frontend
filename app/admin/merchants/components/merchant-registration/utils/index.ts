import { createContext, Dispatch, SetStateAction } from "react";
import { newRegistrationState } from "../../../helper";
export * from "./registration-table-rows";

export const MainStateContext = createContext<{
  config: newRegistrationState;
  setConfig: Dispatch<SetStateAction<newRegistrationState>>;
  getData: (page: number) => void;
} | null>(null);
