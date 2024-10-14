import { trackPromise } from "react-promise-tracker";
import { clearUserStorage, redirect } from "../web-storage.service";
import { errorToast, successToast, toastErrorIcons } from "../../_utils/toast";
import {
  params,
  getToken,
  HTTP_METHODS,
  addQuery,
  fetchConfig,
} from "./helper";

export * from "./helper";
export * from "./upload-handler";
export * from "./websocket";

export const makeDataRequest = async (
  method: HTTP_METHODS,
  url: string,
  data?: object,
  params?: params,
  reqConfig: fetchConfig = {
    showToastAndRedirect: true,
    iconType: toastErrorIcons.default,
    throwErr: false,
    showLoader: true,
    showToast: true,
    addToken: true,
  },
) => {
  const {
    showToastAndRedirect = true,
    iconType = toastErrorIcons.default,
    throwErr,
    showLoader = true,
    showToast = true,
    addToken = true,
    successMsg,
  } = reqConfig;
  const headers: {
    "Content-Type": string;
    Authorization?: string;
  } = {
    "Content-Type": "application/json",
  };

  if (addToken) {
    headers["Authorization"] = `Bearer ${await getToken()}`;
  }

  url += addQuery(params);
  const promise = fetch(url, {
    method,
    body: (data && JSON.stringify(data)) || undefined,
    headers,
  })
    .then(async (response) => {
      if (response.status === 401) {
        if (showToastAndRedirect) {
          errorToast({ msg: "Token expired" });
          clearUserStorage();
          redirect("/");
        }
        return;
      }
      if (response.status === 204) {
        return Promise.resolve("ok");
      }
      const dataResponse = await response.json();
      if (dataResponse?.statusCode >= 400) {
        if (throwErr) {
          throw new Error(dataResponse.message);
        }
        if (showToast) {
          errorToast({ msg: dataResponse.message, iconType });
        }

        return null;
      }
      successMsg && successToast({ msg: successMsg });
      return dataResponse;
    })
    .catch((err) => {
      errorToast({ msg: err.message });
    });
  if (showLoader) {
    return trackPromise(promise);
  }
  return promise;
};
