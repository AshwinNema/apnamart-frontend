import { useCallback, useContext, useEffect } from "react";
import { getTableColumns, MainContext, queriedProduct } from "../../helpers";
import { Button } from "@heroui/react";
import { setNestedPath } from "@/app/_utils";
import { RenderTable } from "@/app/_custom-components";
import { ProductTableDataColumns } from "./table-data-columns";

export const MainLandingPage = ({
  queryCurData,
}: {
  queryCurData: (page?: number) => void;
}) => {
  const mainState = useContext(MainContext);
  const renderCell = useCallback(
    (data: queriedProduct, columnKey: React.Key | null) => {
      return (
        <ProductTableDataColumns
          data={data}
          columnKey={columnKey}
          queryCurdata={queryCurData}
        />
      );
    },
    [],
  );
  useEffect(() => {}, []);
  if (!mainState) return null;
  return (
    <>
      <div className="flex justify-end mr-5 mb-5">
        <Button
          onPress={() => {
            setNestedPath(mainState.setConfig)("currentState")("create");
          }}
          color="primary"
        >
          Create Product
        </Button>
      </div>

      <div>
        <RenderTable
          ariaLabel="Products table"
          columns={getTableColumns()}
          items={mainState.config.results}
          renderCell={renderCell}
          isStriped={true}
          page={mainState.config.page}
          totalPages={mainState.config.totalPages}
          setPage={(page) => {
            setNestedPath(mainState.setConfig)("page")(page);
            queryCurData(page);
          }}
          emptyContent="No Products found"
        ></RenderTable>
      </div>
    </>
  );
};
