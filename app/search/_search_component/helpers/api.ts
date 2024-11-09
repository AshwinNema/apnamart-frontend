import { HTTP_METHODS, makeDataRequest } from "@/app/_services";
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
  makeDataRequest(
    HTTP_METHODS.GET,
    appEndPoints.QUERY_CUSTOMER_PRODUCTS,
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
