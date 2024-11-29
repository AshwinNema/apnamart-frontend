import {
  DatabaseFilterItem,
  DatabaseFilterItemOption,
  MainModalState,
} from "../../interfaces & enums";
import * as _ from "lodash";
// When we get item filters from the api, this function is used to process filters so that they can be stored in the central state of the modal
export const processGetItemFilters = (
  data: DatabaseFilterItem[],
): {
  list: DatabaseFilterItem[];
  filterMap: MainModalState["originalFilterItems"];
} => {
  const allDetails = data.reduce(
    (
      {
        list,
        filterMap,
      }: {
        list: DatabaseFilterItem[];
        filterMap: MainModalState["originalFilterItems"];
      },
      item: DatabaseFilterItem,
    ) => {
      const details = _.pick(item, ["id", "name", "filterType", "options"]);

      const allOptionDetails = details.options.reduce(
        (
          {
            list,
            optionMap,
          }: {
            list: DatabaseFilterItemOption[];
            optionMap: {
              [key: string]: DatabaseFilterItemOption;
            };
          },
          option,
        ) => {
          const optionDetails = _.pick(option, ["id", "name"]);
          list.push(optionDetails);
          optionMap[optionDetails.id] = optionDetails;
          return {
            list,
            optionMap,
          };
        },
        { list: [], optionMap: {} },
      );

      details.options = allOptionDetails.list;
      list.push(details);
      filterMap[details.id] = {
        ...details,
        options: allOptionDetails.optionMap,
      };

      return { list, filterMap };
    },
    {
      list: [],
      filterMap: {},
    },
  );
  return allDetails;
};
