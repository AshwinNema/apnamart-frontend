// Note - this file contains data related to main table
import { appEndPoints } from "@/app/_utils/endpoints";
import { tableDataDataElement } from "../interfaces & enums";
import { tabKeys } from "@/lib/product/slices/component-details.slice";
import { categoryTableDataElement } from "@/lib/product/slices/table.slice";
export * from "./table-columns";
export const getDeleteActionTexts = (tabType: tabKeys, id?: number) => {
  let url = "",
    msg = "deleted successfully",
    button = "Delete";

  switch (tabType) {
    case tabKeys.category:
      url = `${appEndPoints.DELETE_CATEGORY}${id}`;
      msg = `Category ${msg}`;
      button = `${button} Category`;
      break;

    case tabKeys.items:
      url = `${appEndPoints.DELETE_ITEM}${id}`;
      msg = `Item ${msg}`;
      button = `${button} Item`;
      break;
    default:
      break;
  }
  return {
    url,
    msg,
    button,
  };
};

export const getCellValue = (
  tabType: tabKeys,
  data: Partial<tableDataDataElement>,
  columnKey: React.Key,
) => {
  let cellValue = null;
  switch (tabType) {
    case tabKeys.category:
      cellValue = data[columnKey as keyof categoryTableDataElement];
      break;

    case tabKeys.items:
      cellValue = data[columnKey as keyof categoryTableDataElement];
      break;
    default:
      break;
  }
  return cellValue;
};
