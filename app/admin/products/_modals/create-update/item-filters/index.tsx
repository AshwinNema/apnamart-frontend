import { ModalBody, ScrollShadow } from "@heroui/react";
import { useContext, useEffect, useState } from "react";
import {
  bodyState,
  ItemFilterConfig,
  itemTableType,
  MainModalContext,
  FilterContext,
  getDefaultItemFilterConfig,
  mainTableClick,
  deleteMainTableItem,
  deletedItemDataViewerType,
  restoreFilterItem,
} from "../../../helper";
import CreateUpdateFilter from "./create-update-filters";
import { ItemTable } from "./tables";
import * as _ from "lodash";
import { Header } from "./sub-components";
import { useProductSelector } from "@/lib/product/hooks";
import { DeletedDataViewer } from "./deleted-data-viewer";
import { produce } from "immer";
// This is the central component for viewing filters, when user clicks for view filters this component is rendered
// It shows all the filters present in the system
// It has the following props :
// createUpdateFilter: tracks whether we are creating or updating a filter
// createUpdateFilterOption: tracks whether we are creating or updating a filter option
// limit: limit of the table,
// page: page of the table,
// updateFilterDetails: when we are trying to update a filter we need details to store details of the filter to be passed for updating to the  CreateUpdateFilter component ()

// Components -
// Header - Header of this component. It contains heading and create button for creating filter / filter option
// CreateUpdateFilter - Component when we are trying to create and update and update a filter
// ItemTable - Table displaying all the filters
// DeletedDataViewer - For viewing all the filters that are present in the database and were deleted by the user

const ItemFilters = () => {
  const mainState = useContext(MainModalContext);
  const [config, setConfig] = useState<ItemFilterConfig>(
    getDefaultItemFilterConfig(),
  );
  const isOpen = useProductSelector((state) => state.componentDetails.isOpen);
  useEffect(() => {
    setConfig(
      produce((draft) => {
        draft.createUpdateFilter = null;
      }),
    );
  }, [mainState?.config?.bodyState]);
  useEffect(() => {
    !isOpen && setConfig(getDefaultItemFilterConfig());
  }, [isOpen]);

  if (!mainState || mainState.config.bodyState !== bodyState.itemFilters)
    return null;
  const { config: mainConfig, setAllData } = mainState;

  return (
    <div>
      <ModalBody className="relative">
        <ScrollShadow
          style={{
            height: `${mainConfig.height - 30}px`,
          }}
          className="w-full relative"
        >
          <FilterContext.Provider
            value={{
              mainConfig: config,
              setMainConfig: setConfig,
            }}
          >
            <Header />
            {config.createUpdateFilter && <CreateUpdateFilter />}
            <ItemTable
              tableType={itemTableType.main}
              onClick={(data) => {
                mainTableClick(data, setConfig);
              }}
              hideTable={!!config.createUpdateFilter}
              items={mainState.config.filterItems}
              onDelete={(closeModal, data) => {
                deleteMainTableItem(closeModal, data, setAllData);
              }}
              className="mt-3 mx-1 flex justify-center"
            />
          </FilterContext.Provider>
          {!config.createUpdateFilter && (
            <DeletedDataViewer
              type={deletedItemDataViewerType.filter}
              list={mainState.config.deletedOriginalItems || []}
              restoreList={mainState.config.filterItems}
              restoreOption={(data) => {
                restoreFilterItem(data, setAllData);
              }}
              optionMap={mainConfig.originalFilterItems}
            />
          )}
        </ScrollShadow>
      </ModalBody>
    </div>
  );
};

export default ItemFilters;
