import { Dispatch, SetStateAction } from "react";
import {
  createUpdateFilterState,
  createUpdateItemState,
  ItemFilterConfig,
} from "../../interfaces & enums";
import { errorToast, successToast, toastErrorIcons } from "@/app/_utils/toast";
import { v4 as uuidv4 } from "uuid";
import { setNestedPath } from "@/app/_utils";
import { produce } from "immer";
export const mainOptionHandler = (
  createUpdateFilterOption: ItemFilterConfig["createUpdateFilterOption"],
  config: createUpdateItemState,
  setConfig: Dispatch<SetStateAction<createUpdateItemState>>,
  setMainConfig: Dispatch<SetStateAction<ItemFilterConfig>>,
) => {
  const value = config.optionCreateUpdateName.trim();
  const id = uuidv4();

  if (!value) {
    errorToast({
      msg: "Please enter option value",
      iconType: toastErrorIcons.validation,
    });
    return;
  }

  switch (createUpdateFilterOption) {
    case createUpdateFilterState.create: {
      setConfig(produce((draft) => {
        const length = draft.options.length;
        if (length && draft.options[length - 1].id === id) {
          return 
        }
        draft.options.push({
          name: value,
          id,
        });
        draft.optionCreateUpdateName = "";
      }))
      successToast({ msg: "Option added to the filter" });
      break;
    }
    case createUpdateFilterState.update:
      setConfig(produce((draft) => {
        const index = draft.options.findIndex(
          (item) => item.id === config.optionId,
        );
        if (index != -1) {
          draft.options[index].name = value;
        }
      }))

      successToast({ msg: "Option updated" });
      break;
    default:
      break;
  }

  setNestedPath(setMainConfig)("createUpdateFilterOption")(null);
};
