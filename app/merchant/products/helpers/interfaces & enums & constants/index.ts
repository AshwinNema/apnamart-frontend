import { Dispatch, SetStateAction } from "react";
import { createUpdateProductConfig } from "./create-update-product-config";
import { queriedProduct, uploadedImgDetails } from "./landing-screen";

export * from "./specifications";
export * from "./create-update-product-config";
export * from "./description";
export * from "./landing-screen";

export interface mainConfig {
  currentState: "create" | "update" | "main screen";
  page: number;
  totalResults: number;
  limit: number;
  totalPages: number;
  results: queriedProduct[];
  updateData: null | queriedProduct;
}

export const getDefaultMainConfig = (): mainConfig => ({
  currentState: "main screen",
  page: 1,
  totalResults: 0,
  limit: 10,
  totalPages: 0,
  results: [],
  updateData: null,
});

export type setMainConfig = Dispatch<SetStateAction<mainConfig>>;

export interface productFilterModalState {
  details: createUpdateProductConfig["selectedOptions"];
}

export type setProductFilterModalState = Dispatch<
  SetStateAction<productFilterModalState>
>;

export interface productImgsModalState {
  view: "upload images" | "view images";
  deletedImgs: uploadedImgDetails[];
  uploadedImgs: uploadedImgDetails[];
  cachedFiles: File[];
  productImages: File[];
}

export type setProductImgsModalState = Dispatch<
  SetStateAction<productImgsModalState>
>;

export const getDefaultProductImgsModalState = (): productImgsModalState => ({
  view: "upload images",
  deletedImgs: [],
  uploadedImgs: [],
  cachedFiles: [],
  productImages: [],
});
