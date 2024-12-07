import { Dispatch, SetStateAction } from "react";
import { specificationDetailsWithHeader } from "./specifications";
import { seriesDescription } from "./description";
import { uploadedImgDetails } from "./landing-screen";
import { autoCompleteListItem } from "@/app/_custom-components/inputs/interface";

export interface productFilter {
  id: number;
  name: string;
  options: {
    id: number;
    name: string;
  }[];
}

interface productEntityList extends autoCompleteListItem {
  id: number;
}

export interface createUpdateProductConfig {
  id?: number;
  name: string;
  price: string;
  allowedUnitsPerOrder: string;
  category: string;
  categoryId: number | null;
  categoryList: productEntityList[];
  subCategoryList: productEntityList[];
  item: string;
  subCategoryId: number | null;
  subCategory: string;
  itemId: number | null;
  itemList: productEntityList[];
  specificationType: "string" | "series";
  specifications: string | specificationDetailsWithHeader[];
  descriptionType: "string" | "series" | "series with images";
  description: string | seriesDescription[];
  filterList: productFilter[];
  selectedOptions: {
    [filterId: string]: number;
  };
  updateSpecificationDetails: string | specificationDetailsWithHeader | null;
  updateDescriptionDetails: null | string | seriesDescription;
  productImages: File[];
  uploadedImgs: uploadedImgDetails[];
  deletedImgs: uploadedImgDetails[];
  highlights: string[];
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
    allowedUnitsPerOrder: "1",
    item: "",
    itemId: null,
    itemList: [],
    specificationType: "string",
    subCategoryId: null,
    subCategory: "",
    specifications: "",
    descriptionType: "string",
    description: "",
    filterList: [],
    selectedOptions: {},
    updateSpecificationDetails: null,
    updateDescriptionDetails: null,
    productImages: [],
    uploadedImgs: [],
    deletedImgs: [],
    subCategoryList: [],
    highlights: [],
  });
