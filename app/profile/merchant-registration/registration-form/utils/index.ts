import * as _ from "lodash";
import { ProfileDispatch } from "@/lib/profile/store";
import { setMerchantDetails } from "@/lib/profile/slices/merchant-details.slice";
import styles from "@/app/styles.module.css";
import {
  commonTextInputProps,
  nextHandlerDetails,
  stepList,
} from "./interfaces & validations";
import { stepValidator } from "./step-validator";
import { errorToast } from "@/app/_utils";
export * from "./apis";
export * from "./validate-steps";
export * from "./step-validator";
export * from "./interfaces & validations";
export * from "./stepper-icon-click-handler";

// When moving to the adjacent neighbouring next step, ensures that the details for the current step are filled. After this the step will be marked as completed.
export const immediateNextStepHandler = (
  {
    currentStep,
    totalCompletedSteps,
  }: {
    currentStep: number;
    totalCompletedSteps: number;
  },
  allDetails: nextHandlerDetails,
  dispatch: ProfileDispatch,
  file?: File,
) => {
  const onLastStep = currentStep >= stepList.length - 1;
  if (onLastStep) {
    errorToast({
      msg: "Cannot go beyond last step in the stepper",
    });
    return;
  }
  const newTotalSteps = Math.max(totalCompletedSteps, currentStep + 1);
  const stepkey = stepList[currentStep];
  const { error } = stepValidator(stepkey, allDetails, file, true);

  if (error) return;

  dispatch(
    setMerchantDetails({
      currentStep: currentStep + 1,
      totalCompletedSteps: newTotalSteps,
    }),
  );
};
// When we are trying to move back to a previous step to edit details, checks whether we are able to do that and stepper goes to that step
// Note here in the validation we do not have file as an arguement because file is in the first step i.e. 0 th stepper going backward from 0th Stepper is not possible. Hence file is not required
export const prevStepHandler = (
  {
    currentStep,
    nextStep,
    totalCompletedSteps,
  }: { currentStep: number; nextStep: number; totalCompletedSteps: number },
  details: nextHandlerDetails,
  dispatch: ProfileDispatch,
) => {
  const lastStep = stepList.length - 1;
  const isLastStep = currentStep === lastStep;
  // nextStep > currentStep - means someone is moving forward which is wrong for this function
  const invalidStep =
    nextStep < 0 || nextStep > currentStep || nextStep >= lastStep;
  if (invalidStep) return;
  // This means that the current step has been marked as completed, so if we are moving backward from this step, we have to validated details here are correct(if they are edited) and there are issues with the data, then we should not allow moving backwards
  // !isLastStep - means that it should not be the last step of the stepper, this condition is necessary because when merchant details data gets created for the first time, then total completed steps becomes equal to the length of the stepper, even if we go back from this step, then also it will not have any negative effect becuase all the details will be validated after the stepper gets submitted
  if (totalCompletedSteps > currentStep && !isLastStep) {
    const stepKey = stepList[currentStep];
    const { error } = stepValidator(stepKey, details, undefined, true);
    if (error) return;
  }

  dispatch(
    setMerchantDetails({
      currentStep: nextStep,
    }),
  );
};

export const textInputProps: commonTextInputProps = Object.freeze({
  isRequired: true,
  fullWidth: true,
  labelPlacement: "outside-left",
  classNames: {
    base: ["mb-3", styles["merchant-registration-inputs"]],
    mainWrapper: ["w-full"],
  },
});
