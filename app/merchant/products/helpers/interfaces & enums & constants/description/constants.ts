import { createUpdateDescriptionState } from ".";
import { createUpdateProductConfig } from "../create-update-product-config";

export const defaultCreateUpdateDescriptionState =
  (): createUpdateDescriptionState => ({
    details: "",
    enableHeader: false,
    enablePhoto: false,
    addNewKeyVal: false,
    newKey: "",
    newVal: "",
    id: null,
    isUpdating: false,
    seriesDescriptionType: "pointers",
  });

export const descriptionOptions: {
  key: createUpdateProductConfig["descriptionType"];
  label: string;
}[] = [
  {
    key: "string",
    label: "Text",
  },
  {
    key: "series",
    label: "Pointers",
  },
  {
    key: "series with images",
    label: "Pointers with alternate images",
  },
];

export const seriesDescriptionTypeOptions: {
  key: createUpdateDescriptionState["seriesDescriptionType"];
  value: string;
}[] = [
  {
    key: "pointers",
    value: "Pointers",
  },
  {
    key: "text",
    value: "Text",
  },
];
