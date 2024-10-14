import { RenderTable, TableActions } from "@/app/_custom-components";
import { setNestedPath } from "@/app/_utils";
import { getItemTableCols, itemTableType } from "@/app/admin/products/helper";
import React, { useCallback, useState } from "react";

interface itemTableProps<T> {
  tableType: itemTableType;
  onClick: (data: T) => void;
  onDelete: (closeModal: () => void, data: T) => void;
  items: T[] | T[];
  className?: string;
  hideTable?: boolean;
}

export const ItemTable = <T extends { id: string | number; name: string }>({
  tableType,
  onClick,
  items,
  className,
  hideTable,
  onDelete,
}: itemTableProps<T>) => {
  const renderCell = useCallback((data: T, columnKey: React.Key | null) => {
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
            deleteBtnText={`Delete ${label}`}
            editTooltipText={`Edit ${label}`}
            deleteToolTipText={`Delete ${label}`}
          />
        );

      default:
        return <></>;
    }
  }, []);
  const [config, setConfig] = useState({
    page: 1,
    totalPages: 1,
  });
  const setData = useCallback(setNestedPath(setConfig), [setConfig]);

  return (
    <>
      {!!!hideTable && (
        <div className={className}>
          <RenderTable
            ariaLabel="Data Table"
            isStriped={true}
            columns={getItemTableCols()}
            items={items}
            renderCell={renderCell}
            totalPages={config.totalPages}
            setPage={setData("page")}
            emptyContent="No results found"
          />
        </div>
      )}
    </>
  );
};
