import { Dispatch, SetStateAction } from "react";
import {
  createUpdateFilterState,
  FilterItem,
  ItemFilterConfig,
  MainModalState,
  ModalDeletedFilterItem,
  ModalFilterItem,
} from "../interfaces & enums";
import { successToast } from "@/app/_utils/toast";
import { produce } from "immer";
import { filterTypeOptions } from ".";
export const mainTableClick = (
  data: ModalFilterItem,
  setConfig: Dispatch<SetStateAction<ItemFilterConfig>>,
) => {
  const { id, name, options, deletedOptions, filterType } = data;

  setConfig(
    produce((draft) => {
      draft.createUpdateFilter = createUpdateFilterState.update;
      draft.updateFilterDetails = {
        name,
        optionCreateUpdateName: "",
        filterType,
        filterTypeVal:
          filterTypeOptions.find((option) => option.id === filterType)?.label ||
          "",
        options: options.map((item) => {
          return {
            id: item.id as string,
            name: item.name,
          };
        }),
        optionId: null,
        filterId: id,
        deletedOptions: deletedOptions || [],
      };
    }),
  );
};

export const deleteMainTableItem = (
  closeModal: () => void,
  data: FilterItem,
  setAllData: Dispatch<SetStateAction<MainModalState>>,
) => {
  setAllData(
    produce((draft) => {
      draft.filterItems = draft.filterItems.filter((item) => {
        const itemId = item.id;
        const dataId = data.id;
        const isDatabaseId = typeof dataId === "number";
        const deleteLength = draft.deletedOriginalItems.length;
        const isAdded = deleteLength
          ? draft.deletedOriginalItems[deleteLength - 1].id === dataId
          : false;
        if (isDatabaseId && itemId === dataId && !isAdded) {
          draft.deletedOriginalItems.push(item as ModalDeletedFilterItem);
        }
        return item.id !== data.id;
      });
    }),
  );
  successToast({ msg: "Filter removed" });
  closeModal();
};
