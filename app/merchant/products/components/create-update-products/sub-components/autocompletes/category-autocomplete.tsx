import { useContext } from "react";
import { AutoComplete } from "@/app/_custom-components";
import { appEndPoints, setNestedPath } from "@/app/_utils";
import { produce } from "immer";
import { MainCreateUpdateProductContext } from "../../../../helpers";
import { getItemEntityList } from "@/app/admin/products/helper";

export const CategoryAutoComplete = () => {
  const mainContext = useContext(MainCreateUpdateProductContext);
  if (!mainContext) return null;
  const { config, setConfig } = mainContext;

  return (
    <>
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
                draft.categoryId = null;
                draft.subCategoryList = [];
                draft.subCategory = "";
                draft.subCategoryId = null;
                draft.item = "";
                draft.itemId = null;
                draft.itemList = [];
                draft.filterList = [];
                draft.selectedOptions = {};
              }),
            );
            return;
          }
          key = Number(key);
          if (key === config.categoryId) return;
          setConfig(
            produce((draft) => {
              draft.categoryId = key;
              draft.subCategoryList = [];
              draft.subCategory = "";
              draft.subCategoryId = null;
              draft.item = "";
              draft.itemId = null;
              draft.itemList = [];
              draft.filterList = [];
              draft.selectedOptions = {};
            }),
          );
          getItemEntityList(
            setNestedPath(mainContext?.setConfig)("subCategoryList"),
            appEndPoints.SUB_CATEGORY_LIST,
            {
              categoryId: key,
            },
            {
              showLoader: false,
            },
          );
        }}
        isClearable={true}
        fullWidth={true}
      />
    </>
  );
};
