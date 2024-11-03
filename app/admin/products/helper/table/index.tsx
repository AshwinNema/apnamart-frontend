// Note - this file contains data related to main table
import { appEndPoints } from "@/app/_utils/endpoints";
import { tabKeys } from "@/lib/product/slices/component-details.slice";
export * from "./table-columns";
export const getDeleteActionTexts = (tabType: tabKeys, id?: number) => {
  let url = "";
  switch (tabType) {
    case tabKeys.category:
      url = `${appEndPoints.DELETE_CATEGORY}${id}`;
      break;

    case tabKeys.subCategory:
      url = `${appEndPoints.DELETE_SUB_CATEGORY}${id}`;
      break;

    case tabKeys.items:
      url = `${appEndPoints.DELETE_ITEM}${id}`;
      break;
    default:
      break;
  }

  return {
    url,
    msg: `${tabType} deleted successfully`,
    button: `Delete ${tabType}`,
  };
};
