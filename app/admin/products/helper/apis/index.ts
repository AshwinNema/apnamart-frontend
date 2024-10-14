import { HTTP_METHODS, makeDataRequest } from "@/app/_services";
import { getDataQuery } from "../interfaces & enums";
import { ProductDispatch } from "@/lib/product/store";
import { updateTableData } from "@/lib/product/slices/table.slice";
import { tabKeys } from "@/lib/product/slices/component-details.slice";
import { getQueryUrl } from "./utils";

export * from "./modal-apis";
export * from "./utils";

export const queryTableData = (
  tabKey: tabKeys,
  query: getDataQuery,
  dispatch: ProductDispatch,
) => {
  let url = getQueryUrl(tabKey);

  makeDataRequest(HTTP_METHODS.GET, url, undefined, {
    ...query,
  }).then((res) => {
    if (!res) return;
    if (tabKey === tabKeys.items) {
      res.results = res.results.map(
        (item: {
          id: number;
          name: string;
          photo: string;
          subCategory: {
            id: number;
            name: string;
            category: {
              id: number;
              name: string;
            };
          };
        }) => {
          const { id, name, subCategory, photo } = item;

          const { category } = subCategory;

          return {
            id,
            name,
            photo,
            subCategory: {
              id: subCategory.id,
              name: subCategory.name,
            },
            category: {
              id: category.id,
              name: category.name,
            },
          };
        },
      );
    }
    dispatch(updateTableData(res));
  });
};
