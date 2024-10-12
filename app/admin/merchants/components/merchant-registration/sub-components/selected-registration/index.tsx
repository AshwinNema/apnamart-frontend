import { BackIcon, ToolTipBtn } from "@/app/_custom-components";
import { RegistrationDetails } from "./registration-details";
import { useContext } from "react";
import { setNestedPath } from "@/app/_utils";
import { Button, Chip } from "@nextui-org/react";
import { ApproveRegistrationBtn } from "..";
import { MainStateContext } from "../../utils";
import { produce } from "immer";
import { merchantRegistrationStatus } from "@/lib/main/slices/user/user.slice";
import { MdOutlinePending } from "react-icons/md";
import { FcApproval } from "react-icons/fc";
import MerchantAdminChatSupport from "@/app/_shared_Components/chat/merchant-admin-chat";

export const SelectedMerchantRegistration = ({}: {}) => {
  const mainState = useContext(MainStateContext);
  if (!mainState) return null;
  const { config, setConfig } = mainState;
  if (!config.selectedRegistrationDetails) return null;
  const underAdminReview =
    config?.selectedRegistrationDetails.registrationStatus ===
    merchantRegistrationStatus.adminReview;
  const goBack = () =>
    setNestedPath(setConfig)("selectedRegistrationDetails")(null);
  const currentStatus = underAdminReview ? "Under Review" : "Approved";
  return (
    <>
      <div className="mb-4 flex justify-between">
        <ToolTipBtn
          toolTipProps={{
            content: <p>Go back to Registration list</p>,
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
          View All Registrations
        </Button>
        <ApproveRegistrationBtn
          details={config.selectedRegistrationDetails}
          onApprove={() => {
            setConfig(
              produce((draft) => {
                if (draft.selectedRegistrationDetails) {
                  draft.selectedRegistrationDetails.registrationStatus =
                    merchantRegistrationStatus.completed;
                }
              }),
            );
          }}
        />
      </div>
      <MerchantAdminChatSupport
        merchantRegistrationId={config.selectedRegistrationDetails.id}
        merchantId={config?.selectedRegistrationDetails?.user?.id}
      />
    </>
  );
};
