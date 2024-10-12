import { HTTP_METHODS, makeDataRequest } from "@/app/_services";
import { appEndPoints, setKeyVal } from "@/app/_utils";
import { Dispatch, SetStateAction } from "react";
import { newRegistrationDetails, newRegistrationState } from "../../../helper";
import { produce } from "immer";
import { merchantRegistrationStatus } from "@/lib/main/slices/user/user.slice";

export const queryMerchantRegistration = (
  query: {
    name?: string;
    id?: number;
    page?: number;
    limit?: number;
    registrationStatus?: merchantRegistrationStatus;
  },
  setConfig: Dispatch<SetStateAction<newRegistrationState>>,
) => {
  makeDataRequest(
    HTTP_METHODS.GET,
    appEndPoints.QUERY_MERCHANT_REGISTRATIONS,
    undefined,
    query,
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

export const approveMerchantRegistration = (
  id: number,
  getData: () => void,
  onApprove?: () => void,
) => {
  makeDataRequest(
    HTTP_METHODS.PUT,
    `${appEndPoints.APPROVE_MERCHANT_REGISTRATION}${id}`,
    undefined,
    undefined,
    {
      successMsg: "Registration approved successfully",
    },
  )
    .then((res) => {
      if (!res) return;
      onApprove && onApprove();
      getData();
    })
    .catch((err) => {
      console.log(err);
    });
};
