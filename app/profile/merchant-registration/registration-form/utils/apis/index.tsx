import {
  getLocalStorageKey,
  HTTP_METHODS,
  makeUploadDataRequest,
  setLocalStorageKey,
  storageAttributes,
} from "@/app/_services";
import { appEndPoints } from "@/app/_utils";
import {
  Merchantdetails,
  UserInterface,
} from "@/lib/main/slices/user/user.slice";
export * from "./registration";

export const uploadMerchantLogo = (
  file: File,
  dispatchDetails: (details: Merchantdetails) => void,
) => {
  makeUploadDataRequest(
    HTTP_METHODS.PUT,
    appEndPoints.MERCHANT_REGISTRATION_FILE,
    {
      file,
    },
    undefined,
    {
      successMsg: "Logo updated successfully",
    },
  ).then((res) => {
    if (!res) return;
    const user: UserInterface = getLocalStorageKey(storageAttributes.user);
    setLocalStorageKey(storageAttributes.user, {
      ...user,
      merchantDetails: res,
    });
    dispatchDetails(res);
  });
};
