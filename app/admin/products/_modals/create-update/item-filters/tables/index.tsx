import { RenderTable } from "@/app/_custom-components";
import { setNestedPath } from "@/app/_utils";
import { getItemTableCols, itemTableType } from "@/app/admin/products/helper";
import React, { useCallback, useState } from "react";
import { TableSubComponent } from "./sub-component";
export interface itemTableProps<T> {
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
    return (
      <TableSubComponent
        data={data}
        columnKey={columnKey}
        onClick={onClick}
        tableType={tableType}
        onDelete={onDelete}
      />
    );
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
            columns={getItemTableCols(tableType)}
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
