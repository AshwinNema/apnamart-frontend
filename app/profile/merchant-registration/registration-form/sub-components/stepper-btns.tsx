import {
  createUpdateRegistration,
  immediateNextStepHandler,
  prevStepHandler,
  stepList,
} from "../utils";
import { useProfileDispatch, useProfileSelector } from "@/lib/profile/hooks";
import { ReactNode, useContext } from "react";
import { ForwardToolTip } from "./forward-tooltip";
import { Button } from "@nextui-org/react";
import { BackwardToolTip } from "./stepper-arrows";
import { MainProfileStateContext } from "@/app/profile/utils";
import { stepperLastBtnText } from "../stepper";

export const StepperNextBtn = () => {
  const merchantDetails = useProfileSelector((state) => state.merchantDetails);
  const { currentStep, id, totalCompletedSteps } = merchantDetails;
  const saveBtnText = stepperLastBtnText(id) as ReactNode;
  const dispatch = useProfileDispatch();
  const context = useContext(MainProfileStateContext);
  if (!context) return null;
  const file = context.config.businessRegistrationFile?.cachedFileArray?.[0];
  const isLastStep = currentStep >= stepList.length - 1;
  return (
    <>
      <ForwardToolTip>
        <Button
          color={isLastStep ? "success" : "primary"}
          variant="flat"
          onPress={() => {
            isLastStep
              ? createUpdateRegistration(
                  merchantDetails,
                  dispatch,
                  context.config.businessRegistrationFile?.cachedFileArray[0],
                )
              : immediateNextStepHandler(
                  { currentStep, totalCompletedSteps },
                  merchantDetails,
                  dispatch,
                  file,
                );
          }}
        >
          {isLastStep ? saveBtnText : "Next"}
        </Button>
      </ForwardToolTip>
    </>
  );
};

export const StepperBackBtn = () => {
  const dispatch = useProfileDispatch();
  const merchantDetails = useProfileSelector((state) => state.merchantDetails);
  const { currentStep, totalCompletedSteps } = merchantDetails;
  const isStart = currentStep <= 0;

  if (isStart) return null;
  return (
    <>
      <BackwardToolTip>
        <Button
          variant="flat"
          onPress={() => {
            prevStepHandler(
              { currentStep, nextStep: currentStep - 1, totalCompletedSteps },
              merchantDetails,
              dispatch,
            );
          }}
        >
          Prev
        </Button>
      </BackwardToolTip>
    </>
  );
};
