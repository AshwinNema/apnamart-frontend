import {
  currentSpecificationModalProps,
  getSpecificationEditIcon,
  MainCreateUpdateProductContext,
} from "@/app/merchant/products/helpers";
import {
  Card,
  CardBody,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@nextui-org/react";
import { useContext, Fragment } from "react";
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
    >
      <ModalContent>
        <ModalHeader>Specification details</ModalHeader>
        <ModalBody>
          <Card>
            {typeof specifications === "string" ? (
              <CardBody>
                <div className="flex justify-between gap-3 items-center">
                  <div className="break-all">{specifications}</div>
                  <div>
                    {getSpecificationEditIcon(
                      specifications,
                      setConfig,
                      openCreateUpdateModal,
                    )}
                  </div>
                </div>
              </CardBody>
            ) : (
              specifications.map((specification, index) => {
                const isLastIndex = index === specifications.length - 1;
                return (
                  <Fragment key={specification.id}>
                    <CardBody className="ml-3">
                      {specification.header ? (
                        <div className="flex justify-center font-bold">
                          {specification.header}
                        </div>
                      ) : null}
                      <div className="flex justify-between items-center gap-3 mr-2">
                        <ul className="list-disc">
                          {specification.keyVals.map((specificationDetails) => {
                            return (
                              <li

                                key={specificationDetails.id}
                              >
                                <div className="flex justify-between items-center ">
                                  <div>{specificationDetails.key}</div>
                                  <div>-</div>
                                  <div>{specificationDetails.val}</div>
                                </div>

                              </li>
                            );
                          })}
                        </ul>

                        <div className="">
                          {getSpecificationEditIcon(
                            specification,
                            setConfig,
                            openCreateUpdateModal,
                          )}
                        </div>
                      </div>

                      {!isLastIndex ? <Divider /> : null}
                    </CardBody>
                  </Fragment>
                );
              })
            )}
          </Card>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
