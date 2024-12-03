import { MainContext } from "../../../helpers";
import { useContext } from "react";
import useConfigManager from "./useConfigManager";
import { produce } from "immer";
import { Slider } from "@nextui-org/react";

export const PriceFilter = () => {
  const [config, setSelectMinMaxPrice] = useConfigManager();
  const context = useContext(MainContext);
  if (!context) return null;
  const priceFilter = context.config.priceFilter;
  const priceFilterLength = priceFilter?.options?.length;
  const { minMaxVal } = config;
  return (
    <>
      {!!priceFilterLength && (
        <div>
          <div className="flex justify-between text-xs font-semibold mb-3">
            <span>PRICE</span>
            {!(minMaxVal[0] === 0 && minMaxVal[1] === 100) && (
              <span
                onClick={() => {
                  setSelectMinMaxPrice([0, 100]);
                }}
                className="text-primary cursor-pointer"
              >
                CLEAR
              </span>
            )}
          </div>
          <Slider
            aria-label="Price Filter"
            showSteps={true}
            minValue={0}
            maxValue={100}
            defaultValue={config.minMaxVal}
            value={config.minMaxVal}
            onChange={(val) => {
              setSelectMinMaxPrice(val as [number, number]);
            }}
            size="sm"
            step={100 / (priceFilter?.options?.length || 1)}
          />
          <div className="flex justify-between gap-3 items-center mt-3">
            <select
              value={`${context.config.minPriceId}`}
              onChange={(e) => {
                context.setConfig(
                  produce((draft) => {
                    draft.minPriceId = e.target.value;
                  }),
                );
              }}
              className="border-styledBorder border-solid border-[1px] focus:border-styledBorder focus:border-solid focus:border-[1px] outline-none w-full text-[14px]"
            >
              {config.minPriceList.map((option) => {
                return (
                  <option key={option.key} value={option.key}>
                    {option.label}
                  </option>
                );
              })}
            </select>
            <span className="text-leadText">to</span>
            <select
              value={`${context.config.maxPriceId}`}
              onChange={(e) => {
                context.setConfig(
                  produce((draft) => {
                    draft.maxPriceId = e.target.value;
                  }),
                );
              }}
              className="border-styledBorder border-solid border-[1px] focus:border-styledBorder focus:border-solid focus:border-[1px] outline-none w-full text-[14px]"
            >
              {config.maxPriceList.map((option) => {
                return (
                  <option key={option.key} value={option.key}>
                    {option.label}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      )}
    </>
  );
};
