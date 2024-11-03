import { columns } from "@/app/_custom-components";
import { tabKeys } from "@/lib/product/slices/component-details.slice";
import { itemTableProps } from "../../_modals/create-update/item-filters/tables";
import { itemTableType } from "../interfaces & enums";

// This is the main table displayed
export const getTableColumns = (tab: tabKeys): columns[] => {
  const columns: columns[] = [
    {
      key: "name",
      label: "Name",
      headerClass: "ml-20",
    },
  ];

  tab !== tabKeys.category &&
    columns.push({
      label: "Category",
      key: "category",
    });

  tab === tabKeys.items &&
    columns.push({
      label: "Sub Category",
      key: "subCategory",
    });

  columns.push({
    key: "actions",
    label: "Actions",
    align: "end",
  });
  return columns;
};

// In items tab when try to view item update data, we use this table
export const getItemTableCols = <T>(
  tableType: itemTableProps<T>["tableType"],
): columns[] => {
  const columns: columns[] = [
    {
      label: "Name",
      key: "name",
    },
  ];

  tableType === itemTableType.main &&
    columns.push({
      label: "Main Menu Filter",
      key: "isMainFilter",
    });

  columns.push({
    key: "actions",
    label: "Actions",
    align: "end",
  });

  return columns;
};
