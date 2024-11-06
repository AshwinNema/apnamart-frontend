import { tabKeys } from "@/lib/product/slices/component-details.slice";
import { MainModalState } from "../../interfaces & enums";
import { errorToast, toastErrorIcons } from "@/app/_utils";
import {
  modalCreateUpdatePayload,
  modalCreateUpdatePayloadParams,
  processUpdateItemFilterPayload,
} from "../..";

export * from "./urls";
export * from "./get-item-filter-transformer";
export * from "./item-filter-payload";
export const getCreateUpdatePayload = ({
  tab,
  config,
}: modalCreateUpdatePayloadParams) => {
  const {
    name,
    id,
    upload: files,
    categoryId,
    filterItems,
    subCategoryId,
  } = config;
  const apiBody: modalCreateUpdatePayload = {
    name,
    ...processUpdateItemFilterPayload({
      tab,
      config,
    }),
  };
  if (tab !== tabKeys.category && categoryId) apiBody.categoryId = categoryId;
  if (tab === tabKeys.items && subCategoryId)
    apiBody.subCategoryId = subCategoryId;
  // Filters are sent only when we are creating
  if (tab === tabKeys.items && filterItems.length && !id) {
    apiBody.filters = filterItems.map((item) => {
      return {
        name: item.name,
        options: item.options.map((option) => ({
          name: option.name,
        })),
        isMainFilter: config.mainFilterItemId === item.id,
      };
    });
  }
  const file: { file?: File } = {};
  if (files?.cachedFileArray?.[0]) file.file = files?.cachedFileArray?.[0];
  const payload = id
    ? apiBody
    : {
        ...file,
        data: JSON.stringify(apiBody),
      };
  return payload;
};

export const validateCreateUpdatePayload = (
  config: MainModalState,
  tab: tabKeys,
) => {
  const errors: string[] = [];
  const {
    name,
    id,
    upload: files,
    categoryId,
    subCategoryId,
    filterItems,
  } = config;
  !name.trim() && errors.push("Name cannot be empty");

  !id &&
    !files?.cachedFileArray?.[0] &&
    tab !== tabKeys.items &&
    errors.push(`${tab} image has to be added`);

  tab !== tabKeys.category &&
    !categoryId &&
    errors.push("Category is mandatory");

  tab === tabKeys.items &&
    !subCategoryId &&
    errors.push("Sub category is mandatory");

  // tab === tabKeys.items &&
  //   !filterItems.length &&
  //   errors.push("There should be atleast one filter");

  if (errors.length) {
    errorToast({
      msg: errors.join(", "),
      iconType: toastErrorIcons.validation,
    });
    return true;
  }
  return false;
};
