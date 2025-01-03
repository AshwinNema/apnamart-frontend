import React, { useCallback, useEffect, useState } from "react";
import { mainConfig, orderItem, queryMerchantOrders } from "./helpers";
import { NameComponent } from "@/app/admin/products/_tab-content/table/render-helper";
import { convertFirstLetterToUpperCase } from "@/app/_utils";

const useConfigManager = (): [
  mainConfig,
  (data: orderItem, columnKey: React.Key) => React.JSX.Element,
  (page: number) => void,
] => {
  const [config, setConfig] = useState<mainConfig>({
    page: 1,
    limit: 3,
    totalPages: 1,
    totalResults: 0,
    results: [],
  });

  const renderCell = useCallback((data: orderItem, columnKey: React.Key) => {
    const { price, quantity } = data;

    switch (columnKey) {
      case "name":
        return (
          <NameComponent
            photo={data?.product?.photos[0]?.url}
            name={data?.product?.name}
          />
        );
      case "price":
        return <div className="mx-5">{price}</div>;
      case "quantity":
        return <div className="mx-5">{quantity}</div>;
      case "totalPrice":
        return <div className="mx-5">{price * quantity}</div>;
      case "paymentMode":
        return (
          <div className="mx-5">
            {convertFirstLetterToUpperCase(data?.order?.paymentMode)}
          </div>
        );

      case "paymentStatus":
        return (
          <div className="mx-5">
            {" "}
            {convertFirstLetterToUpperCase(data?.order?.paymentStatus)}
          </div>
        );
      default:
        return <></>;
    }
  }, []);

  const getData = useCallback(
    (page: number) => {
      queryMerchantOrders({ page, limit: config.limit }, (res) => {
        console.log(res, "this is the res");
        setConfig((preConfig) => {
          return {
            ...preConfig,
            ...res,
          };
        });
      });
    },
    [setConfig],
  );

  useEffect(() => {
    getData(1);
  }, []);

  return [config, renderCell, getData];
};

export default useConfigManager;
