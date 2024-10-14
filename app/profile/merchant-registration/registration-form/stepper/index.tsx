import { useProfileSelector } from "@/lib/profile/hooks";
import { ComponentSkeleton, Stepper } from "@/app/_custom-components";
import useStepperState from "./useStepperState";
import { BankAndTaxDetails } from "../bank-and-tax-details";
import dynamic from "next/dynamic";
import BusinessOverview from "../business-overview";
import { GoBackIcon, GoForwardIcon } from "../sub-components";
import { stepIcons, stepLabels, stepList } from "../utils";

export const stepperLastBtnText = (id?: number) => {
  return id ? "Update details" : "Register";
};

// Note - if you want to change the steps here. Its pretty simple only 2 things here
// 1. getContent - for resetting their postions
// 2. nextStepErrs - for configuring errors for jumping to the next step
// 3. stepList - this is present in app/profile/merchant-registration/utils/interfaces & validations/index.ts. It contains all the labels for the stepper
// 4. stepIcons - this is similar to 3.
export const StepperComponent = () => {
  const [steps, handleStepClick] = useStepperState();
  const currentStep = useProfileSelector(
    (state) => state.merchantDetails.currentStep,
  );
  const totalCompletedSteps = useProfileSelector(
    (state) => state.merchantDetails.totalCompletedSteps,
  );

  const getContent = (index: number) => {
    switch (index) {
      case 0: {
        return <BusinessOverview />;
      }
      case 1:
        return <BankAndTaxDetails />;
      case 2: {
        const PickUpAddress = dynamic(() => import("../pickup-address"), {
          ssr: false,
          loading: () => <ComponentSkeleton />,
        });
        return <PickUpAddress />;
      }
      default:
        return <></>;
    }
  };

  return (
    <Stepper
      steps={steps}
      currentStepIndex={currentStep}
      onStepClick={handleStepClick}
      totalCompletedSteps={totalCompletedSteps}
      orientation="horizontal"
      labelPosition="bottom"
      forwardStepsAllowed={1}
      stepContent={(_: object, index: number) => {
        return (
          <div>
            <div className="flex justify-between">
              <div>
                <GoBackIcon />
              </div>
              <div>
                <GoForwardIcon />
              </div>
            </div>
            {getContent(index)}
          </div>
        );
      }}
      nextStepErrs={[
        <>
          <p>
            Please fill in details first and click on{" "}
            <span className="font-bold">Next</span> to go to the next step
          </p>
          <p>
            <span className="font-bold">Note </span> - You can also go to the
            next steps by clicking on the icon{" "}
            <span className="font-bold">{stepLabels.bankDetails}</span> if you
            have filled all the details
          </p>
        </>,
      ]}
      stepIcons={stepList.map((step) => {
        return <>{stepIcons[step]}</>;
      })}
    />
  );
};
