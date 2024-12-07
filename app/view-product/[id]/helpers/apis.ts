import {
  fetchConfig,
  getLocalStorageKey,
  HTTP_METHODS,
  makeDataRequest,
  storageAttributes,
} from "@/app/_services";
import { appEndPoints, errorToast, setVal } from "@/app/_utils";

export const getProductData = (
  id: number,
  setData: setVal,
  onOperationComplete?: () => void,
) => {
  const user = getLocalStorageKey(storageAttributes.user);
  makeDataRequest(
    HTTP_METHODS.GET,
    user
      ? `${appEndPoints.BY_PRODUCT_ID_LOGGED_IN}${id}`
      : `${appEndPoints.BY_PRODUCT_ID_NOT_LOGGED_IN}${id}`,
  )
    .then((res) => {
      setData(res);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      onOperationComplete && onOperationComplete();
    });
};

export const addRemoveCartProduct = (
  productId: number,
  query: { connect: boolean },
  onFailure?: () => void,
  onSuccess?: (res: number) => void,
  reqConfig?: fetchConfig,
) => {
  makeDataRequest(
    HTTP_METHODS.PUT,
    `${appEndPoints.ADD_REMOVE_CART_ITEM}${productId}`,
    undefined,
    query,
    reqConfig,
  )
    .then((res) => {
      if (!res) {
        onFailure && onFailure();
        return;
      }
      onSuccess && onSuccess(Object.keys(res.cartItems || {}).length);
    })
    .catch((err) => {
      errorToast({ msg: err.msg });
      onFailure && onFailure();
    });
};
