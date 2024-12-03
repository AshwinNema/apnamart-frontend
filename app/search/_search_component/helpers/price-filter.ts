import {
  itemFilter,
  mainConfig,
  priceFilter,
  setMainConfig,
  setPriceFilterConfig,
} from "./interfaces & constants & enums";
import { produce } from "immer";

export const handleMaxPriceChange = (
  maxPriceId: string | number,
  options: itemFilter["options"],
  setConfig: setPriceFilterConfig,
) => {
  const maxPriceIndex = options.findIndex(
    (item) => `${item.id}` === `${maxPriceId}`,
  );

  const selectList = options.reduce(
    (list: { label: string; key: number | string }[], option, index) => {
      if (index < maxPriceIndex) {
        list.push({
          label: option.name,
          key: option.id,
        });
      }
      return list;
    },
    [{ key: "min", label: "Min" }],
  );

  setConfig(
    produce((draft) => {
      draft.minPriceList = selectList;
      draft.minMaxVal[1] = ((maxPriceIndex + 1) / options.length) * 100;
    }),
  );
};

export const handleMinPriceChange = (
  minPriceId: string | number,
  options: itemFilter["options"],
  setConfig: setPriceFilterConfig,
) => {
  const minPriceIndex = options.findIndex(
    (item) => `${item.id}` === `${minPriceId}`,
  );
  const selectList = options.reduce(
    (list: { label: string; key: number | string }[], option, index) => {
      if (index > minPriceIndex) {
        list.push({
          label: option.name,
          key: option.id,
        });
      }
      return list;
    },
    [],
  );
  setConfig(
    produce((draft) => {
      draft.maxPriceList = selectList;
      draft.minMaxVal[0] = ((minPriceIndex + 1) / options.length) * 100;
    }),
  );
};

export const setMinMaxPriceId = (
  val: [number, number],
  totalSteps: number,
  options: priceFilter["options"],
  setConfig: setMainConfig,
) => {
  const minPriceIndex = Math.floor((val[0] * totalSteps) / 100) - 1;
  const maxPriceIndex = Math.floor((val[1] * totalSteps) / 100) - 1;
  const minPriceOption = options.find((_, index) => index === minPriceIndex);
  const maxPriceOption = options.find((_, index) => index === maxPriceIndex);
  setConfig(
    produce((draft) => {
      draft.minPriceId = minPriceOption?.id || "min";
      draft.maxPriceId = maxPriceOption?.id || "max";
    }),
  );
};

export const isPriceFilterSelected = (
  options: priceFilter["options"],
  minPriceId: mainConfig["minPriceId"],
  maxPriceId: mainConfig["maxPriceId"],
) => {
  const lastOptionIndex = options.length - 1;
  if (
    minPriceId === "min" &&
    (maxPriceId === "max" || maxPriceId === options?.[lastOptionIndex]?.id)
  )
    return false;
  return true;
};
