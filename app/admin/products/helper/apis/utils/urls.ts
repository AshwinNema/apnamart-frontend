import { appEndPoints } from "@/app/_utils";
import { tabKeys } from "@/lib/product/slices/component-details.slice";

export const getCreateUrl = (tab: tabKeys) => {
  switch (tab) {
    case tabKeys.category:
      return appEndPoints.CREATE_CATEGORY;
    case tabKeys.subCategory:
      return appEndPoints.CREATE_SUB_CATEGORY;
    case tabKeys.items:
      return appEndPoints.CREATE_ITEM;
    default:
      return "";
  }
};

export const getUpdateUrl = (tab: tabKeys, id: number) => {
  let url = "";
  switch (tab) {
    case tabKeys.category:
      url = appEndPoints.UPDATE_CATEGORY;
      break;
    case tabKeys.subCategory:
      url = appEndPoints.UPDATE_SUB_CATEGORY;
      break;
    case tabKeys.items:
      url = appEndPoints.UPDATE_ITEM;
      break;
    default:
      break;
  }
  return `${url}${id}`;
};

export const getUploadUrl = (tab: tabKeys, id: number) => {
  switch (tab) {
    case tabKeys.category:
      return appEndPoints.UPDATE_CATEGORY_IMAGE + id;
    case tabKeys.subCategory:
      return appEndPoints.UPDATE_SUB_CATEGORY_IMAGE + id;
    case tabKeys.items:
      return appEndPoints.UPDATE_ITEM_IMAGE + id;
    default:
      return "";
  }
};

export const getQueryUrl = (tabKey: tabKeys) => {
  switch (tabKey) {
    case tabKeys.category:
      return appEndPoints.QUERY_CATEGORIES;

    case tabKeys.subCategory:
      return appEndPoints.QUERY_SUB_CATEGORIES;

    case tabKeys.items:
      return appEndPoints.QUERY_ITEMS;

    default:
      return "";
  }
};
