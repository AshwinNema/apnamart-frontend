import { errorToast, successToast, toastErrorIcons } from "@/app/_utils/toast";
import {
  addQuery,
  getToken,
  HTTP_METHODS,
  params,
  uploadRespHandling,
} from "./helper";
import { trackPromise } from "react-promise-tracker";
import { clearUserStorage, redirect } from "../web-storage.service";

export const makeUploadDataRequest = async (
  method: HTTP_METHODS,
  url: string,
  data: object,
  params?: params,
  responseHandling: uploadRespHandling = {
    showToastAndRedirect: true,
    iconType: toastErrorIcons.default,
    throwErr: false,
    successMsg: "",
  },
) => {
  const {
    showToastAndRedirect = true,
    iconType = toastErrorIcons.default,
    throwErr,
    successCallback,
    successMsg,
  } = responseHandling;
  const headers = {
    Authorization: `Bearer ${await getToken()}`,
  };
  url += addQuery(params);
  const formData = new FormData();

  Object.entries(data).forEach(([key, val]) => {
    formData.append(key, val);
  });

  return trackPromise(
    fetch(url, {
      method,
      body: formData,
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
          errorToast({ msg: dataResponse.message, iconType });
          return null;
        }
        successToast({ msg: successMsg });
        successCallback && successCallback();
        return dataResponse;
      })
      .catch((err) => {
        errorToast({ msg: err.message });
      }),
  );
};
