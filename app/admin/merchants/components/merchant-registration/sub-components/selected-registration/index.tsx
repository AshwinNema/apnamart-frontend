import { BackIcon, ToolTipBtn } from "@/app/_custom-components";
import { RegistrationDetails } from "./registration-details";
import { Button, Chip } from "@nextui-org/react";
import { ApproveRegistrationBtn } from "..";
import { produce } from "immer";
import { merchantRegistrationStatus } from "@/lib/main/slices/user/user.slice";
import { MdOutlinePending } from "react-icons/md";
import { FcApproval } from "react-icons/fc";
import MerchantAdminChatSupport from "@/app/_shared-Components/chat/merchant-admin-chat";
import {
  getMerchantRegistrationStatusLabel,
  newRegistrationDetails,
  selectedRegistrationProps,
} from "@/app/admin/merchants/helper";

export const SelectedMerchantRegistration = <
  T extends object,
  V extends {
    selectedRegistrationDetails: null | newRegistrationDetails;
    page: number;
  },
>({
  config,
  setConfig,
  getData,
  goBackTooltipText = "Go back to Registration list",
  goBackBtnText = "View All Registrations",
}: selectedRegistrationProps<T, V>) => {
  const details = config?.selectedRegistrationDetails;
  if (!details) return null;
  const underAdminReview =
    details.registrationStatus === merchantRegistrationStatus.adminReview;
  const goBack = () => {
    setConfig(
      produce((draft: any) => {
        draft.selectedRegistrationDetails = null;
      }),
    );
  };

  const currentStatus = getMerchantRegistrationStatusLabel(
    details?.registrationStatus,
    !!details?.isMerchantBlocked,
  );
  if (!config.selectedRegistrationDetails) return null;
  return (
    <>
      <div className="mb-4 flex justify-between">
        <ToolTipBtn
          toolTipProps={{
            content: <p>{goBackTooltipText}</p>,
            color: "secondary",
          }}
          buttonProps={{
            className: "bg-transparent",
          }}
        >
          <BackIcon onClick={goBack} />
        </ToolTipBtn>
        <Chip
          classNames={{
            base: ["scale-y-[1.2]"],
            content: ["font-bold"],
          }}
          variant="bordered"
          color="primary"
          endContent={underAdminReview ? <MdOutlinePending /> : <FcApproval />}
        >
          <span className="font-bold">Current Status</span> - {currentStatus}
        </Chip>
      </div>
      <RegistrationDetails details={config.selectedRegistrationDetails} />

      <div className="flex justify-between mt-6">
        <Button onPress={goBack} variant="ghost">
          {goBackBtnText}
        </Button>
        <ApproveRegistrationBtn
          details={config.selectedRegistrationDetails}
          onApprove={() => {
            setConfig(
              produce((draft: any) => {
                if (draft.selectedRegistrationDetails) {
                  draft.selectedRegistrationDetails.registrationStatus =
                    merchantRegistrationStatus.completed;
                }
              }),
            );
          }}
          config={config}
          getData={getData}
        />
      </div>
      <MerchantAdminChatSupport
        merchantRegistrationId={config.selectedRegistrationDetails.id}
        merchantId={config?.selectedRegistrationDetails?.user?.id}
      />
    </>
  );
};
