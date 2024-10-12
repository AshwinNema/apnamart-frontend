import { Button } from "@nextui-org/react";
import { FcApproval } from "react-icons/fc";
import { newRegistrationDetails } from "../../../helper/interfaces & enums & constants/merchant-registration";
import { Dispatch, SetStateAction, useContext } from "react";
import { merchantRegistrationStatus } from "@/lib/main/slices/user/user.slice";
import { approveMerchantRegistration } from "../apis";
import { MainStateContext } from "../utils";
export * from "./main-table";
export * from "./selected-registration";

export const ApproveRegistrationBtn = ({
  details,
  onApprove,
}: {
  details: newRegistrationDetails;
  onApprove?: () => void;
}) => {
  if (details.registrationStatus !== merchantRegistrationStatus.adminReview) {
    return null;
  }
  const mainState = useContext(MainStateContext);
  if (!mainState) return null;
  const {
    getData,
    config: { page },
  } = mainState;
  return (
    <Button
      startContent={<FcApproval className="scale-[1.2]" />}
      variant="ghost"
      color="warning"
      onPress={() =>
        approveMerchantRegistration(
          details.id,
          () => {
            getData(page);
          },
          onApprove,
        )
      }
    >
      Approve Registration
    </Button>
  );
};
