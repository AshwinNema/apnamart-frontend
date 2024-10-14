import { Dispatch, SetStateAction } from "react";
import { HTTP_METHODS, makeDataRequest } from "@/app/_services";
import { appEndPoints, errorToast, successToast } from "@/app/_utils";

export const queryMerchants = <T extends object>(
  details: { page: number; limit: number; merchantDetails?: true },
  setConfig: Dispatch<SetStateAction<T>>,
) => {
  makeDataRequest(
    HTTP_METHODS.GET,
    appEndPoints.QUERY_MERCHANTS,
    undefined,
    details,
  )
    .then((res) => {
      if (!res) return;
      setConfig((prevConfig) => {
        return {
          ...prevConfig,
          ...res,
        };
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export type queryMerchantParams = Parameters<typeof queryMerchants>;

export const blockUnBlockMerchant = (
  details: {
    type: "block" | "unblock";
    merchantRegistrationId: number;
  },
  successHandler: () => undefined,
) => {
  makeDataRequest(
    HTTP_METHODS.PUT,
    appEndPoints.BLOCK_UNBLOCK_MERCHANT,
    details,
    undefined,
    {
      successMsg:
        details.type === "block"
          ? "Merchant blocked successfully"
          : "Merchant unblocked successfully",
    },
  )
    .then((res) => {
      if (!res) return;
      successHandler();
    })
    .catch((err) => {
      errorToast({ msg: err.message });
    });
};
