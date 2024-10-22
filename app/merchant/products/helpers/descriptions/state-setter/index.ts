import {
  createUpdateDescriptionState,
  createUpdateProductConfig,
  setCreateUpdateProductConfig,
} from "../../interfaces & enums & constants";
import { keyVals, multiplePathSetter } from "@/app/_utils";
import { v4 } from "uuid";
import { Dispatch, SetStateAction } from "react";
import { produce } from "immer";
import { setNestedPath } from "@/app/_utils";
export * from "./create-update-description";

export const resetCreateUpdateDescriptionState = (
  descriptionType: createUpdateProductConfig["descriptionType"],
  multiPathSetter: multiplePathSetter,
  isOpen?: boolean,
) => {
  if (isOpen) return;
  const updates: keyVals[] = [
    ["enableHeader", false],
    ["newKey", ""],
    ["newVal", ""],
    ["isUpdating", false],
    ["enablePhoto", false],
  ];

  switch (descriptionType) {
    case "string":
      updates.push(["details", ""]);
      break;
    case "series":
      updates.push([
        "details",
        {
          details: [],
          id: v4(),
          header: "",
        },
      ]);
      break;
    case "series with images":
      updates.push(
        [
          "details",
          {
            details: [],
            id: v4(),
            header: "",
          },
        ],
        ["enablePhoto", true],
      );
      break;
    default:
      break;
  }

  multiPathSetter(updates);
};

export const setInitialDescriptionState = (
  mainConfig: createUpdateProductConfig,
  setConfig: Dispatch<SetStateAction<createUpdateDescriptionState>>,
  setMainConfig: setCreateUpdateProductConfig,
) => {
  const { updateDescriptionDetails } = mainConfig;
  if (!updateDescriptionDetails) return;
  setNestedPath(setMainConfig)("updateDescriptionDetails")(null);
  setConfig(
    produce((draft) => {
      draft.details = updateDescriptionDetails;
      draft.isUpdating = true;
      if (
        typeof updateDescriptionDetails !== "string" &&
        updateDescriptionDetails.header
      ) {
        draft.enableHeader = true;
      }

      draft.seriesDescriptionType =
        typeof updateDescriptionDetails === "string"
          ? "text"
          : Array.isArray(updateDescriptionDetails.details)
            ? "pointers"
            : "text";

      if (
        typeof updateDescriptionDetails !== "string" &&
        updateDescriptionDetails.photo
      ) {
        draft.enablePhoto = true;
      }
    }),
  );
};
