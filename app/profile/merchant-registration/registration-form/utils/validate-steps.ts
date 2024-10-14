import {
  step0Details,
  businessDetailsValidation,
  step1Details,
  bankAndTaxDetailsValidation,
  step2Details,
  pickUpAddressValidation,
} from "./interfaces & validations";
import { errorToast, toastErrorIcons, validateZodSchema } from "@/app/_utils";
import { ZodError } from "zod";

export const validateBusinessDetails = (
  allDetails: step0Details,
  file?: File,
  id?: number,
  throwErr?: boolean,
) => {
  let { error, data, errMsg } = validateZodSchema(
    allDetails,
    businessDetailsValidation,
    false,
  );

  if (!id && !file) {
    const fileErrMsg = `Please upload your business logo`;
    errMsg = errMsg ? `${errMsg}, ${fileErrMsg}` : fileErrMsg;
    if (!error)
      error = new ZodError([
        {
          path: ["file"],
          message: "Business Logo is required",
          code: "custom",
        },
      ]);
  }

  if (errMsg && throwErr) {
    errorToast({
      msg: errMsg,
      iconType: toastErrorIcons.validation,
    });
  }

  return {
    data,
    errMsg,
    error,
  };
};

export const validateBankAndTaxDetails = (
  allDetails: step1Details,
  throwErr?: boolean,
) => {
  const { error, data, errMsg } = validateZodSchema(
    allDetails,
    bankAndTaxDetailsValidation,
    throwErr,
    toastErrorIcons.validation,
  );
  return {
    error,
    data,
    errMsg,
  };
};

export const validatePickUpAddress = (
  allDetails: step2Details,
  throwErr?: boolean,
) => {
  const { error, data, errMsg } = validateZodSchema(
    allDetails,
    pickUpAddressValidation,
    throwErr,
    toastErrorIcons.validation,
  );

  return {
    error,
    data,
    errMsg,
  };
};
