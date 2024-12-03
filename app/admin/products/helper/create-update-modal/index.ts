import {
  tableDataDataElement,
  MainModalState,
  itemFilterType,
} from "../interfaces & enums";
import { MutableRefObject, Dispatch, SetStateAction } from "react";
import * as _ from "lodash";
import { produce } from "immer";

export * from "./default-states";
export * from "./handlers";
export * from "./item-filters";
export * from "./default-texts";

export const setMainState = (
  modalDetails: tableDataDataElement,
  setConfig: Dispatch<SetStateAction<MainModalState>>,
  mainContainerRef: MutableRefObject<HTMLDivElement | null>,
) => {
  const allDetails: Partial<MainModalState> = {};
  if (mainContainerRef.current) {
    allDetails.height = mainContainerRef.current.getBoundingClientRect().height;
  }
  if (modalDetails) {
    const details = _.pick(modalDetails, [
      "name",
      "id",
      "category",
      "subCategory",
    ]) as {
      name: string;
      category?: {
        id: number;
        name: string;
      };
      subCategory?: {
        id: number;
        name: string;
      };
    };

    Object.assign(allDetails, {
      ...details,
      categoryId: details?.category?.id || null,
      categoryVal: details?.category?.name || "",
      subCategoryId: details?.subCategory?.id || null,
      subCategoryVal: details?.subCategory?.name || "",
    });
  }
  setConfig(
    produce((draft) => {
      Object.assign(draft, allDetails);
    }),
  );
};

export const filterTypeOptions: {
  id: itemFilterType;
  label: string;
}[] = [
  {
    id: itemFilterType.normal,
    label: "Normal",
  },
  {
    id: itemFilterType.price,
    label: "Price",
  },
  {
    id: itemFilterType.userMenu,
    label: "User Menu",
  },
];
