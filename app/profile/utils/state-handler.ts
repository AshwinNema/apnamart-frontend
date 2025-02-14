import * as _ from "lodash";
import {
  merchantRegistrationDetails,
  setMerchantDetails,
} from "@/lib/profile/slices/merchant-details.slice";
import { UserInterface } from "@/lib/main/slices/user/user.slice";
import { ProfileDispatch } from "@/lib/profile/store";
import { stepList as merchantRegistrationStepList } from "../merchant-registration/registration-form/utils";

export const setUserStateDetails = (
  user: UserInterface,
  dispatch: ProfileDispatch,
) => {
  const details: Partial<merchantRegistrationDetails> = _.pick(
    user?.merchantDetails || {},
    [
      "id",
      "name",
      "description",
      "isMerchantBlocked",
      "registrationStatus",
      "latitude",
      "longtitude",
      "addressLine1",
      "addressLine2",
      "bankAcNo",
      "gstIn",
      "panCard",
      "pinCode",
      "photo",
    ],
  );
  if (user?.merchantDetails?.photo) {
    details.showImage = true;
  }
  if (user?.merchantDetails)
    details.totalCompletedSteps = merchantRegistrationStepList.length;
  dispatch(setMerchantDetails(details));
};
