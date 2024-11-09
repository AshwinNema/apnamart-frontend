import { queriedProduct } from "@/app/merchant/products/helpers";
import { Dispatch, SetStateAction } from "react";

export interface mainConfig {
  page: number;
  totalResults: number;
  limit: number;
  totalPages: number;
  mainHeader: string;
  results: queriedProduct[];
}

export type setMainConfig = Dispatch<SetStateAction<mainConfig>>;

export const getDefaultMainConfig = (): mainConfig => ({
  page: 1,
  totalResults: 0,
  limit: 5,
  totalPages: 0,
  mainHeader: "",
  results: [],
});
