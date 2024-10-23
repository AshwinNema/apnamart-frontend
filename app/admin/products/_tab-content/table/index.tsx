import { useCallback } from "react";
import {
  getTableColumns,
  getCellValue,
  tableDataDataElement,
  getDeleteActionTexts,
} from "../../helper";
import { RenderTable, TableActions } from "@/app/_custom-components";
import { useProductDispatch, useProductSelector } from "@/lib/product/hooks";
import {
  updateTableData,
  categoryTableDataElement,
} from "@/lib/product/slices/table.slice";
import { setModalDetails } from "@/lib/product/slices/modal-details.slice";
import { getEmptyContent, NameComponent } from "./render-helper";

const DataTable = ({
  loadData,
  onOpen,
}: {
  loadData: (page?: number, id?: number) => void;
  onOpen: () => void;
}) => {
  const tab = useProductSelector((state) => state.componentDetails.tab);
  const table = useProductSelector((state) => state.table);
  const dispatch = useProductDispatch();
  const renderCell = useCallback(
    (data: Partial<tableDataDataElement>, columnKey: React.Key) => {
      const cellValue = getCellValue(tab, data, columnKey);
      const { url, msg, button } = getDeleteActionTexts(tab, data.id);
      switch (columnKey) {
        case "name": {
          const name = cellValue as string;
          return (
            <NameComponent
              photo={(data?.photo || "category image") as string}
              name={name}
            />
          );
        }
        case "category": {
          const category = cellValue as unknown as categoryTableDataElement;
          return <div className="text-lg">{category?.name}</div>;
        }

        case "actions":
          return (
            <TableActions
              deleteUrl={url}
              deleteSuccessMsg={msg}
              deleteModalHeadertext={button}
              onDeleteSuccess={loadData}
              onClick={() => {
                dispatch(setModalDetails(data));
                onOpen();
              }}
              editTooltipText={`Edit ${tab}`}
              deleteToolTipText={`Delete ${tab}`}
            />
          );
        default:
          return <>{cellValue}</>;
      }
    },
    [],
  );

  return (
    <RenderTable
      ariaLabel="Data Table"
      columns={getTableColumns(tab)}
      items={table.results}
      renderCell={renderCell}
      isStriped={true}
      page={table.page}
      totalPages={table.totalPages}
      setPage={(page: number) => {
        dispatch(updateTableData({ page }));
        loadData(page);
      }}
      emptyContent={getEmptyContent(tab)}
    />
  );
};

export default DataTable;
