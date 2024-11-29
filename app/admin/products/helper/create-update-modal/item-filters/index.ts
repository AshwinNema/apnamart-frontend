import { successToast } from "@/app/_utils";
import {
  createUpdateItemState,
  DatabaseFilterItemOption,
  itemFilterTabletem,
  MainModalState,
} from "../../interfaces & enums";
import { Dispatch, SetStateAction } from "react";
import { produce } from "immer";
export * from "./main-filter-handler";
export * from "./main-option-handler";

export const handleDeleteFilterItemOption = (
  data: itemFilterTabletem,
  setConfig: Dispatch<SetStateAction<createUpdateItemState>>,
  closeModal: () => void,
) => {
  const dataId = data.id;
  setConfig(
    produce((draft) => {
      draft.options = draft.options.filter((item) => {
        draft.deletedOptions = draft.deletedOptions || [];
        typeof dataId === "number" &&
          item.id === dataId &&
          draft.deletedOptions.push(item as DatabaseFilterItemOption);
        return item.id !== dataId;
      });
    }),
  );
  closeModal();
  successToast({ msg: "Option deleted successfully" });
};

export const restoreFilterItemOption = (
  option: createUpdateItemState["deletedOptions"][number],
  setConfig: Dispatch<SetStateAction<createUpdateItemState>>,
) => {
  const optionId = option.id;
  setConfig &&
    setConfig(
      produce((draft) => {
        const { deletedOptions, options } = draft;
        const optionLength = options.length;
        const lastOptionId = options?.[optionLength - 1]?.id;
        if (lastOptionId !== optionId) {
          options.push(option);
        }
        draft.deletedOptions = deletedOptions.filter(
          (item) => item.id !== option.id,
        );
      }),
    );
};

export const restoreFilterItem = (
  option: MainModalState["deletedOriginalItems"][number],
  setMainConfig: Dispatch<SetStateAction<MainModalState>>,
) => {
  const optionId = option.id;
  setMainConfig(
    produce((draft) => {
      const { filterItems } = draft;
      const itemLength = filterItems.length;
      if (!itemLength || filterItems[itemLength - 1].id !== optionId) {
        filterItems.push(option);
      }
      draft.deletedOriginalItems = draft.deletedOriginalItems.filter(
        (item) => item.id !== optionId,
      );
    }),
  );
};
