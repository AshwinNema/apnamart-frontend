import { TableActions } from "@/app/_custom-components";
import { itemTableType, MainModalContext } from "@/app/admin/products/helper";
import { useContext } from "react";
import { itemTableProps } from ".";

export const TableSubComponent = <
  T extends { id: string | number; name: string },
>({
  data,
  columnKey,
  onClick,
  tableType,
  onDelete,
}: {
  data: T;
  columnKey: React.Key | null;
  onClick: itemTableProps<T>["onClick"];
  tableType: itemTableProps<T>["tableType"];
  onDelete: itemTableProps<T>["onDelete"];
}) => {
  const mainState = useContext(MainModalContext);
  if (!mainState) return <></>;
  switch (columnKey) {
    case "name":
      return <div className="text-lg">{data.name}</div>;

    case "actions":
      const label =
        tableType === itemTableType.main ? "Filter" : "Filter Option";
      return (
        <TableActions
          onClick={() => {
            onClick(data);
          }}
          onDelete={(closeModal) => {
            onDelete(closeModal, data);
          }}
          deleteModalHeadertext={`Delete ${label}`}
          editTooltipText={`Edit ${label}`}
          deleteToolTipText={`Delete ${label}`}
        />
      );

    default:
      return <></>;
  }
};
