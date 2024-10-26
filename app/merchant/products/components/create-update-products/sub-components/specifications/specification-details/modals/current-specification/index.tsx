import {
  currentSpecificationModalProps,
  MainCreateUpdateProductContext,
  openUpdateSpecificationModalWithDetails,
} from "@/app/merchant/products/helpers";
import {
  Card,
  CardBody,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@nextui-org/react";
import { useContext } from "react";
import { SpecificationPointers } from "./specification-pointers";
import { TableActions } from "@/app/_custom-components";
export const CurrentSpecificationDetailsModal = ({
  isOpen,
  onOpenChange,
  openCreateUpdateModal,
}: currentSpecificationModalProps) => {
  const mainContext = useContext(MainCreateUpdateProductContext);
  if (!mainContext) return null;
  const { config, setConfig } = mainContext;
  const { specifications } = config;

  return (
    <Modal
      classNames={{
        header: ["flex justify-center"],
        footer: ["flex justify-end"],
      }}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      scrollBehavior="inside"
    >
      <ModalContent>
        <ModalHeader>Specification details</ModalHeader>
        <ModalBody>
          <Card className="overflow-visible">
            {typeof specifications === "string" ? (
              <CardBody>
                <div className="flex justify-between gap-3 items-center">
                  <div className="break-all">{specifications}</div>
                  <div>
                    <TableActions
                      showDeleteIcon={false}
                      onClick={() => {
                        openUpdateSpecificationModalWithDetails(
                          specifications,
                          setConfig,
                          openCreateUpdateModal,
                        );
                      }}
                      editTooltipText="Update specification"
                      editToolTipColor="warning"
                      updateToolTipClass="text-white"
                    />
                  </div>
                </div>
              </CardBody>
            ) : (
              <SpecificationPointers
                openCreateUpdateModal={openCreateUpdateModal}
              />
            )}
          </Card>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
