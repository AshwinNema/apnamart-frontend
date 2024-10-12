import {
  newRegistrationDetails,
  subDetailsViewerProps,
  viewRegistrationdDetailsState,
} from "@/app/admin/merchants/helper";
import {
  Modal,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useEffect } from "react";

export const SubDetailsViewer = ({
  details,
  subDetailsType,
  clearSubDetailsType,
}: subDetailsViewerProps) => {
  const { isOpen, onOpenChange, onOpen } = useDisclosure();
  useEffect(() => {
    if (!subDetailsType) return;
    onOpen();
  }, [subDetailsType, onOpen]);
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={(isOpen: boolean) => {
        if (!isOpen) clearSubDetailsType();
        onOpenChange();
      }}
      classNames={{
        header: ["flex", "justify-center", "font-bold"],
      }}
    >
      <ModalContent>
        <ModalHeader>
          {subDetailsType === "address details"
            ? "Address Details"
            : "Business Location"}
        </ModalHeader>
      </ModalContent>
    </Modal>
  );
};
