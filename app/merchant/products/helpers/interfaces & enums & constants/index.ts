import { Dispatch, SetStateAction } from "react";
import { createUpdateProductConfig } from "./create-update-product-config";
import { queriedProduct } from "./landing-screen";

export * from "./specifications";
export * from "./create-update-product-config";
export * from "./description";
export * from "./landing-screen";
export * from "./uploaded-imgs";

export interface mainConfig {
  currentState: "create" | "update" | "main screen";
  page: number;
  totalResults: number;
  limit: number;
  totalPages: number;
  results: queriedProduct[];
  updateData: null | queriedProduct;
  isLoaded: boolean;
}

export const getDefaultMainConfig = (): mainConfig => ({
  currentState: "main screen",
  page: 1,
  totalResults: 0,
  limit: 10,
  totalPages: 0,
  results: [],
  updateData: null,
  isLoaded: false,
});

export type setMainConfig = Dispatch<SetStateAction<mainConfig>>;

export interface productFilterModalState {
  details: createUpdateProductConfig["selectedOptions"];
}

export type setProductFilterModalState = Dispatch<
  SetStateAction<productFilterModalState>
>;

export interface productHighlightModalState {
  data: { id: string; data: string }[];
  showAddNewBtn: boolean;
  newHightlightPoint: string;
}

export const getDefaultProductHighlightModalState =
  (): productHighlightModalState => ({
    data: [],
    showAddNewBtn: true,
    newHightlightPoint: "",
  });

export type setProductHighlightModalState = Dispatch<
  SetStateAction<productHighlightModalState>
>;

export interface createUpdateKetValIconConfig {
  type: "new" | "edit";
  onCancel: () => void;
  onSuccess: () => void;
  entity?: string;
}
