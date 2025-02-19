import { Dispatch, SetStateAction } from "react";
import { uploadedImgDetails } from "./landing-screen";

export interface productImgsModalState {
  view: "upload images" | "view images";
  deletedImgs: uploadedImgDetails[];
  uploadedImgs: uploadedImgDetails[];
  cachedFiles: File[];
  productImages: File[];
  firstVisibleUploadIndex: number;
  firstVisibleDeletedIndex: number;
  translateUploadImgsX: number;
  translateDeletedImgsX: number;
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
  firstVisibleUploadIndex: 0,
  translateUploadImgsX: 0,
  translateDeletedImgsX: 0,
  firstVisibleDeletedIndex: 0,
});

export interface uploadedImgsConfig {
  showNextArrow: boolean;
  itemLeft: [number, number];
  hasInteracted: boolean;
}

export type setUploadedImgsConfig = Dispatch<
  SetStateAction<uploadedImgsConfig>
>;

export const defaultUploadedImgsConfig = (): uploadedImgsConfig => ({
  showNextArrow: false,
  itemLeft: [0, 0],
  hasInteracted: false,
});

export type uploadImgActions = {
  type: "img intersection";
  details: {
    isIntersecting: boolean;
    bounds: DOMRect;
  };
};

export interface uploadImgProps {
  imgDetails: uploadedImgDetails;
  index: number;
  takeAction: (details: uploadImgActions) => void;
  deleteImg: () => void;
}

export interface deletedImgProps {
  imageDetails: uploadedImgDetails;
  config: uploadedImgsConfig;
  index: number;
  setConfig: setUploadedImgsConfig;
  handleImageIntersection: (
    isIntersecting: boolean,
    bounds: DOMRect,
    index: number,
  ) => void;
}

export type deleteImgsHook = [
  uploadedImgsConfig,
  setUploadedImgsConfig,
  (isIntersecting: boolean, bounds: DOMRect, index: number) => void,
  () => void,
];
