import { Dispatch, SetStateAction } from "react";
import {
  merchantListState,
  merchantSelectStatus,
  newRegistrationDetails,
} from "../../../helper";
import { queryMerchantParams, queryMerchants } from "./api";
import {
  queryMerchantRegistration,
  queryMerchantRegistrationParams,
} from "../../merchant-registration/apis";
import { merchantRegistrationStatus } from "@/lib/main/slices/user/user.slice";
import { produce } from "immer";

export const queryMerchantList = (
  page: number,
  config: merchantListState,
  setConfig: Dispatch<SetStateAction<merchantListState>>,
) => {
  const { type } = config;
  {
    const params: queryMerchantParams[0] = {
      limit: config.limit,
      page,
    };

    if (type === merchantSelectStatus.notStarted) {
      params.merchantDetails = true;
    }
    // If merchant registration is not started or we want to see tll the registrations then we can simply
    // call queryMerchants to get all the merchants / whose registration is not started
    const useAllMerchantsApi =
      type === merchantSelectStatus.notStarted ||
      type === merchantSelectStatus.all;
    useAllMerchantsApi && queryMerchants(params, setConfig);
    if (useAllMerchantsApi) return;
  }
  const params: queryMerchantRegistrationParams[0] = {
    limit: config.limit,
    page,
  };

  switch (type) {
    case merchantSelectStatus.adminReview:
      params.registrationStatus = merchantRegistrationStatus.adminReview;
      break;

    case merchantSelectStatus.completed:
      params.registrationStatus = merchantRegistrationStatus.completed;
      break;
    case merchantSelectStatus.banned:
      params.isMerchantBlocked = true;
    default:
      break;
  }
  queryMerchantRegistration(params, undefined, (res) => {
    const { page, limit, totalPages, totalResults, results } = res;
    const transformedResults = results.map(
      (registrationDetails: newRegistrationDetails) => {
        const { user, ...merchantDetails } = registrationDetails;
        return {
          ...user,
          merchantDetails,
        };
      },
    );
    setConfig(
      produce((draft) => {
        draft.page = page;
        draft.limit = limit;
        draft.totalPages = totalPages;
        draft.totalResults = totalResults;
        draft.results = transformedResults;
      }),
    );
  });
};
