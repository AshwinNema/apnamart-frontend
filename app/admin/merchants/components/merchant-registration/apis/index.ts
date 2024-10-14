import { HTTP_METHODS, makeDataRequest } from "@/app/_services";
import { appEndPoints } from "@/app/_utils";
import { Dispatch, SetStateAction } from "react";
import { newRegistrationState } from "../../../helper";
import { merchantRegistrationStatus } from "@/lib/main/slices/user/user.slice";

export const queryMerchantRegistration = <T extends object>(
  query: {
    name?: string;
    id?: number;
    page?: number;
    limit?: number;
    registrationStatus?: merchantRegistrationStatus;
    isMerchantBlocked?: boolean;
  },
  setConfig?: Dispatch<SetStateAction<newRegistrationState<T>>>,
  processData?: (res: any) => void,
) => {
  makeDataRequest(
    HTTP_METHODS.GET,
    appEndPoints.QUERY_MERCHANT_REGISTRATIONS,
    undefined,
    query,
  )
    .then((res) => {
      if (!res) return;
      setConfig &&
        setConfig((prevConfig) => {
          return {
            ...prevConfig,
            ...res,
          };
        });

      processData && processData(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

export type queryMerchantRegistrationParams = Parameters<
  typeof queryMerchantRegistration
>;

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
