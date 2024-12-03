import {
  modalCreateUpdatePayloadParams,
  modalCreateUpdatePayload,
  updateFilter,
} from "../../../interfaces & enums";
import * as _ from "lodash";

// When we process filters for updating items payload, here we process the completely new items
export const processNewFilterItem = (
  item: modalCreateUpdatePayloadParams["config"]["filterItems"][number],
  newFilters: modalCreateUpdatePayload["newFilters"],
) => {
  const options = item.options.map((option) => {
    const optionData = _.omit(option, ["id"]);
    return optionData;
  });
  const data = {
    options,
    ..._.omit(item, ["id", "deletedOptions", "options"]),
  };
  newFilters?.push(data);
};

// For processing filter update
export const getUpdateFilterItem = (
  item: modalCreateUpdatePayloadParams["config"]["filterItems"][number],
  originalFilterItems: modalCreateUpdatePayloadParams["config"]["originalFilterItems"],
): updateFilter => {
  const { id, name, options, deletedOptions, filterType } = item;
  const originalItem = originalFilterItems[id];
  const originalOptionsMap = originalItem.options;
  const { createOptions, updateOptions } = options.reduce(
    (
      {
        createOptions,
        updateOptions,
      }: {
        createOptions: updateFilter["createOptions"];
        updateOptions: updateFilter["updateOptions"];
      },
      option,
    ) => {
      const { id, name } = option;
      switch (typeof id) {
        case "string":
          createOptions?.push({ name });
          break;
        case "number":
          {
            const optiondDetails = originalOptionsMap[id];
            if (optiondDetails.name !== name) {
              updateOptions?.push({
                id,
                name,
              });
            }
          }
          break;
        default:
          break;
      }
      return {
        createOptions,
        updateOptions,
      };
    },
    {
      createOptions: [],
      updateOptions: [],
    },
  );

  const updateItemPayload: updateFilter = {
    id: id as number,
  };

  if (name != originalItem.name) {
    updateItemPayload.name = name;
  }

  if (filterType != originalItem.filterType) {
    updateItemPayload.filterType = filterType;
  }
  if (createOptions?.length) {
    updateItemPayload.createOptions = createOptions;
  }

  if (updateOptions?.length) {
    updateItemPayload.updateOptions = updateOptions;
  }

  if (deletedOptions?.length) {
    updateItemPayload.deleteOptions = deletedOptions.map(({ id }) => id);
  }

  return updateItemPayload;
};
