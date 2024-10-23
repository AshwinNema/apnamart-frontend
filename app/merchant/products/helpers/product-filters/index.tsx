import { produce } from "immer";
import {
  createUpdateProductConfig,
  setProductFilterModalState,
} from "../interfaces & enums & constants";

export const setInitialSelectedFilters = (
  setConfig: setProductFilterModalState,
  selectedOptions?: createUpdateProductConfig["selectedOptions"],
) => {
  if (!selectedOptions) return;
  setConfig(
    produce((draft) => {
      draft.details = produce(selectedOptions, () => {});
    }),
  );
};
