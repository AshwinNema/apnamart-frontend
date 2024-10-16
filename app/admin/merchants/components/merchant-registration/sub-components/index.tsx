import { Button } from "@nextui-org/react";
import { FcApproval } from "react-icons/fc";
import {
  merchantRegistrationSubComponentProps,
  newRegistrationDetails,
} from "../../../helper/interfaces & enums & constants/merchant-registration";
import { merchantRegistrationStatus } from "@/lib/main/slices/user/user.slice";
import { approveMerchantRegistration } from "../apis";
export * from "./main-table";
export * from "./selected-registration";

export const ApproveRegistrationBtn = <
  T extends object,
  V extends { page: number },
>({
  details,
  onApprove,
  config,
  getData,
}: {
  details: newRegistrationDetails;
  onApprove?: () => void;
  config: V;
  getData: merchantRegistrationSubComponentProps<T>["getData"];
}) => {
  if (details.registrationStatus !== merchantRegistrationStatus.adminReview) {
    return null;
  }

  const { page } = config;
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
