import React, { useContext } from "react";
import { MainContext, queriedProduct } from "../../helpers";
import { TableActions } from "@/app/_custom-components";
import { appEndPoints } from "@/app/_utils";
import { produce } from "immer";

export const ProductTableDataColumns = ({
  data,
  columnKey,
  queryCurdata,
}: {
  data: queriedProduct;
  columnKey: React.Key | null;
  queryCurdata: () => void;
}) => {
  const mainState = useContext(MainContext);
  if (!mainState) return null;
  switch (columnKey) {
    case "name":
    case "price":
      return <div>{data?.[columnKey]}</div>;
    case "available":
      return <div>{data?.[columnKey] ? "Yes" : "No"}</div>;
    case "category.name":
      return <div>{data?.item?.category?.name}</div>;
    case "item.name":
      return <div>{data?.item?.name}</div>;
    case "actions":
      return (
        <div className="flex">
          <TableActions
            onClick={() => {
              mainState.setConfig(
                produce((draft) => {
                  draft.updateData = data;
                  draft.currentState = "update";
                }),
              );
            }}
            deleteModalHeadertext="Delete Product"
            deleteUrl={appEndPoints.DELETE_PRODUCT_BY_ID}
            deleteSuccessMsg="Product deleted successfully"
            onDeleteSuccess={() => {
              queryCurdata();
            }}
            editTooltipText="Update product"
            deleteToolTipText="Delete product"
            editToolTipColor="warning"
            updateToolTipClass="text-white"
            editIconClass="text-white"
          />
        </div>
      );
    default:
      return <></>;
  }
};
