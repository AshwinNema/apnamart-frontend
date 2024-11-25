import {
  mainContext,
  productImgContext,
  productThumbConfig,
  setProductThumbConfig,
} from "./interfaces & enums& constants";
import { createContext } from "react";

export * from "./apis";
export * from "./product-img";
export * from "./interfaces & enums& constants";
export * from "./img-lens";

export const MainContext = createContext<null | mainContext>(null);

export const ProductImgContext = createContext<null | productImgContext>(null);

export const cssTranslate = (
  position: number,
  metric: "px" | "%",
  type: "x-axis" | "y-axis" = "x-axis",
) => {
  const positionPercent = position === 0 ? position : position + metric;
  const positionCss =
    type === "x-axis" ? [positionPercent, 0, 0] : [0, positionPercent, 0];
  const transitionProp = "translate3d";

  const translatedPosition = "(" + positionCss.join(",") + ")";

  return transitionProp + translatedPosition;
};

export const ProductThumbContext = createContext<null | {
  config: productThumbConfig;
  setConfig: setProductThumbConfig;
}>(null);
