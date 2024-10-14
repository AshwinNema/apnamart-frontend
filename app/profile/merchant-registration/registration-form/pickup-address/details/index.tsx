import { Button, useDisclosure } from "@nextui-org/react";
import { BiSolidEditLocation } from "react-icons/bi";
import AddressDrawer from "./drawer";
import { useProfileSelector } from "@/lib/profile/hooks";
import { merchantRegistrationStatus } from "@/lib/main/slices/user/user.slice";

export const getAddressDrawerBtntext = (adminReview: boolean, id?: number) => {
  return adminReview
    ? "Click here to view Pick Up Address Details"
    : id
      ? "Click here to update Pick Up Address Details"
      : "Enter complete pick up Pick Up Address Details";
};

export default function Step2Details() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const registrationStatus = useProfileSelector(
    (state) => state.merchantDetails.registrationStatus,
  );
  const id = useProfileSelector((state) => state.merchantDetails.id);
  return (
    <>
      <div>
        <Button
          variant="bordered"
          onClick={onOpen}
          endContent={<BiSolidEditLocation />}
          className="cursor-pointer p-3"
          color="primary"
          size="sm"
        >
          {getAddressDrawerBtntext(
            registrationStatus === merchantRegistrationStatus.adminReview,
            id,
          )}
        </Button>
      </div>
      <AddressDrawer isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
}
