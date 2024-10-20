import { produce } from "immer";
import { Dispatch, SetStateAction } from "react";
import {
  createUpdateSpecificationState,
  specificationKeyValState,
} from "../interfaces & enums & constants";
import { setKeyVal, validateZodSchema } from "@/app/_utils";
import { specificationKeyValValidation } from "../validations";

export const deleteSeriesSpecification = (
  setNewSpecificationConfig: Dispatch<SetStateAction<createUpdateSpecificationState>>,
  id: string,
) => {
  setNewSpecificationConfig(
    produce((draft) => {
      if (typeof draft.details === "string") return;
      draft.details.keyVals = draft.details.keyVals.filter(
        (item) => item.id !== id,
      );
    }),
  );
};

export const updateSeriesSpecification = (
  config: specificationKeyValState,
  setNewSpecificationConfig: Dispatch<SetStateAction<createUpdateSpecificationState>>,
  setData: setKeyVal,
) => {
  const { error, data } = validateZodSchema(
    config,
    specificationKeyValValidation,
    true,
  );
  if (error || !data) return;
  setNewSpecificationConfig(
    produce((draft) => {
      if (typeof draft.details === "string") return;
      const details = draft.details.keyVals.find(
        (item) => item.id === config.id,
      );
      if (!details) return;
      details.key = config.key;
      details.val = config.val;
    }),
  );
  setData("isReadOnly")(true);
};
