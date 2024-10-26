import {
  createUpdateDescriptionState,
  createUpdateProductConfig,
} from "../../interfaces & enums & constants";
import { keyVals, multiplePathSetter } from "@/app/_utils";
import { v4 } from "uuid";

export * from "./initial-state-setter";
export * from "./create-update-description";

export const resetCreateUpdateDescriptionState = (
  descriptionType: createUpdateProductConfig["descriptionType"],
  seriesDescriptionType: createUpdateDescriptionState["seriesDescriptionType"],
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
          details: seriesDescriptionType === "text" ? "" : [],
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
            details: seriesDescriptionType === "text" ? "" : [],
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
