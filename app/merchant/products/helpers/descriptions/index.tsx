import { Dispatch, SetStateAction } from "react";
import {
  createUpdateDescriptionState,
  createUpdateProductConfig,
  seriesDescription,
} from "../interfaces & enums & constants";
import { produce } from "immer";
export * from "./state-setter";
export * from "./update-delete-series-description";

export const getDescriptionModalHeader = (
  mainConfig: createUpdateProductConfig,
  config: createUpdateDescriptionState,
) => {
  const isArrDescription = Array.isArray(mainConfig.description);
  if (config.isUpdating)
    return isArrDescription
      ? "Update Description Pointer"
      : "Update Description";

  return isArrDescription ? "Create Description Pointer" : "Create Description";
};

export const openUpdateDescriptionModalWithDetails = (
  details: string | seriesDescription,
  setConfig: Dispatch<SetStateAction<createUpdateProductConfig>>,
  openCreateUpdateModal: () => void,
) => {
  setConfig(
    produce((draft) => {
      draft.updateDescriptionDetails = details;
    }),
  );
  openCreateUpdateModal();
};
