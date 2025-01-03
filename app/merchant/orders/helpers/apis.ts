import { HTTP_METHODS, makeDataRequest } from "@/app/_services";
import { appEndPoints, setVal } from "@/app/_utils";

export const queryMerchantOrders = (
  details: {
    page: number;
    limit: number;
  },
  setData?: setVal,
) => {
  makeDataRequest(
    HTTP_METHODS.GET,
    appEndPoints.QUERY_MERCHANT_ORDERS,
    undefined,
    details,
  )
    .then((res) => {
      if (!res) return;
      console.log(res);
      setData && setData(res);
    })
    .catch((err) => {
      console.log(err);
    });
};
