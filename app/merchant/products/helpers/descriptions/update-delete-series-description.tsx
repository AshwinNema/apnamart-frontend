import { produce } from "immer";
import { Dispatch, SetStateAction } from "react";
import {
  createUpdateDescriptionState,
  descriptionKeyValState,
} from "../interfaces & enums & constants";
import { setKeyVal, validateZodSchema } from "@/app/_utils";
import { keyValValidation } from "../validations";

export const deleteSeriesDescription = (
  setCreateUpdateDescriptionState: Dispatch<
    SetStateAction<createUpdateDescriptionState>
  >,
  id: string,
) => {
  setCreateUpdateDescriptionState(
    produce((draft) => {
      if (
        typeof draft.details === "string" ||
        typeof draft.details.details === "string"
      )
        return;
      draft.details.details = draft.details.details.filter(
        (item) => item.id !== id,
      );
    }),
  );
};

export const updateSeriesDescription = (
  config: descriptionKeyValState,
  setCreateUpdateDescriptionState: Dispatch<
    SetStateAction<createUpdateDescriptionState>
  >,
  setData: setKeyVal,
) => {
  const { error, data } = validateZodSchema(config, keyValValidation, true);
  if (error || !data) return;
  setCreateUpdateDescriptionState(
    produce((draft) => {
      if (
        typeof draft.details === "string" ||
        typeof draft.details.details === "string"
      )
        return;
      const details = draft.details.details.find(
        (item) => item.id === config.id,
      );
      if (!details) return;
      details.key = config.key;
      details.val = config.val;
    }),
  );
  setData("isReadOnly")(true);
};
