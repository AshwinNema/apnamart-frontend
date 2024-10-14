import { SiGooglemybusiness } from "react-icons/si";
import { ForwardToolTip } from "./forward-tooltip";
import { useContext } from "react";
import { createUpdateRegistration } from "../utils";
import { useProfileSelector } from "@/lib/profile/hooks";
import { useProductDispatch } from "@/lib/product/hooks";
import { MainProfileStateContext } from "@/app/profile/utils";

export * from "./stepper-btns";
export * from "./stepper-arrows";
export * from "./forward-tooltip";

export const SaveDetailsIcon = () => {
  const mainContext = useContext(MainProfileStateContext);
  const merchantDetails = useProfileSelector((state) => state.merchantDetails);
  const dispatch = useProductDispatch();
  if (!mainContext) return null;

  return (
    <ForwardToolTip>
      <span>
        <SiGooglemybusiness
          onClick={() => {
            createUpdateRegistration(
              merchantDetails,
              dispatch,
              mainContext.config.businessRegistrationFile?.cachedFileArray[0],
            );
          }}
          className="scale-[1.5] cursor-pointer"
        />
      </span>
    </ForwardToolTip>
  );
};
