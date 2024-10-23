import { Dispatch, SetStateAction } from "react";
import { createUpdateProductConfig } from "./create-update-product-config";

export * from "./specifications";
export * from "./create-update-product-config";
export * from "./description";

export interface mainConfig {
  currentState: "create" | "update" | "main screen";
}

export interface productFilterModalState {
  details: createUpdateProductConfig["selectedOptions"];
}

export type setProductFilterModalState = Dispatch<
  SetStateAction<productFilterModalState>
>;
