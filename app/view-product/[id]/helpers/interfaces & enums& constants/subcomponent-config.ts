import React, { Dispatch, SetStateAction } from "react";

export interface productImagesConfig {
  curImgIndex: number;
  itemListStyle: React.CSSProperties;
  imgContainerLeft: number;
  imgContainerTop: number;
  productIsLiked: boolean;
}

export const getProductImagesDefaultConfig = (): productImagesConfig => ({
  curImgIndex: 0,
  itemListStyle: {},
  imgContainerLeft: 0,
  imgContainerTop: 0,
  productIsLiked: false,
});

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
  isClicked: boolean;
}

export type setProductImgConfig = Dispatch<SetStateAction<productImgConfig>>;

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
