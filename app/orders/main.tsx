"use client";
import { Fragment, useCallback, useEffect, useState } from "react";
import {
  getFormattedOrderDate,
  mainConfig,
  queryCustomerOrders,
} from "./helpers";
import { Card, CardBody } from "@nextui-org/react";
import styles from "@/app/styles.module.css";
import { ImageComponent, PaginationComponent } from "../_custom-components";
import { convertFirstLetterToUpperCase } from "../_utils";
import { OrderItems } from "./sub-components";

const Main = () => {
  const [config, setConfig] = useState<mainConfig>({
    page: 1,
    limit: 3,
    totalPages: 1,
    totalResults: 0,
    results: [],
  });

  const getData = useCallback(
    (page: number) => {
      queryCustomerOrders({ page, limit: config.limit }, (res) => {
        console.log(res, "this is the res");
        setConfig((preConfig) => {
          return {
            ...preConfig,
            ...res,
          };
        });
      });
    },
    [config.limit],
  );

  useEffect(() => {
    getData(1);
  }, [getData]);

  return (
    <>
      {config.results.map((order, index) => {
        return (
          <Fragment key={order.id}>
            <Card
              classNames={{
                base: `mx-4 ${index > 0 && "mt-4"}`,
                body: [`${styles["customer-orders"]}`],
              }}
            >
              <CardBody>
                <OrderItems order={order} />
                <div className="">
                  <div>
                    <span className="font-bold">Order Date</span> -{" "}
                    {getFormattedOrderDate(order.createdAt)}
                  </div>
                  <div>
                    <span className="font-bold">Payment Mode</span> -{" "}
                    {convertFirstLetterToUpperCase(order.paymentMode)}
                  </div>

                  <div>
                    <span className="font-bold">Order Status</span> -{" "}
                    {convertFirstLetterToUpperCase(order.orderStatus)}
                  </div>
                </div>
              </CardBody>
            </Card>
          </Fragment>
        );
      })}
      {config.totalPages > 0 && (
        <PaginationComponent
          page={config.page}
          totalPages={config.totalPages}
          containerClasName="mt-5"
          onChange={(page) => {
            getData(page);
          }}
        />
      )}
    </>
  );
};

export default Main;
