import { useProductSelector } from "@/lib/product/hooks";
import { tabKeys } from "@/lib/product/slices/component-details.slice";
import { Tooltip } from "@nextui-org/react";
import { bodyState, MainModalContext } from "../../../helper";
import { VscFilterFilled } from "react-icons/vsc";
import { useContext } from "react";
import { MdDetails } from "react-icons/md";

export const ItemToolTip = () => {
  const tab = useProductSelector((state) => state.componentDetails.tab);
  const mainState = useContext(MainModalContext);
  if (!mainState) return null;
  const { config, setMainData } = mainState;
  return (
    <>
      {tab === tabKeys.items && (
        <Tooltip
          color="secondary"
          showArrow={true}
          content={`View ${config.bodyState === bodyState.itemFilters ? "main details" : "item filters"}`}
        >
          <span>
            {config.bodyState === bodyState.itemFilters ? (
              <MdDetails
                onClick={() => {
                  setMainData("bodyState")(bodyState.details);
                }}
                className="cursor-pointer"
              />
            ) : (
              <VscFilterFilled
                onClick={() => {
                  setMainData("bodyState")(bodyState.itemFilters);
                }}
                className="cursor-pointer"
              />
            )}
          </span>
        </Tooltip>
      )}
    </>
  );
};
