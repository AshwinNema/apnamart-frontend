import { useContext } from "react";
import { AutoComplete } from "@/app/_custom-components";
import { setNestedPath } from "@/app/_utils";
import { produce } from "immer";
import { getItemFilters } from "@/app/admin/products/helper";
import {
  getItemsList,
  MainCreateUpdateProductContext,
} from "../../../../helpers";
import { CategoryAutoComplete } from "./category-autocomplete";

export const Autocompletes = () => {
  const mainContext = useContext(MainCreateUpdateProductContext);
  if (!mainContext) return null;
  const { config, setConfig } = mainContext;
  return (
    <div className="flex justify-between gap-3 mb-10">
      <CategoryAutoComplete />
      <AutoComplete
        label="Sub Category"
        placeholder={`${!config.categoryId ? "Please select category before selecting sub category" : "Select Sub Category"} `}
        selectedKey={config.subCategoryId ? `${config.subCategoryId}` : null}
        list={config.subCategoryList}
        inputVal={config.subCategory}
        setInputVal={setNestedPath(mainContext.setConfig)("subCategory")}
        onSelectionChange={(key) => {
          if (!key) {
            setConfig(
              produce((draft) => {
                draft.item = "";
                draft.itemId = null;
                draft.itemList = [];
                draft.filterList = [];
                draft.selectedOptions = {};
                draft.subCategoryId = null;
              }),
            );
            return;
          }
          key = Number(key);
          if (key === config.subCategoryId) return;
          setConfig(
            produce((draft) => {
              draft.item = "";
              draft.itemId = null;
              draft.filterList = [];
              draft.selectedOptions = {};
              draft.subCategoryId = key;
            }),
          );
          getItemsList(
            { subCategoryId: key },
            setNestedPath(mainContext?.setConfig)("itemList"),
            true,
            { showLoader: false },
          );
        }}
        isClearable={true}
        fullWidth={true}
      />

      <AutoComplete
        label="Item"
        placeholder={`${!config.subCategoryId ? "Please select sub category before selecting item" : "Select item"} `}
        selectedKey={config.itemId ? `${config.itemId}` : null}
        list={config.itemList}
        inputVal={config.item}
        setInputVal={setNestedPath(mainContext?.setConfig)("item")}
        onSelectionChange={(key) => {
          if (!key) {
            setConfig(
              produce((draft) => {
                draft.itemId = null;
                draft.filterList = [];
                draft.selectedOptions = {};
              }),
            );
            return;
          }
          key = Number(key);
          setConfig(
            produce((draft) => {
              draft.itemId = key;
              draft.selectedOptions = {};
            }),
          );
          getItemFilters(
            key,
            undefined,
            setNestedPath(mainContext?.setConfig)("filterList"),
            true,
            { showLoader: false },
          );
        }}
        isClearable={true}
        fullWidth={true}
      />
    </div>
  );
};
