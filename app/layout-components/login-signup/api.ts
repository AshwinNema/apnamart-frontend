import {
  loginValidationSchema,
  loginConfig,
  modalTypes,
  signUpValidationSchema,
} from "./constants";
import { appEndPoints } from "@/app/_utils/endpoints";
import { HTTP_METHODS, makeDataRequest } from "@/app/_services";
import { getZodErrMsg } from "@/app/_utils";
import { AppDispatch } from "@/lib/main/store";
import { errorToast, toastErrorIcons } from "@/app/_utils/toast";
import { processSuccessfulAuth } from "./sub-components/util";

export const loginSignUp = async (
  formData: loginConfig["formData"],
  onClose: () => void,
  modalType: modalTypes | null,
  dispatch: AppDispatch,
) => {
  const data =
    modalType === modalTypes.signUp
      ? signUpValidationSchema.safeParse(formData)
      : loginValidationSchema.safeParse(formData);

  if (data?.error) {
    const errMsg = getZodErrMsg(data.error);
    errorToast({ msg: errMsg, iconType: toastErrorIcons.validation });
    return;
  }

  const url =
    modalType === modalTypes.login ? appEndPoints.LOGIN : appEndPoints.REGISTER;

  try {
    const userData = await makeDataRequest(
      HTTP_METHODS.POST,
      url,
      data.data,
      undefined,
      { showToastAndRedirect: false },
    );
    if (!userData) return;
    processSuccessfulAuth(
      {
        ...userData,
        noInitialPassword: false,
        isNewUser: modalType === modalTypes.signUp,
      },
      onClose,
      dispatch,
    );
  } catch (err: any) {
    errorToast({ msg: err?.message });
  }
};
