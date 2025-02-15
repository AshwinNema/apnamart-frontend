import {
  subDetails,
  subDetailsViewerProps,
} from "@/app/admin/merchants/helper";
import {
  Card,
  CardBody,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
import { useEffect } from "react";
import { ComponentSkeleton } from "@/app/_custom-components";
import dynamic from "next/dynamic";

export const SubDetailsViewer = ({
  details,
  subDetailsType,
  clearSubDetailsType,
  address,
}: subDetailsViewerProps) => {
  const { isOpen, onOpenChange, onOpen } = useDisclosure();
  useEffect(() => {
    if (!subDetailsType) return;
    onOpen();
  }, [subDetailsType, onOpen]);

  const isAddressModal = subDetailsType === subDetails.addressDetails;
  const AddressDetailsTable = dynamic(
    () => import("./sub-components").then((mod) => mod.AddressDetailsTable),
    {
      ssr: false,
      loading: () => <ComponentSkeleton />,
    },
  );
  const BusinessLocation = dynamic(
    () => import("./sub-components").then((mod) => mod.BusinessLocation),
    {
      ssr: false,
      loading: () => <ComponentSkeleton />,
    },
  );

  return (
    <Modal
      placement="center"
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
          {isAddressModal ? "Address Details" : "Business location"}
        </ModalHeader>
        <ModalBody>
          {isAddressModal ? (
            <AddressDetailsTable details={details} />
          ) : (
            <>
              <Card className="my-3 min-h-20">
                <CardBody>
                  <p>{address}</p>
                </CardBody>
              </Card>
              <BusinessLocation details={details} />
            </>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
