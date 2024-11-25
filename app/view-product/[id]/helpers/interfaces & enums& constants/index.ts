import { queriedProduct } from "@/app/merchant/products/helpers";
import React, { Dispatch, SetStateAction } from "react";
import { Subject } from "rxjs";
import { notifier } from "./notifications";
export interface mainConfig {
  details: null | queriedProduct;
  smallerImgWidth: number;
  smallerImgHeight: number;
}

export const getDefaultMainConfig = (): mainConfig => ({
  details: null,
  smallerImgWidth: 1,
  smallerImgHeight: 1,
});

export * from "./notifications";
export type setMainConfig = Dispatch<SetStateAction<mainConfig>>;

export type mainContext = {
  config: mainConfig;
  setConfig: setMainConfig;
  notifier: Subject<notifier>;
};

export interface productImagesConfig {
  curImgIndex: number;
  itemListStyle: React.CSSProperties;
  imgContainerLeft: number;
  imgContainerTop: number;
}

export type setProductImagesConfig = Dispatch<
  SetStateAction<productImagesConfig>
>;

export type productImgContext = {
  config: productImagesConfig;
  setConfig: setProductImagesConfig;
};

export interface productThumbConfig {
  hasMore: boolean;
  downScrolls: number;
  styles: React.CSSProperties;
}

export type setProductThumbConfig = Dispatch<
  SetStateAction<productThumbConfig>
>;

export interface productImgConfig {
  imgLeftOffSet: number;
  imgTopOffSet: number;
}

export interface magnifiedImgConfig {
  hovered: boolean;
  containerLensXRatio: number;
  containerLensYRatio: number;
  imgWidth: number;
  imgHeight: number;
  containerStyles: React.CSSProperties;
  lensOffsetWidth: number;
  lensOffsetHeight: number;
}

export type setMagnifiedImgConfig = Dispatch<
  SetStateAction<magnifiedImgConfig>
>;

export const getDefaultMagnifiedImgConfig = (): magnifiedImgConfig => ({
  hovered: false,
  containerLensXRatio: 0,
  containerLensYRatio: 0,
  imgWidth: 0,
  imgHeight: 0,
  containerStyles: {},
  lensOffsetWidth: 0,
  lensOffsetHeight: 0,
});
