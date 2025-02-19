"use client";
import { Fragment, useCallback, useEffect, useState } from "react";
import {
  getFormattedOrderDate,
  mainConfig,
  queryCustomerOrders,
} from "./helpers";
import { Card, CardBody, Skeleton } from "@heroui/react";
import styles from "@/app/styles.module.css";
import { PaginationComponent } from "../_custom-components";
import { convertFirstLetterToUpperCase } from "../_utils";
import { OrderItems } from "./sub-components";
import { produce } from "immer";
const Main = () => {
  const [config, setConfig] = useState<mainConfig>({
    page: 1,
    limit: 3,
    totalPages: 1,
    totalResults: 0,
    results: [],
    isLoaded: false,
  });

  const getData = useCallback(
    (page: number) => {
      queryCustomerOrders(
        { page, limit: config.limit },
        (res) => {
          setConfig((preConfig) => {
            return {
              ...preConfig,
              ...res,
            };
          });
        },
        () => {
          setConfig(
            produce((draft) => {
              draft.isLoaded = true;
            }),
          );
        },
      );
    },
    [config.limit],
  );

  useEffect(() => {
    getData(1);
  }, [getData]);

  return (
    <Skeleton className="min-h-[100svh]" isLoaded={config.isLoaded}>
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
                <div className="flex flex-col justify-center">
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
    </Skeleton>
  );
};

export default Main;
