import { Dispatch, SetStateAction } from "react";
import { uploadedImgDetails } from "./landing-screen";

export interface productImgsModalState {
  view: "upload images" | "view images";
  deletedImgs: uploadedImgDetails[];
  uploadedImgs: uploadedImgDetails[];
  cachedFiles: File[];
  productImages: File[];
  lastVisibleUploadIndex: number;
  translateUploadImgsX: number;
  lastVisibleDeletedIndex: number;
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
  lastVisibleUploadIndex: 0,
  translateUploadImgsX: 0,
  lastVisibleDeletedIndex: 0,
  translateDeletedImgsX: 0,
});

export interface uploadedImgsConfig {
  showNextArrow: boolean;
  showBackArrow: boolean;
  itemLeft: number[];
  scrollWidth: number;
  hasScrolled: boolean;
  totalVisibleElements: number;
  lastVisibleIndex: number;
}

export type setUploadedImgsConfig = Dispatch<
  SetStateAction<uploadedImgsConfig>
>;

export const defaultUploadedImgsConfig = (): uploadedImgsConfig => ({
  showNextArrow: false,
  showBackArrow: false,
  itemLeft: new Array(25).fill(0),
  scrollWidth: 0,
  hasScrolled: false,
  totalVisibleElements: 1,
  lastVisibleIndex: -1,
});

export type uploadImgActions = {
  type: "img intersection";
  details: {
    isIntersecting: boolean;
    bounds: DOMRect;
  };
};

export interface uploadImgProps {
  config: uploadedImgsConfig;
  imgDetails: uploadedImgDetails;
  index: number;
  setConfig: setProductImgsModalState;
  takeAction: (details: uploadImgActions) => void;
}

export interface deletedImgProps {
  imageDetails: uploadedImgDetails;
  config: uploadedImgsConfig;
  index: number;
  handleImageIntersection: (
    isIntersecting: boolean,
    bounds: DOMRect,
    index: number,
  ) => void;
}
