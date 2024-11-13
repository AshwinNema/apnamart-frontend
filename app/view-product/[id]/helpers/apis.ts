import {
  getLocalStorageKey,
  HTTP_METHODS,
  makeDataRequest,
  storageAttributes,
} from "@/app/_services";
import { appEndPoints, setVal } from "@/app/_utils";

export const getProductData = (id: number, setData:setVal) => {
  const user = getLocalStorageKey(storageAttributes.user);
  makeDataRequest(
    HTTP_METHODS.GET,
    user
      ? `${appEndPoints.BY_PRODUCT_ID_LOGGED_IN}${id}`
      : `${appEndPoints.BY_PRODUCT_ID_NOT_LOGGED_IN}${id}`,
  )
    .then((res) => {
      console.log(res, "this is the res");
      setData(res)
    })
    .catch((err) => {
      console.log(err);
    });
};
