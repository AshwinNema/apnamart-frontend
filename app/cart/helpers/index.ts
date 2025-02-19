import { createContext, Dispatch, SetStateAction } from "react";

export * from "./apis";
export * from "./cart-item";

export interface cartProduct {
  count: number;
  details: {
    id: number;
    name: string;
    price: number;
    photos: {
      url: string;
    }[];
    allowedUnitsPerOrder: number;
  };
}

export interface mainConfig {
  products: cartProduct[];
  isCartLoaded: boolean;
  innerWidth: number;
}

export type setMainConfig = Dispatch<SetStateAction<mainConfig>>;

export interface cartItemBtnConfig {
  count: string;
  isLoading: boolean;
}

export type setCartItemBtnConfig = Dispatch<SetStateAction<cartItemBtnConfig>>;

export const getDefaultMainConfig = (): mainConfig => ({
  products: [],
  isCartLoaded: false,
  innerWidth: window.innerWidth,
});

export const MainContext = createContext<null | {
  config: mainConfig;
  setConfig: setMainConfig;
}>(null);

export const getTotalPrice = (products: cartProduct[]) => {
  return products.reduce((total, product) => {
    return total + product.details.price * product.count;
  }, 0);
};
