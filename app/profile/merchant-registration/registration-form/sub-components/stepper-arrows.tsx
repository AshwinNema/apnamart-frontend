import { useProfileDispatch, useProfileSelector } from "@/lib/profile/hooks";
import { Tooltip } from "@nextui-org/react";
import { ForwardToolTip } from "./forward-tooltip";
import {
  immediateNextStepHandler,
  prevStepHandler,
  stepIcons,
  stepList,
} from "../utils";
import { ReactNode, useContext } from "react";
import { MainProfileStateContext } from "@/app/profile/utils";
import { BackIcon, ForwardIcon } from "@/app/_custom-components";

export const BackwardToolTip = ({ children }: { children: ReactNode }) => {
  const currentStep = useProfileSelector(
    (state) => state.merchantDetails.currentStep,
  );

  const isOutOfBounds = currentStep <= 0 || currentStep >= stepList.length;
  if (isOutOfBounds) return null;

  const getContent = () => {
    const prevStepLabel = stepList[currentStep - 1];
    return (
      <div className="inline-block align-middle">
        Go back to{" "}
        <span className="inline-block align-middle mx-1 scale-[1.3]">
          {stepIcons[prevStepLabel]}
        </span>{" "}
        <span className="font-bold">{prevStepLabel}</span> section
      </div>
    );
  };

  return (
    <Tooltip color="secondary" content={getContent()}>
      {children}
    </Tooltip>
  );
};

export const GoBackIcon = () => {
  const dispatch = useProfileDispatch();
  const merchantDetails = useProfileSelector((state) => state.merchantDetails);
  const { currentStep, totalCompletedSteps } = merchantDetails;
  if (!currentStep) return null;

  return (
    <BackwardToolTip>
      <span className="relative">
        <BackIcon
          onClick={() => {
            prevStepHandler(
              { currentStep, nextStep: currentStep - 1, totalCompletedSteps },
              merchantDetails,
              dispatch,
            );
          }}
        />
      </span>
    </BackwardToolTip>
  );
};

export const GoForwardIcon = () => {
  const dispatch = useProfileDispatch();
  const merchantDetails = useProfileSelector((state) => state.merchantDetails);
  const { currentStep, totalCompletedSteps } = merchantDetails;
  const context = useContext(MainProfileStateContext);
  const isOutOfBounds = currentStep < 0 || currentStep >= stepList.length - 1;
  if (isOutOfBounds || !context) return null;

  return (
    <ForwardToolTip>
      <span className="relative">
        <ForwardIcon
          onClick={() => {
            immediateNextStepHandler(
              { currentStep, totalCompletedSteps },
              merchantDetails,
              dispatch,
              context?.config?.businessRegistrationFile?.cachedFileArray?.[0],
            );
          }}
        />
      </span>
    </ForwardToolTip>
  );
};
