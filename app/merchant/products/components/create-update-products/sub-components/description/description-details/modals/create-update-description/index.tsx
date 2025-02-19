import {
  createUpdateDescriptionProps,
  MainCreateUpdateProductContext,
  getDescriptionModalHeader,
  createUpdateDescription,
  CreateUpdateDescriptionContext,
} from "@/app/merchant/products/helpers";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
} from "@heroui/react";
import { useContext } from "react";
import { SeriesDescription } from "./series description";
import useManageState from "./useManageState";

export const CreateUpdateDescription = ({
  isOpen,
  onOpenChange,
}: createUpdateDescriptionProps) => {
  const mainContext = useContext(MainCreateUpdateProductContext);
  const [config, setConfig, setData, descriptionEventsEmitter] = useManageState(
    { isOpen },
  );

  if (!mainContext) return null;
  const { config: mainConfig, setConfig: setMainConfig } = mainContext;

  return (
    <>
      <Modal
        classNames={{ body: ["mt-3"], header: ["flex justify-center"] }}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="5xl"
        scrollBehavior="inside"
        placement="center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                {getDescriptionModalHeader(mainConfig, config)}
              </ModalHeader>

              <ModalBody>
                {typeof config.details === "string" ? (
                  <Textarea
                    label="Description"
                    value={config.details}
                    onValueChange={setData("details")}
                  />
                ) : (
                  <CreateUpdateDescriptionContext.Provider
                    value={{ config, setConfig, descriptionEventsEmitter }}
                  >
                    <SeriesDescription />
                  </CreateUpdateDescriptionContext.Provider>
                )}
              </ModalBody>

              <ModalFooter>
                <div className="flex justify-end mb-5">
                  <Button
                    className="text-white"
                    onPress={() =>
                      createUpdateDescription(config, onClose, setMainConfig)
                    }
                    color={`${config.isUpdating ? "warning" : "success"}`}
                  >
                    {config.isUpdating ? "Update" : "Create"}
                  </Button>
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
