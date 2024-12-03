import { itemTableDataElement } from "@/lib/product/slices/table.slice";
import { FileUploadWithPreview } from "file-upload-with-preview";
import { autoCompleteState } from "@/app/_custom-components/inputs/interface";
import { defaultModalBodyConfig } from "../create-update-modal";
import {
  CreateFilterItem,
  DatabaseFilterItemOption,
  itemFilterTabletem,
  ModalDeletedFilterItem,
  ModalFilterItem,
  originalFilterItem,
  updateFilter,
} from "./interface-parts";
import { tabKeys } from "@/lib/product/slices/component-details.slice";
import { bodyState, createUpdateFilterState, itemFilterType } from "./enums";
export * from "./interface-parts";
export * from "./enums";
// for documentation please refer  app/admin/products/_modals/create-update/index.tsx
export interface MainModalState {
  id?: number;
  name: string;
  upload: FileUploadWithPreview | null;
  categoryId: null | number;
  subCategoryId: number | null;
  height: number;
  bodyState: bodyState;
  originalFilterItems: {
    [key: string]: originalFilterItem;
  };
  filterItems: ModalFilterItem[];
  deletedOriginalItems: ModalDeletedFilterItem[];
  categoryList: autoCompleteState["itemList"];
  subCatList: autoCompleteState["itemList"];
  categoryVal: string;
  subCategoryVal: string;
}

// Api params while query entity data
export interface getDataQuery {
  limit: number;
  page: number;
  id?: number;
}
// Used with the main entity table for the data shown for  a tab
export interface tableDataDataElement extends itemTableDataElement {}

// For documentation please refer - app/admin/products/_modals/create-update/item-filters/index.tsx
export interface ItemFilterConfig {
  createUpdateFilter: null | createUpdateFilterState;
  createUpdateFilterOption: null | createUpdateFilterState;
  page: number;
  limit: number;
  updateFilterDetails: createUpdateItemState | null;
}

export type modalBodyconfig = ReturnType<typeof defaultModalBodyConfig>;
// for documentation please refer app/admin/products/_modals/create-update/item-filters/create-update-filters/index.tsx
export interface createUpdateItemState {
  name: string;
  optionCreateUpdateName: string;
  options: itemFilterTabletem[];
  optionId?: string | number | bigint | null;
  filterId?: string | number | bigint | null;
  deletedOptions: DatabaseFilterItemOption[];
  filterType: itemFilterType;
  filterTypeVal: string;
}
// Main params that are passed for the create update function that is used for performing entity crud
export interface createUpdateParams {
  successCallback: () => void;
  config: MainModalState;
  tab: tabKeys;
}
// parameters for the function for getting payload for creating/ updating an entity
export interface modalCreateUpdatePayloadParams {
  tab: tabKeys;
  config: MainModalState;
}
// This is the entity crud payload to be passed when api gets called
export interface modalCreateUpdatePayload {
  name: string;
  categoryId?: number;
  subCategoryId?: number;
  filters?: CreateFilterItem[];
  newFilters?: CreateFilterItem[];
  deleteFilters?: number[];
  updateFilters?: updateFilter[];
}
