import { Dispatch, SetStateAction } from "react";
import { specificationDetailsWithHeader } from "./specifications";
import { seriesDescription } from "./description";

export interface createUpdateProductConfig {
  name: string;
  price: string;
  category: string;
  categoryId: number | null;
  categoryList: {
    id: number;
    label: string;
    photo: string;
  }[];
  item: string;
  itemId: number | null;
  itemList: {
    id: number;
    label: string;
    photo: string;
  }[];
  specificationType: "string" | "series";
  specifications: string | specificationDetailsWithHeader[];
  descriptionType: "string" | "series" | "series with images";
  description: string | seriesDescription[];
  filterList: {
    id: number;
    name: string;
    options: {
      id: number;
      name: string;
    }[];
  }[];
  selectedOptions: {
    [filterId: string]: number[];
  };
  updateSpecificationDetails: string | specificationDetailsWithHeader | null;
  updateDescriptionDetails: null | string | seriesDescription;
}

export type setCreateUpdateProductConfig = Dispatch<
  SetStateAction<createUpdateProductConfig>
>;

export const getDefaultCreateUpdateProductConfig =
  (): createUpdateProductConfig => ({
    name: "",
    price: "",
    category: "",
    categoryId: null,
    categoryList: [],
    item: "",
    itemId: null,
    itemList: [],
    specificationType: "string",
    specifications: "",
    descriptionType: "string",
    description: "",
    filterList: [],
    selectedOptions: {},
    updateSpecificationDetails: null,
    updateDescriptionDetails: null,
  });
