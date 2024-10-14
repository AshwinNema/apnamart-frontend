import { ProfileDispatch } from "@/lib/profile/store";
import {
  nextHandlerDetails,
  prevStepHandler,
  stepList,
  stepValidator,
} from ".";
import { errorToast } from "@/app/_utils";
import { setMerchantDetails } from "@/lib/profile/slices/merchant-details.slice";
import { MainProfileStateContextInterface } from "@/app/profile/utils";

// Cases:
// 1. User is going backward from current tab,
// 2. We are moving forward from the current step, then we should check if
//    2.1 If the data present in the current tab is correct or not. All the other tab behind have valid data and
//        all the steps that have been completed have valid data. Hence this current tab which is on needs to be valdated before
//        moving any step forward
//    2.2. We can only move 1 step forward from the last completed step, if user tries to move beyond this last step , this is not allowed
export const stepperIconClickHandler = (
  dispatch: ProfileDispatch,
  allDetails: nextHandlerDetails,
  {
    nextStep,
    currentStep,
    totalCompletedSteps,
  }: {
    currentStep: number;
    totalCompletedSteps: number;
    nextStep: number;
  },
  context: MainProfileStateContextInterface | null,
) => {
  const file = context?.config?.businessRegistrationFile?.cachedFileArray?.[0];
  const isMovingBackward = nextStep < currentStep;
  if (isMovingBackward) {
    prevStepHandler(
      { currentStep, nextStep, totalCompletedSteps },
      allDetails,
      dispatch,
    );
    return;
  }
  const isSkippingSteps = Math.max(0, totalCompletedSteps - 1) + 1;
  if (nextStep > isSkippingSteps) {
    errorToast({
      msg: (
        <p>
          Skipping steps is not allowed. Please complete all the data in{" "}
          <span className="font-bold">{stepList[totalCompletedSteps]}</span> tab
          first, before moving forward
        </p>
      ),
    });
    return;
  }
  const stepKey = stepList[currentStep];
  const { error } = stepValidator(stepKey, allDetails, file, true);
  if (error) return;
  const newTotalCompletedSteps = Math.max(totalCompletedSteps, nextStep);
  dispatch(
    setMerchantDetails({
      currentStep: nextStep,
      totalCompletedSteps: newTotalCompletedSteps,
    }),
  );
};
