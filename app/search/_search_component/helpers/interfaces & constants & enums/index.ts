import { itemFilterType } from "@/app/admin/products/helper";
import { queriedProduct } from "@/app/merchant/products/helpers";
import { Dispatch, SetStateAction } from "react";

interface filterOption {
  id: number;
  name: string;
}

export interface itemFilter {
  id: number;
  name: string;
  filterType: itemFilterType;
  options: filterOption[];
}

export interface priceFilter extends itemFilter {
  filterType: itemFilterType.price;
}

export interface mainConfig {
  page: number;
  totalResults: number;
  limit: number;
  totalPages: number;
  mainHeader: string;
  results: queriedProduct[];
  itemFilters: itemFilter[];
  priceFilter: priceFilter | null;
  minPriceId: string | number;
  maxPriceId: string | number;
  selectedOptions: {
    [key: string]: filterOption;
  };
  isDataLoaded: boolean;
  innerWidth: number;
}

export type setMainConfig = Dispatch<SetStateAction<mainConfig>>;

export const getDefaultMainConfig = (): mainConfig => ({
  page: 1,
  totalResults: 0,
  limit: 5,
  totalPages: 0,
  mainHeader: "",
  results: [],
  itemFilters: [],
  priceFilter: null,
  minPriceId: "min",
  maxPriceId: "max",
  selectedOptions: {},
  isDataLoaded: false,
  innerWidth: window.innerWidth,
});

export type selectList = { label: string; key: number | string }[];

export interface priceFilterConfig {
  minPriceList: selectList;
  maxPriceList: selectList;
  minMaxVal: [number, number];
}

export type setPriceFilterConfig = Dispatch<SetStateAction<priceFilterConfig>>;

export const getDefaultPriceFilterConfig = (): priceFilterConfig => ({
  minPriceList: [],
  maxPriceList: [],
  minMaxVal: [0, 100],
});

export type queryProductsData = (
  query: {
    page: number;
    limit: number;
    itemId?: number;
    subCategoryId?: number;
    minPrice?: number;
    maxPrice?: number;
    filterOptions?: string;
  },
  setConfig: setMainConfig,
) => void;
