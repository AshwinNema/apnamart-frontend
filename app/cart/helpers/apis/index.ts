import { HTTP_METHODS, makeDataRequest } from "@/app/_services";
import { appEndPoints, setVal } from "@/app/_utils";

export const getUserCartProducts = (
  setData: setVal,
  onOperationComplete?: () => void,
) => {
  makeDataRequest(HTTP_METHODS.GET, appEndPoints.CART_ITEM_LIST)
    .then((res) => {
      setData(res);
    })
    .catch((err) => {
      console.log(err, "this is the err");
    })
    .finally(() => {
      onOperationComplete && onOperationComplete();
    });
};

export const increaseDecreaseCartItemCount = (
  productId: number,
  params: {
    quantity?: number;
    change?: -1 | 1;
  },
  onSuccess?: (res: any) => void,
  onReqEnd?: () => void,
) => {
  makeDataRequest(
    HTTP_METHODS.PUT,
    `${appEndPoints.INCREASE_DECREASE_CART_ITEM_COUNT}${productId}`,
    params,
    undefined,
    {
      showLoader: false,
    },
  )
    .then((res) => {
      if (!res) return;
      onSuccess && onSuccess(res);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      onReqEnd && onReqEnd();
    });
};
