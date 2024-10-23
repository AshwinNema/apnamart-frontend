import {
  createUpdateProductConfig,
  createUpdateSpecificationProps,
  createUpdateSpecificationState,
} from "../../interfaces & enums & constants";
import { keyVals, multiplePathSetter } from "@/app/_utils";
import { v4 } from "uuid";
import { Dispatch, SetStateAction } from "react";
import { produce } from "immer";
import { setNestedPath } from "@/app/_utils";
export * from "./create-update-specification";

export const resetCreateUpdateSpecificationState = (
  specificationType: createUpdateProductConfig["specificationType"],
  multiPathSetter: multiplePathSetter,
  isOpen?: boolean,
) => {
  if (isOpen) return;
  const updates: keyVals[] = [
    ["enableHeader", false],
    ["newKey", ""],
    ["newVal", ""],
    ["isUpdating", false],
  ];
  specificationType === "string" && updates.push(["details", ""]);
  specificationType === "series" &&
    updates.push([
      "details",
      {
        keyVals: [],
        id: v4(),
        header: "",
      },
    ]);
  multiPathSetter(updates);
};

export const setInitialSpecificationState = (
  mainConfig: createUpdateSpecificationProps["mainConfig"],
  setConfig: Dispatch<SetStateAction<createUpdateSpecificationState>>,
  setMainConfig: createUpdateSpecificationProps["setMainConfig"],
) => {
  const { updateSpecificationDetails } = mainConfig;
  if (!updateSpecificationDetails) return;
  setNestedPath(setMainConfig)("updateSpecificationDetails")(null);
  setConfig(
    produce((draft) => {
      draft.details = updateSpecificationDetails;
      draft.isUpdating = true;
      if (
        typeof updateSpecificationDetails !== "string" &&
        updateSpecificationDetails.header
      ) {
        draft.enableHeader = true;
      }
    }),
  );
};
