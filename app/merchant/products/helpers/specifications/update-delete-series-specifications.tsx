import { produce } from "immer";
import { Dispatch, SetStateAction } from "react";
import {
  createUpdateSpecificationState,
  specificationKeyValState,
} from "../interfaces & enums & constants";
import { setKeyVal, validateZodSchema } from "@/app/_utils";
import { keyValValidation } from "../validations";

export const deleteSeriesSpecification = (
  setCreateUpdateSpecificationState: Dispatch<
    SetStateAction<createUpdateSpecificationState>
  >,
  id: string,
) => {
  setCreateUpdateSpecificationState(
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
  setCreateUpdateSpecificationState: Dispatch<
    SetStateAction<createUpdateSpecificationState>
  >,
  setData: setKeyVal,
) => {
  const { error, data } = validateZodSchema(config, keyValValidation, true);
  if (error || !data) return;
  setCreateUpdateSpecificationState(
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
