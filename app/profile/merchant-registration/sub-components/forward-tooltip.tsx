import { useProfileSelector } from "@/lib/profile/hooks";
import { Tooltip, TooltipProps } from "@nextui-org/react";
import { ReactNode, useContext, useState } from "react";
import { stepIcons, stepLabels, stepList, stepValidator } from "../utils";
import { MainProfileStateContext } from "../../utils";

export const ForwardToolTip = ({ children }: { children: ReactNode }) => {
  const merchantDetails = useProfileSelector((state) => state.merchantDetails);
  const { currentStep } = merchantDetails;

  const [config, setConfig] = useState<{
    content: ReactNode;
    color: TooltipProps["color"];
  }>({
    content: null,
    color: "secondary",
  });
  const context = useContext(MainProfileStateContext);
  const currentStepKey = stepList[currentStep];
  const setToolTipContent = () => {
    if (!context) return;
    const { error, errMsg } = stepValidator(
      currentStepKey,
      merchantDetails,
      context.config.businessRegistrationFile?.cachedFileArray?.[0],
    );
    if (error) {
      setConfig({
        content: (
          <>
            {currentStepKey === stepLabels.pickUpAddress && (
              <p className="w-full">
                Please click on{" "}
                <span className="font-bold">
                  Enter complete pick up address details
                </span>{" "}
                and enter information to resolve below issues:
              </p>
            )}
            <p>{errMsg}</p>
          </>
        ),
        color: "danger",
      });
      return;
    }
    const getToolTipContext = () => {
      const isLastStep = currentStep >= stepList.length - 1;
      const nextStepLabel = stepList[currentStep + 1];
      return (
        <>
          {isLastStep ? (
            <p>
              Click below to {merchantDetails.id ? "update" : "register"} on the
              platform
            </p>
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

    setConfig({
      color: "secondary",
      content: getToolTipContext(),
    });
  };

  return (
    <Tooltip
      color={config.color}
      content={config.content}
      onOpenChange={(isOpen) => {
        isOpen && setToolTipContent();
      }}
    >
      {children}
    </Tooltip>
  );
};