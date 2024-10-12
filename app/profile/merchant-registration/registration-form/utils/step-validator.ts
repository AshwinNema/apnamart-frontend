import { nextHandlerDetails, stepLabels } from "./interfaces & validations";
import {
  validateBusinessDetails,
  validateBankAndTaxDetails,
  validatePickUpAddress,
} from "./validate-steps";

export const stepValidator = (
  stepkey: stepLabels,
  allDetails: nextHandlerDetails,
  file?: File,
  throwErr?: boolean,
) => {
  switch (stepkey) {
    case stepLabels.businessOverview: {
      const { error, errMsg, data } = validateBusinessDetails(
        allDetails,
        file,
        allDetails?.id,
        throwErr,
      );
      return { error, errMsg, data };
    }
    case stepLabels.bankDetails: {
      const { error, errMsg, data } = validateBankAndTaxDetails(
        allDetails,
        throwErr,
      );
      return { error, errMsg, data };
    }
    case stepLabels.pickUpAddress: {
      const { error, errMsg, data } = validatePickUpAddress(
        allDetails,
        throwErr,
      );
      return { error, errMsg, data };
    }
    default:
      return { error: null, errMsg: "", data: null };
  }
};
