import { setUser, UserInterface } from "@/lib/main/slices/user/user.slice";
import {
  HTTP_METHODS,
  makeDataRequest,
  makeUploadDataRequest,
  getLocalStorageKey,
  setLocalStorageKey,
  storageAttributes,
} from "../_services";
import { appEndPoints } from "../_utils/endpoints";
import { AppDispatch } from "@/lib/main/store";
import { checkMerchantRegistration, getUpdateUserDetailsSchema } from "./utils";
import { getZodErrMsg } from "../_utils";
import {
  errorToast,
  successToast,
  toastErrorIcons,
  toastSuccessIcons,
} from "../_utils/toast";
import { ProfileDispatch } from "@/lib/profile/store";
import { setProfileUser } from "@/lib/profile/slices/user.slice";
import { tabKeys } from "@/lib/profile/slices/component-state.slice";

export const getUserProfile = (
  dispatch: AppDispatch,
  getMerchantDetails: boolean,
) => {
  makeDataRequest(HTTP_METHODS.GET, appEndPoints.PROFILE, undefined, {
    getMerchantDetails,
  }).then((res) => {
    if (!res) return;
    let user = getLocalStorageKey(storageAttributes.user) as UserInterface;
    user = { ...user, ...res };
    dispatch(setUser(user));
    setLocalStorageKey(storageAttributes.user, user);
    checkMerchantRegistration(user, dispatch);
  });
};

export const uploadProfileImage = (file: File, dispatch: ProfileDispatch) => {
  makeUploadDataRequest(
    HTTP_METHODS.PUT,
    appEndPoints.UPLOAD_PROFILE_IMG,
    { file },
    undefined,
    {
      successMsg: "Profile picture updated successfully",
    },
  ).then((res) => {
    if (!res) return;

    let user = getLocalStorageKey(storageAttributes.user) as UserInterface;
    user = { ...user, ...res };
    dispatch(setProfileUser(user));
    setLocalStorageKey(storageAttributes.user, user);
  });
};

export const updateUserDetails = (
  details: { password: string } | { name: string; email: string },
  type: tabKeys,
  dispatch: ProfileDispatch,
  mainUserUpdate: (user: UserInterface) => void,
) => {
  makeDataRequest(
    HTTP_METHODS.PUT,
    appEndPoints.UPDATE_USER_PROFILE,
    details,
  ).then((res) => {
    const schema = getUpdateUserDetailsSchema(type);

    const parsedData = schema.safeParse(details);
    if (parsedData?.error) {
      const errMsg = getZodErrMsg(parsedData.error);
      errorToast({
        msg: errMsg,
        iconType: toastErrorIcons.validation,
      });
      return;
    }
    if (!res) return;
    let user = getLocalStorageKey(storageAttributes.user) as UserInterface;
    user = { ...user, ...res };
    mainUserUpdate(user);
    successToast({
      msg: "User details updated successfully",
      iconType: toastSuccessIcons.rocket,
    });
    dispatch(setProfileUser(user));
    setLocalStorageKey(storageAttributes.user, user);
  });
};
