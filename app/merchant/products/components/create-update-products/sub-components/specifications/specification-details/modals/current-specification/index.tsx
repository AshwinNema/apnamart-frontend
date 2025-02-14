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
} from "@heroui/react";
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
      size="5xl"
    >
      <ModalContent>
        <ModalHeader>Specification details</ModalHeader>
        <ModalBody>
          <Card
            className={`overflow-visible ${typeof specifications !== "string" && "min-w-max"}`}
          >
            {typeof specifications === "string" ? (
              <CardBody>
                <div className="flex justify-between gap-3 items-center">
                  <div className="break-all overflow-visible">
                    {specifications}
                  </div>
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
