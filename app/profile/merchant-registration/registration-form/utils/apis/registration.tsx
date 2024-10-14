import {
  getLocalStorageKey,
  HTTP_METHODS,
  makeDataRequest,
  makeUploadDataRequest,
  setLocalStorageKey,
  storageAttributes,
} from "@/app/_services";
import {
  createUpdateRegistrationDetails,
  finalDetailsValidation,
  nextHandlerDetails,
  stepList,
} from "../interfaces & validations";
import {
  appEndPoints,
  errorToast,
  toastErrorIcons,
  validateZodSchema,
} from "@/app/_utils";
import { ProfileDispatch } from "@/lib/profile/store";
import {
  merchantRegistrationDetails,
  setMerchantDetails,
} from "@/lib/profile/slices/merchant-details.slice";
import { UserInterface } from "@/lib/main/slices/user/user.slice";
import { createUpdateRegistrationValidation } from "./validations";

const setDetailsOnCreateUpdate = (
  dispatch: ProfileDispatch,
  data: Partial<merchantRegistrationDetails>,
) => {
  const user: UserInterface = getLocalStorageKey(storageAttributes.user);
  setLocalStorageKey(storageAttributes.user, {
    ...user,
    merchantDetails: {
      ...user.merchantDetails,
      ...data,
      totalCompletedSteps: stepList.length,
    },
  });
  dispatch(setMerchantDetails(data));
};

export const createUpdateRegistration = (
  allDetails: createUpdateRegistrationDetails,
  dispatch: ProfileDispatch,
  file?: File,
) => {
  const { id } = allDetails;
  const data = createUpdateRegistrationValidation(allDetails, file);
  if (!data) return;

  id
    ? makeDataRequest(
        HTTP_METHODS.PUT,
        appEndPoints.UPDATE_REGISTRATION_DETAILS,
        data,
        undefined,
        {
          successMsg: "Registration details are updated successfully",
        },
      )
        .then((res) => {
          if (!res) return;
          setDetailsOnCreateUpdate(dispatch, res);
        })
        .catch((err) => {
          return;
        })
    : makeUploadDataRequest(
        HTTP_METHODS.POST,
        appEndPoints.START_MERCHANT_REGISTRATION,
        {
          file,
          data: JSON.stringify(data),
        },
        undefined,
        {
          successMsg: (
            <p>
              Your business registration is in progress. One of our admins will
              be reviewing your profile and approving your access on the
              platform
            </p>
          ),
        },
      ).then((res) => {
        if (!res) return;
        setDetailsOnCreateUpdate(dispatch, res);
      });
};
