import { useCallback } from "react";
import { getTableColumns, getDeleteActionTexts } from "../../helper";
import { RenderTable, TableActions } from "@/app/_custom-components";
import { useProductDispatch, useProductSelector } from "@/lib/product/hooks";
import {
  updateTableData,
  categoryTableDataElement,
  subCatTableDataElement,
  itemTableDataElement,
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
    (
      data:
        | categoryTableDataElement
        | subCatTableDataElement
        | itemTableDataElement,
      columnKey: React.Key,
    ) => {
      const { url, msg, button } = getDeleteActionTexts(tab, data.id);
      switch (columnKey) {
        case "name": {
          return (
            <NameComponent photo={data?.photo as string} name={data?.name} />
          );
        }
        case "category": {
          const category = (data as subCatTableDataElement)?.category?.name;
          return <div className="text-lg">{category}</div>;
        }

        case "subCategory": {
          const subCategory = (data as itemTableDataElement)?.subCategory?.name;
          return <div className="text-lg">{subCategory}</div>;
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
          return <></>;
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
