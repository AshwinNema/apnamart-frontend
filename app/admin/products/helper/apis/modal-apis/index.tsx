import {
  fetchConfig,
  HTTP_METHODS,
  makeDataRequest,
  params,
} from "@/app/_services";
import { appEndPoints, setVal } from "@/app/_utils";
import { MainModalState } from "../../interfaces & enums";
export * from "./create-update";
import * as _ from "lodash";
import { processGetItemFilters } from "../..";

export const getSearchList = (
  url: string,
  setData: setVal,
  params?: params,
  reqConfig?: fetchConfig,
) => {
  makeDataRequest(HTTP_METHODS.GET, url, undefined, params, reqConfig)
    .then((res) => {
      if (!res) return;

      const data = res.map(
        (item: { id: number; name: string; photo: string }) => {
          return {
            id: item.id,
            label: item.name,
            photo: item.photo,
          };
        },
      );
      setData(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getItemFilters = (
  id: number,
  setData: (
    list: MainModalState["filterItems"],
    originalFilterItems: MainModalState["originalFilterItems"],
  ) => void,
) => {
  makeDataRequest(
    HTTP_METHODS.GET,
    `${appEndPoints.GET_ITEM_FILTERS_BY_ITEM_ID}${id}`,
  ).then((res) => {
    if (!res) return;

    const { list, filterMap } = processGetItemFilters(res);
    setData(list, filterMap);
  });
};
