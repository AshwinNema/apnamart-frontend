import {
  bodyState,
  createUpdateItemState,
  MainModalState,
} from "../interfaces & enums";

export const getMainDefaultState = (): MainModalState => ({
  name: "",
  upload: null,
  categoryId: null,
  height: 0,
  bodyState: bodyState.details,
  filterItems: [],
  categoryList: [],
  categoryVal: "",
  deletedOriginalItems: [],
  originalFilterItems: {},
  mainFilterItemId: null,
});

export const defaultModalBodyConfig = () => ({
  showImage: false,
  showUpdateSaveBtn: false,
});

export const getDefaultItemFilterConfig = () => ({
  createUpdateFilter: null,
  createUpdateFilterOption: null,
  limit: 5,
  page: 1,
  updateFilterDetails: null,
});
// for documentation please refer app/admin/products/_modals/create-update/item-filters/create-update-filters/index.tsx
export const getCreateUpdateItemConfig = (): createUpdateItemState => {
  return {
    name: "",
    optionCreateUpdateName: "",
    options: [],
    optionId: null,
    filterId: null,
    deletedOptions: [],
    isMainFilter:false
  };
};
