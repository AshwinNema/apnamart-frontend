import { errorToast, validateZodSchema } from "@/app/_utils";
import {
  getDefaultProductHighlightModalState,
  MainCreateUpdateProductContextType,
  productHighlightModalState,
  requiredStringValidation,
  setCreateUpdateProductConfig,
  setProductHighlightModalState,
} from ".";
import { produce } from "immer";
import { v4 } from "uuid";

export const resetProductHighlightModal = (
  mainContext: MainCreateUpdateProductContextType,
  isOpen: boolean,
  setConfig: setProductHighlightModalState,
) => {
  if (!mainContext || isOpen) return;
  setConfig({
    ...getDefaultProductHighlightModalState(),
    data: mainContext.config.highlights.map((item) => {
      return {
        id: v4(),
        data: item,
      };
    }),
  });
};

export const addNewHighlightPointer = (
  newHightlightPoint: string,
  setConfig: setProductHighlightModalState,
) => {
  const { error, data: newHighlightPoint } = validateZodSchema(
    newHightlightPoint,
    requiredStringValidation("New Highlight Point"),
    true,
  );
  if (error || !newHighlightPoint) return;
  setConfig(
    produce((draft) => {
      draft.data.push({
        id: v4(),
        data: newHighlightPoint,
      });
      draft.newHightlightPoint = "";
      draft.showAddNewBtn = true;
    }),
  );
};
