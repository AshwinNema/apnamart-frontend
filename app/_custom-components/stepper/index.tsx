import StepperComponent from "@keyvaluesystems/react-stepper";
import { stepperProps } from "./utils";
import { mainTheme, successTheme, warningTheme } from "@/constants";
import { errorToast } from "@/app/_utils";
import { FaCentercode } from "react-icons/fa";
import { MdPending } from "react-icons/md";
import { SiTicktick } from "react-icons/si";
// Note : In the onStepClick please make sure to validate the details of the current step and then only allow users to navigate to other steps
export const Stepper = ({
  steps,
  currentStepIndex,
  onStepClick,
  totalCompletedSteps,
  orientation,
  labelPosition,
  stepContent,
  renderNode,
  styles,
  nextStepErrs,
  stepIcons,
  forwardStepsAllowed = 0,
}: stepperProps) => {
  const handleStepClick = (step: object, index: number) => {
    if (index === currentStepIndex) return;
    if (index > totalCompletedSteps + forwardStepsAllowed) {
      const errMsg =
        nextStepErrs?.[currentStepIndex] ||
        "Plase complete previous steps to proceed";
      errorToast({ msg: errMsg });
      return;
    }
    onStepClick && onStepClick(step, index);
  };

  return (
    <StepperComponent
      steps={steps}
      currentStepIndex={currentStepIndex}
      onStepClick={handleStepClick}
      orientation={orientation}
      labelPosition={labelPosition}
      stepContent={stepContent}
      renderNode={(step: object, stepIndex: number) => {
        const icon = stepIcons?.[stepIndex];
        return renderNode ? (
          renderNode(step, stepIndex)
        ) : (
          <>
            {stepIndex === currentStepIndex ? (
              icon ? (
                icon
              ) : (
                <FaCentercode />
              )
            ) : stepIndex >= totalCompletedSteps ? (
              icon ? (
                icon
              ) : (
                <MdPending />
              )
            ) : (
              <SiTicktick />
            )}
          </>
        );
      }}
      styles={{
        ActiveNode: () => ({
          backgroundColor: mainTheme,
        }),
        CompletedNode: (step: object, index: number) => ({
          backgroundColor:
            index === currentStepIndex ? warningTheme : successTheme,
        }),
        LineSeparator: (step: object, index: number) => {
          return {
            backgroundColor: ` #378b29`,
            backgroundImage: `linear-gradient(315deg, #378b29 0%, #74d680 74%)`,
          };
        },
        ...styles,
      }}
    />
  );
};
