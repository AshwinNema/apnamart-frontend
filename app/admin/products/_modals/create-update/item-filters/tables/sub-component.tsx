import { TableActions } from "@/app/_custom-components";
import { itemTableType, MainModalContext } from "@/app/admin/products/helper";
import { Checkbox } from "@nextui-org/react";
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
  const { setAllData } = mainState;
  switch (columnKey) {
    case "name":
      return <div className="text-lg">{data.name}</div>;

    case "isMainFilter":
      return (
        <div className="flex justify-center">
          <Checkbox
            isSelected={data.id === mainState?.config?.mainFilterItemId}
            onValueChange={(value) => {
              setAllData &&
                setAllData((prevConfig) => {
                  return {
                    ...prevConfig,
                    mainFilterItemId: value ? data.id : null,
                  };
                });
            }}
            color="primary"
          />
        </div>
      );
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
