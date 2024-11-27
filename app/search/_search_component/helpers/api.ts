import {
  getLocalStorageKey,
  HTTP_METHODS,
  makeDataRequest,
  storageAttributes,
} from "@/app/_services";
import { appEndPoints } from "@/app/_utils";
import { setMainConfig } from "./interfaces & constants & enums";
import { produce } from "immer";

export const queryProducts = (
  query: {
    page: number;
    limit: number;
    itemId?: number;
    subCategoryId?: number;
  },
  setConfig: setMainConfig,
) => {
  const user = getLocalStorageKey(storageAttributes.user);
  makeDataRequest(
    HTTP_METHODS.GET,
    user
      ? appEndPoints.QUERY_CUSTOMER_PRODUCTS_LOGGED
      : appEndPoints.QUERY_CUSTOMER_PRODUCTS_UNLOGGED,
    undefined,
    query,
  )
    .then((res) => {
      if (!res) return;
      const { data, entityData } = res;
      if (!data || !entityData) return;
      setConfig(
        produce((draft) => {
          draft.mainHeader = entityData.name;
          draft.limit = data.limit;
          draft.page = data.page;
          draft.results = data.results;
          draft.totalPages = data.totalPages;
          draft.totalResults = data.totalResults;
        }),
      );
    })
    .catch((err) => {
      console.log(err);
    });
};
