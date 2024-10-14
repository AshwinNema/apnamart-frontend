import { AutoComplete } from "@/app/_custom-components";
import { useProductSelector } from "@/lib/product/hooks";
import { tabKeys } from "@/lib/product/slices/component-details.slice";
import { useCallback, useContext } from "react";
import { MainModalContext } from "../../../helper";
import { setMultiplePaths, setNestedPath } from "@/app/_utils";

export const MainBodyAutoCompletes = () => {
  const { tab } = useProductSelector((state) => state.componentDetails);
  const mainData = useContext(MainModalContext);
  if (!mainData) return null;
  const { config: mainConfig, setAllData } = mainData;
  const { categoryId, subCategoryId } = mainConfig;
  const setData = useCallback(setNestedPath(setAllData), [setAllData]);
  return (
    <>
      {tab !== tabKeys.category && (
        <AutoComplete
          label="Category"
          selectedKey={categoryId ? `${categoryId}` : null}
          list={mainConfig.categoryList}
          inputVal={mainConfig.categoryVal}
          setInputVal={setData("categoryVal")}
          onSelectionChange={(key) => {
            setMultiplePaths(setAllData)([
              ["categoryId", key ? Number(key) : null],
              ["subCategoryId", null],
              ["subCategoryVal", ""],
            ]);
          }}
          isClearable={false}
          fullWidth={true}
        />
      )}

      {tab === tabKeys.items && (
        <AutoComplete
          label="Sub Category"
          selectedKey={subCategoryId ? `${subCategoryId}` : null}
          list={mainConfig.subCategoryList}
          inputVal={mainConfig.subCategoryVal}
          setInputVal={setData("subCategoryVal")}
          onSelectionChange={(key) => {
            setMultiplePaths(setAllData)([
              ["subCategoryId", key ? Number(key) : null],
            ]);
          }}
          isClearable={false}
          fullWidth={true}
        />
      )}
    </>
  );
};
