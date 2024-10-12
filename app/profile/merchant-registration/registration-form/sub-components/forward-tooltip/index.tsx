import { useProfileSelector } from "@/lib/profile/hooks";
import { Tooltip } from "@nextui-org/react";
import { ReactNode, useContext, useState } from "react";
import {
  forwardTooltipProps,
  stepLabels,
  stepList,
  stepValidator,
} from "../../utils";
import { getAddressDrawerBtntext } from "../../pickup-address/details";
import { merchantRegistrationStatus } from "@/lib/main/slices/user/user.slice";
import { MainProfileStateContext } from "@/app/profile/utils";
import { getToolTipContent } from "./utils";

export const ForwardToolTip = ({ children }: { children: ReactNode }) => {
  const merchantDetails = useProfileSelector((state) => state.merchantDetails);
  const { currentStep, registrationStatus } = merchantDetails;

  const [config, setConfig] = useState<forwardTooltipProps>({
    content: null,
    color: "secondary",
  });
  const context = useContext(MainProfileStateContext);
  const currentStepKey = stepList[currentStep];
  const underAdminReview =
    registrationStatus === merchantRegistrationStatus.adminReview;
  const setToolTipContent = () => {
    if (underAdminReview && currentStep === stepList.length - 1) {
      setConfig({
        content: "Your profile is currently being reviewed by admin",
        color: "secondary",
      });
      return;
    }
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
                  {getAddressDrawerBtntext(
                    underAdminReview,
                    merchantDetails.id,
                  )}
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

    setConfig({
      color: "secondary",
      content: getToolTipContent(currentStep, merchantDetails.id),
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
