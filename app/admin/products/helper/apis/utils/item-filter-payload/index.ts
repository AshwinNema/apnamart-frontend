import { tabKeys } from "@/lib/product/slices/component-details.slice";
import {
  modalCreateUpdatePayload,
  modalCreateUpdatePayloadParams,
} from "../../../interfaces & enums";
import * as _ from "lodash";
import { getUpdateFilterItem, processNewFilterItem } from "./helpers";

// When we are updating an item entity, we process the item filters here as per api payload
export const processUpdateItemFilterPayload = (
  params: modalCreateUpdatePayloadParams,
): Partial<modalCreateUpdatePayload> => {
  const {
    tab,
    config: { id, deletedOriginalItems, filterItems, originalFilterItems },
  } = params;
  const finalItemUpdatePayload: Partial<modalCreateUpdatePayload> = {};
  if (!id || tab !== tabKeys.items) return finalItemUpdatePayload;

  const deleteFilters = deletedOriginalItems.map((item) => item.id);

  const { newFilters, updateFilters } = filterItems.reduce(
    (
      {
        newFilters,
        updateFilters,
      }: {
        newFilters: modalCreateUpdatePayload["newFilters"];
        updateFilters: modalCreateUpdatePayload["updateFilters"];
      },
      item,
    ) => {
      switch (typeof item.id) {
        case "string":
          processNewFilterItem(item, newFilters);
          break;

        case "number":
          {
            const updateFilterPayload = getUpdateFilterItem(
              item,
              originalFilterItems,
            );
            if (Object.keys(updateFilterPayload).length > 1) {
              updateFilters?.push(updateFilterPayload);
            }
          }

          break;

        default:
          break;
      }

      return { newFilters, updateFilters };
    },
    {
      newFilters: [],
      updateFilters: [],
    },
  );

  if (deleteFilters.length) {
    finalItemUpdatePayload.deleteFilters = deleteFilters;
  }

  if (newFilters?.length) {
    finalItemUpdatePayload.newFilters = newFilters;
  }

  if (updateFilters?.length) {
    finalItemUpdatePayload.updateFilters = updateFilters;
  }

  return finalItemUpdatePayload;
};
