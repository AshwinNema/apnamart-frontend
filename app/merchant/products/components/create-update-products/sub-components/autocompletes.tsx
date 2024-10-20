import { useContext } from "react";
import { AutoComplete } from "@/app/_custom-components";
import { setNestedPath } from "@/app/_utils";
import { produce } from "immer";
import { getItemFilters } from "@/app/admin/products/helper";
import { getItemsList, MainCreateUpdateProductContext } from "../../../helpers";

export const Autocompletes = () => {
  const mainContext = useContext(MainCreateUpdateProductContext);
  if (!mainContext) return null;
  const { config, setConfig } = mainContext;
  return (
    <div className="flex flex-col gap-3 mb-3">
      <AutoComplete
        label="Category"
        placeholder="Select category"
        selectedKey={config.categoryId ? `${config.categoryId}` : null}
        list={config.categoryList}
        inputVal={config.category}
        setInputVal={setNestedPath(mainContext.setConfig)("category")}
        onSelectionChange={(key) => {
          if (!key) {
            setConfig(
              produce((draft) => {
                draft.item = "";
                draft.itemId = null;
                draft.itemList = [];
                draft.filterList = [];
                draft.selectedOptions = {};
                draft.categoryId = null;
              }),
            );
            return;
          }
          key = Number(key);
          if (key === config.categoryId) return;
          setConfig(
            produce((draft) => {
              draft.item = "";
              draft.itemId = null;
              draft.filterList = [];
              draft.selectedOptions = {};
              draft.categoryId = key;
            }),
          );
          getItemsList(
            { categoryId: key },
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
        placeholder={`${!config.categoryId ? "Please select category before selecting item" : "Select item"} `}
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
