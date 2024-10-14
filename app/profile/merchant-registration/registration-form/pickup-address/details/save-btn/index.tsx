import { IoSaveSharp } from "react-icons/io5";
import {
  nxtSaveBtnState,
  step2Details,
  validatePickUpAddress,
} from "../../../utils";
import { useProfileDispatch, useProfileSelector } from "@/lib/profile/hooks";
import { setMerchantDetails } from "@/lib/profile/slices/merchant-details.slice";
import { ToolTipBtn } from "@/app/_custom-components";
import { useState } from "react";
import { infoToast } from "@/app/_utils";
import { getSavingInfoContent, SuccessToolTipContent } from "./sub-components";
import { merchantRegistrationStatus } from "@/lib/main/slices/user/user.slice";

export const DrawerSaveBtn = ({
  config: allDetails,
  onOpenChange,
}: {
  config: step2Details;
  onOpenChange: () => void;
}) => {
  const dispatch = useProfileDispatch();
  const merchantId = useProfileSelector((state) => state.merchantDetails.id);
  const registrationStatus = useProfileSelector(
    (state) => state.merchantDetails.registrationStatus,
  );
  const underAdminReview =
    registrationStatus === merchantRegistrationStatus.adminReview;
  const reviewByAdminMsg =
    "Your profile is curerntly been reviewed by admin after that you will be able to update all the details";
  const [config, setConfig] = useState<nxtSaveBtnState>({
    toolTipMsg: "",
    toolTipColor: "default",
  });

  const updateTooltipState = () => {
    if (underAdminReview) {
      setConfig({
        toolTipColor: "secondary",
        toolTipMsg: reviewByAdminMsg,
      });
      return;
    }
    const { error, errMsg } = validatePickUpAddress(allDetails);
    if (error) {
      setConfig((prevConfig) => {
        prevConfig.toolTipColor = "danger";
        prevConfig.toolTipMsg = errMsg;
        return {
          ...prevConfig,
        };
      });
      return;
    }

    setConfig((prevConfig) => {
      prevConfig.toolTipColor = "secondary";
      prevConfig.toolTipMsg = <SuccessToolTipContent />;
      return { ...prevConfig };
    });
  };
  return (
    <div className="flex justify-end">
      <ToolTipBtn
        buttonProps={{
          className: "mt-3",
          startContent: <IoSaveSharp />,
          onPress: () => {
            if (underAdminReview) {
              infoToast({
                msg: reviewByAdminMsg,
              });
              return;
            }
            const { error, data } = validatePickUpAddress(allDetails, true);
            if (error) {
              return;
            }
            dispatch(setMerchantDetails(data));
            infoToast({
              msg: (
                <div className="align-middle inline-block">
                  Please click on {getSavingInfoContent(merchantId)}
                </div>
              ),
            });
            onOpenChange();
          },
          color: "primary",
        }}
        toolTipProps={{
          color: config.toolTipColor,
          content: config.toolTipMsg,
          onOpenChange: (isOpen: boolean) => {
            isOpen && updateTooltipState();
          },
        }}
      >
        Save
      </ToolTipBtn>
    </div>
  );
};
