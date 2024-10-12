import { useProfileDispatch, useProfileSelector } from "@/lib/profile/hooks";
import { useContext, useMemo } from "react";
import { stepList, stepperIconClickHandler } from "../utils";
import { stepperProps } from "@/app/_custom-components/stepper/utils";
import { MainProfileStateContext } from "@/app/profile/utils";

export default function useStepperState(): [
  stepperProps["steps"],
  stepperProps["onStepClick"],
] {
  const totalCompletedSteps = useProfileSelector(
    (state) => state.merchantDetails.totalCompletedSteps,
  );
  const currentStep = useProfileSelector(
    (state) => state.merchantDetails.currentStep,
  );

  const steps = useMemo(
    () =>
      stepList.map((stepName: string, index: number) => {
        return {
          stepLabel: stepName,
          completed: totalCompletedSteps > index,
        };
      }),
    [totalCompletedSteps, currentStep],
  );

  const dispatch = useProfileDispatch();
  const id = useProfileSelector((state) => state.merchantDetails.id);
  const name = useProfileSelector((state) => state.merchantDetails.name);
  const description = useProfileSelector(
    (state) => state.merchantDetails.description,
  );
  const bankAcNo = useProfileSelector(
    (state) => state.merchantDetails.bankAcNo,
  );
  const gstIn = useProfileSelector((state) => state.merchantDetails.gstIn);
  const panCard = useProfileSelector((state) => state.merchantDetails.panCard);
  const addressLine1 = useProfileSelector(
    (state) => state.merchantDetails.addressLine1,
  );
  const addressLine2 = useProfileSelector(
    (state) => state.merchantDetails.addressLine2,
  );
  const pinCode = useProfileSelector((state) => state.merchantDetails.pinCode);

  const context = useContext(MainProfileStateContext);
  const handleStepClick = (stepObject: object, index: number) => {
    stepperIconClickHandler(
      dispatch,
      {
        name,
        description,
        bankAcNo,
        gstIn,
        panCard,
        id,
        addressLine1,
        addressLine2,
        pinCode,
      },
      {
        nextStep: index,
        currentStep,
        totalCompletedSteps,
      },
      context,
    );
  };

  return [steps, handleStepClick];
}
