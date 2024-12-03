import { CardHeader, Chip } from "@nextui-org/react";
import { useContext, useEffect, useState } from "react";
import { isPriceFilterSelected, MainContext } from "../../../helpers";
import { produce } from "immer";
import { RxCross2 } from "react-icons/rx";

export const FilterHeader = () => {
  const [config, setConfig] = useState({
    showClearAll: false,
  });
  const context = useContext(MainContext);
  const { priceFilter, minPriceId, maxPriceId } = context?.config || {};
  const selectedOptions = context?.config?.selectedOptions || {};
  const optionLength = Object.keys(selectedOptions).length;

  useEffect(() => {
    if (!priceFilter || !minPriceId || !maxPriceId) return;

    setConfig(
      produce((draft) => {
        draft.showClearAll =
          isPriceFilterSelected(priceFilter?.options, minPriceId, maxPriceId) ||
          !!optionLength;
      }),
    );
  }, [minPriceId, maxPriceId, priceFilter, optionLength]);
  if (!context) return null;
  return (
    <>
      <CardHeader>
        <div
          className={`text-lg flex justify-between font-medium w-full items-center`}
        >
          <div>Filters</div>
          {config.showClearAll && (
            <div
              onClick={() => {
                const lastOption = (priceFilter?.options?.length || 1) - 1;
                context.setConfig(
                  produce((draft) => {
                    draft.selectedOptions = {};
                    draft.minPriceId = "min";
                    draft.maxPriceId =
                      priceFilter?.options?.[lastOption]?.id || "max";
                  }),
                );
              }}
              className="text-primary text-sm cursor-pointer"
            >
              Clear All
            </div>
          )}
        </div>
        <div className="w-full gap-3">
          {Object.keys(selectedOptions).map((selectedOption) => {
            const details = selectedOptions[selectedOption];
            return (
              <Chip
                onClick={() => {
                  context.setConfig(
                    produce((draft) => {
                      delete draft.selectedOptions[selectedOption];
                    }),
                  );
                }}
                className="mt-3 mr-3 cursor-pointer text-xs"
                startContent={<RxCross2 />}
                key={details.id}
              >
                <span className="hover:line-through">{details.name}</span>
              </Chip>
            );
          })}
        </div>
      </CardHeader>
    </>
  );
};
