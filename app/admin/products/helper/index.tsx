export * from "./interfaces & enums";
export * from "./apis";
export * from "./table";
export * from "./create-update-modal";
import {
  ItemFilterConfig,
  MainModalState,
  tabOption,
} from "./interfaces & enums";
import TabComponent from "../_tab-content";
import { tabKeys } from "@/lib/product/slices/component-details.slice";
import { createContext, Dispatch, SetStateAction } from "react";
import { setKeyVal } from "@/app/_utils";

export const tabList: tabOption[] = [
  {
    title: "Category",
    Content: () => {
      return (
        <>
          <TabComponent />
        </>
      );
    },
    key: tabKeys.category,
  },
  {
    title: "Sub Category",
    Content: () => {
      return (
        <>
          <TabComponent />
        </>
      );
    },
    key: tabKeys.subCategory,
  },
  {
    title: "Items",
    Content: () => <TabComponent />,
    key: tabKeys.items,
  },
];

export const MainModalContext = createContext<null | {
  config: MainModalState;
  setMainData: setKeyVal;
  setAllData: Dispatch<SetStateAction<MainModalState>>;
}>(null);

// When  user clicks on Show Item Filter/ icon or the right side of the top menu, user can see all the filters for that item. This component covers that state
export const FilterContext = createContext<{
  mainConfig: ItemFilterConfig;
  setMainConfig: Dispatch<SetStateAction<ItemFilterConfig>>;
} | null>(null);
