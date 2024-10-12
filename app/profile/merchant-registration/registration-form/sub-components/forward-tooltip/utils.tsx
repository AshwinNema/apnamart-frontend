import { stepIcons, stepList } from "../../utils";

export const getToolTipContent = (currentStep: number, id?: number) => {
  const isLastStep = currentStep >= stepList.length - 1;
  const nextStepLabel = stepList[currentStep + 1];
  return (
    <>
      {isLastStep ? (
        <p>Click below to {id ? "update" : "register"} on the platform</p>
      ) : (
        <div className="inline-block align-middle">
          Please click below to go to{" "}
          <span className="inline-block align-middle mx-1 scale-[1.3]">
            {stepIcons[nextStepLabel]}
          </span>
          <span className="font-bold"> {nextStepLabel}</span>{" "}
        </div>
      )}
    </>
  );
};
