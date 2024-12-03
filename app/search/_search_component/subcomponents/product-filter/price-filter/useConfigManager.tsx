import {
  getDefaultPriceFilterConfig,
  MainContext,
  priceFilterConfig,
  handleMinPriceChange,
  handleMaxPriceChange,
} from "../../../helpers";
import { useContext, useEffect, useState } from "react";
import { produce } from "immer";

const useConfigManager = (): [
  priceFilterConfig,
  (val: [number, number]) => void,
] => {
  const context = useContext(MainContext);
  const [config, setConfig] = useState<priceFilterConfig>(
    getDefaultPriceFilterConfig(),
  );

  useEffect(() => {
    if (!context) return;
    !context?.config?.priceFilter &&
      setConfig(
        produce((draft) => {
          draft.maxPriceList = [];
          draft.minPriceList = [];
        }),
      );

    context.setConfig(
      produce((draft) => {
        const options = draft.priceFilter?.options || [];
        const lastOption = options.length - 1;
        draft.maxPriceId = options[lastOption]?.id || "max";
      }),
    );
  }, [context?.config?.priceFilter]);

  useEffect(() => {
    if (!context?.config?.maxPriceId || !context?.config?.priceFilter) return;
    handleMaxPriceChange(
      context?.config?.maxPriceId,
      context?.config?.priceFilter?.options,
      setConfig,
    );
  }, [context?.config?.maxPriceId, !context?.config?.priceFilter]);

  useEffect(() => {
    if (!context?.config?.minPriceId || !context?.config?.priceFilter) return;
    handleMinPriceChange(
      context?.config?.minPriceId,
      context?.config?.priceFilter?.options,
      setConfig,
    );
  }, [context?.config?.minPriceId, !context?.config?.priceFilter]);

  const setSelectMinMaxPrice = (val: [number, number]) => {
    const areMinMaxSame = val[0] === val[1];
    if (!context?.config?.priceFilter || areMinMaxSame) return;
    const { priceFilter } = context?.config;
    const { options } = priceFilter;
    const totalSteps = priceFilter?.options?.length || 1;
    const minPriceIndex = Math.floor((val[0] * totalSteps) / 100) - 1;
    const maxPriceIndex = Math.floor((val[1] * totalSteps) / 100) - 1;

    const minPriceOption = options.find((_, index) => index === minPriceIndex);
    const maxPriceOption = options.find((_, index) => index === maxPriceIndex);
    context.setConfig(
      produce((draft) => {
        draft.minPriceId = minPriceOption?.id || "min";
        draft.maxPriceId = maxPriceOption?.id || "max";
      }),
    );
    setConfig(
      produce((draft) => {
        draft.minMaxVal = val;
      }),
    );
  };

  return [config, setSelectMinMaxPrice];
};

export default useConfigManager;
