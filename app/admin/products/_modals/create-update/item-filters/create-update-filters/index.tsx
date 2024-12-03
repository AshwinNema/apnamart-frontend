import { AutoComplete, TextInput } from "@/app/_custom-components";
import { setNestedPath } from "@/app/_utils";
import { useCallback, useContext, useEffect, useState } from "react";
import {
  createUpdateFilterState,
  itemFilterTabletem,
  itemTableType,
  FilterContext,
  getCreateUpdateItemConfig,
  deletedItemDataViewerType,
  handleDeleteFilterItemOption,
  MainModalContext,
  restoreFilterItemOption,
  filterTypeOptions,
} from "../../../../helper";
import { Footer, CommonInputs } from "./parts";
import { ItemTable } from "../tables";
import { DeletedDataViewer } from "../deleted-data-viewer";
import { produce } from "immer";

// This is component for mananging create update of the item filter. It has the following props -
// name - This is the name of the filter that is being created / updated
// optionCreateUpdateName - When an option is being created/ updated we handle its name here
// options - It stores all the filter options of the current filter being created/ updated
// optionId - This is the id of the option that is being updated
// filterId - When filter is being updated we store its id here

const CreateUpdateFilter = () => {
  const [config, setConfig] = useState(getCreateUpdateItemConfig());
  const setData = useCallback(setNestedPath(setConfig), [setConfig]);
  const mainState = useContext(FilterContext);
  const centralState = useContext(MainModalContext);
  if (!mainState || !centralState) return null;
  const { mainConfig, setMainConfig } = mainState;
  const { config: centralConfig } = centralState;
  // In case we are updating filter, this useEffect picks the data and updates the state
  useEffect(() => {
    if (mainConfig.updateFilterDetails) {
      setConfig(mainConfig.updateFilterDetails);
      setNestedPath(setMainConfig)("updateFilterDetails")(null);
    }
  }, [mainConfig.updateFilterDetails, setMainConfig]);
  return (
    <div className="mt-5">
      <CommonInputs config={config} setData={setData} />

      <ItemTable
        tableType={itemTableType.options}
        onClick={(data: itemFilterTabletem) => {
          setConfig(
            produce((draft) => {
              draft.optionId = data.id as string;
              draft.optionCreateUpdateName = data.name;
            }),
          );
          setNestedPath(setMainConfig)("createUpdateFilterOption")(
            createUpdateFilterState.update,
          );
        }}
        onDelete={(closeModal, data) => {
          handleDeleteFilterItemOption(data, setConfig, closeModal);
        }}
        hideTable={!!mainConfig.createUpdateFilterOption}
        items={config.options}
        className="mt-3 mx-1 flex justify-center"
      />

      <DeletedDataViewer
        type={deletedItemDataViewerType.filterOption}
        list={config?.deletedOptions || []}
        restoreOption={(option) => {
          restoreFilterItemOption(option, setConfig);
        }}
        restoreList={config.options}
        optionMap={
          centralConfig?.originalFilterItems?.[`${config.filterId}`]?.options ||
          {}
        }
      />
      <Footer config={config} setConfig={setConfig} />
    </div>
  );
};

export default CreateUpdateFilter;
