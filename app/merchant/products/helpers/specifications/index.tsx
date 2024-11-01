import { Dispatch, SetStateAction } from "react";
import {
  createUpdateProductConfig,
  createUpdateSpecificationProps,
  createUpdateSpecificationState,
  specificationDetailsWithHeader,
} from "../interfaces & enums & constants";
import { produce } from "immer";
export * from "./state-setter";
export * from "./update-delete-series-specifications";

export const getSpecificationModalHeader = (
  mainConfig: createUpdateSpecificationProps["mainConfig"],
  config: createUpdateSpecificationState,
) => {
  const isArrSpecification = Array.isArray(mainConfig.specifications);
  if (config.isUpdating)
    return isArrSpecification
      ? "Update Specification Pointer"
      : "Update Specification";

  return isArrSpecification
    ? "Create Specification Pointer"
    : "Create Specification";
};

export const openUpdateSpecificationModalWithDetails = (
  details: string | specificationDetailsWithHeader,
  setConfig: Dispatch<SetStateAction<createUpdateProductConfig>>,
  openCreateUpdateModal: () => void,
) => {
  setConfig(
    produce((draft) => {
      draft.updateSpecificationDetails = details;
    }),
  );
  openCreateUpdateModal();
};
