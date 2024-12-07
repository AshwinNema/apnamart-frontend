import {
  getLocalStorageKey,
  HTTP_METHODS,
  makeDataRequest,
  storageAttributes,
} from "@/app/_services";
import { appEndPoints } from "@/app/_utils";
import {
  mainConfig,
  queryProductsData,
  setMainConfig,
} from "./interfaces & constants & enums";
import { produce } from "immer";
import { isPriceFilterSelected } from "./price-filter";

export const getQueryProductsQuery = (
  page: number,
  config: mainConfig,
  type: "item" | "sub category",
  id: number,
) => {
  const query: Parameters<queryProductsData>[0] = {
    page,
    limit: config.limit,
    [type === "item" ? "itemId" : "subCategoryId"]: Number(id),
  };
  const { selectedOptions, priceFilter } = config;
  const optionLength = Object.keys(selectedOptions).length;
  if (optionLength) {
    query.filterOptions = Object.keys(selectedOptions).join(",");
  }

  if (
    priceFilter &&
    isPriceFilterSelected(
      priceFilter.options,
      config.minPriceId,
      config.maxPriceId,
    )
  ) {
    const { options } = priceFilter;
    const optionLength = options.length;
    if (Number(config.minPriceId)) {
      query.minPrice = Number(
        options.find((option) => `${option.id}` === `${config.minPriceId}`)
          ?.name,
      );
    }

    const lastOptionId = options[optionLength - 1]?.id;

    if (`${config.maxPriceId}` !== `${lastOptionId}`) {
      query.maxPrice = Number(
        options.find((option) => `${option.id}` === `${config.maxPriceId}`)
          ?.name,
      );
    }
  }

  return query;
};

export const queryProducts: queryProductsData = (
  query,
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
    })
    .finally(() => {
      setConfig(
        produce((draft) => {
          draft.isDataLoaded = true;
        }),
      );
    });
};
