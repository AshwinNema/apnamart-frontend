import { HTTP_METHODS, makeDataRequest } from "@/app/_services";
import {
  addOrdinalSuffix,
  appEndPoints,
  getMonthName,
  setVal,
} from "@/app/_utils";

export * from "./interfaces & enums & constants";

export const queryCustomerOrders = (
  details: {
    page: number;
    limit: number;
  },
  setData?: setVal,
) => {
  makeDataRequest(
    HTTP_METHODS.GET,
    appEndPoints.QUERY_CUSTOMER_ORDERS,
    undefined,
    details,
  )
    .then((res) => {
      if (!res) return;
      setData && setData(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getFormattedOrderDate = (date: Date) => {
  if (!date || new Date(date).toString() === "Invalid Date") return "";
  const convertedDate = new Date(date);
  const day = convertedDate.getDate();
  const month = getMonthName(convertedDate.getMonth());
  const year = convertedDate.getFullYear();

  return `${addOrdinalSuffix(day)} ${month} ${year}`;
};
