import {
  currentDescriptionModalProps,
  MainCreateUpdateProductContext,
  openUpdateDescriptionModalWithDetails,
} from "@/app/merchant/products/helpers";
import {
  Card,
  CardBody,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ScrollShadow,
} from "@nextui-org/react";
import { useContext } from "react";
import { PointerDescription } from "./pointer-details";
import { TableActions } from "@/app/_custom-components";
export const CurrentDescriptionDetailsModal = ({
  isOpen,
  onOpenChange,
  openCreateUpdateModal,
}: currentDescriptionModalProps) => {
  const mainContext = useContext(MainCreateUpdateProductContext);
  if (!mainContext) return null;
  const { config, setConfig } = mainContext;
  const { description } = config;

  return (
    <Modal
      classNames={{
        header: ["flex justify-center"],
        footer: ["flex justify-end"],
      }}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        <ScrollShadow className="max-h-[70svh]">
          <ModalHeader>Description details</ModalHeader>
          <ModalBody>
            <Card>
              {typeof description === "string" ? (
                <CardBody>
                  <div className="flex justify-between gap-3 items-center">
                    <div className="break-all">{description}</div>
                    <div>
                      <TableActions
                        showDeleteIcon={false}
                        onClick={() =>
                          openUpdateDescriptionModalWithDetails(
                            description,
                            setConfig,
                            openCreateUpdateModal,
                          )
                        }
                        editTooltipText="Update description"
                        editToolTipColor="warning"
                        updateToolTipClass="text-white"
                      />
                    </div>
                  </div>
                </CardBody>
              ) : (
                <PointerDescription
                  descriptionPoints={description}
                  openCreateUpdateModal={openCreateUpdateModal}
                />
              )}
            </Card>
          </ModalBody>
        </ScrollShadow>
      </ModalContent>
    </Modal>
  );
};
