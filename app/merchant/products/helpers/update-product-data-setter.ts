import {
  descriptionDetails,
  mainConfig,
  setCreateUpdateProductConfig,
} from "./interfaces & enums & constants";
import { produce } from "immer";
import { getItemsList, getProductFiltersList } from "./apis";
import { appEndPoints, setNestedPath } from "@/app/_utils";
import { getItemEntityList, getItemFilters } from "@/app/admin/products/helper";
import * as _ from "lodash";

export const setUpdateProductData = (
  updateData: mainConfig["updateData"],
  setConfig: setCreateUpdateProductConfig,
) => {
  if (!updateData) return;
  getItemEntityList(
    setNestedPath(setConfig)("subCategoryList"),
    appEndPoints.SUB_CATEGORY_LIST,
    {
      categoryId: updateData.item.category.id,
    },
    {
      showLoader: false,
    },
  );
  getItemsList(
    { subCategoryId: updateData.item.subCategory.id },
    setNestedPath(setConfig)("itemList"),
    true,
    { showLoader: false },
  );
  getProductFiltersList(updateData.id, (optionData) => {
    setConfig(
      produce((draft) => {
        draft.selectedOptions = optionData.reduce(
          (
            optionMap: {
              [key: string]: number;
            },
            optionData,
          ) => {
            optionMap[`${optionData.filter.id}`] = optionData.id;
            return optionMap;
          },
          {},
        );
      }),
    );
  });
  getItemFilters(
    updateData.item.id,
    undefined,
    setNestedPath(setConfig)("filterList"),
    true,
    { showLoader: false },
  );
  setConfig(
    produce((draft) => {
      draft.id = updateData.id;
      draft.name = updateData.name;
      draft.price = `${updateData.price}`;
      draft.category = updateData.item.category.name;
      draft.categoryId = updateData.item.category.id;
      draft.item = updateData.item.name;
      draft.itemId = updateData.item.id;
      if (updateData.highlights)
        draft.highlights = produce(updateData.highlights, () => {});

      draft.specificationType =
        typeof updateData.specification === "string" ? "string" : "series";
      draft.specifications = updateData.specification;
      draft.descriptionType =
        typeof updateData?.description?.details === "string"
          ? "string"
          : updateData?.description?.details?.[0]?.photo
            ? "series with images"
            : "series";

      draft.description =
        typeof updateData?.description?.details === "string"
          ? updateData.description.details
          : updateData.description.details.map((stageDetails) => {
              const finalDetails = _.omit(stageDetails, ["photo"]);
              const uploadedImg = stageDetails?.photo;
              return {
                uploadedImg,
                ...finalDetails,
              };
            });
      draft.uploadedImgs = updateData.photos;
      draft.subCategory = updateData.item.subCategory.name;
      draft.subCategoryId = updateData.item.subCategory.id;
    }),
  );
};
