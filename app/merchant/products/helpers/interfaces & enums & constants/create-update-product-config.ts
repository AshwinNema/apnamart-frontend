export interface specificationKeyVal { key: string; val: string; id: string }

export type specificationDetailsWithHeader = {
  header?: string;
  keyVals: specificationKeyVal[];
  id: string;
};

export type descriptionDetailsWithHeader = {
  withHeader?: boolean;
  header?: string;
  details: string;
};

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
  descriptionType: "string" | "series";
  description: string | descriptionDetailsWithHeader[];
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
  updateDetails: string | specificationDetailsWithHeader | null;
}

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
    description: [],
    filterList: [],
    selectedOptions: {},
    updateDetails: null,
  });
