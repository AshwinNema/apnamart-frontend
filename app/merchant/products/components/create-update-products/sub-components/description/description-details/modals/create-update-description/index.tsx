import { setMultiplePaths, setNestedPath } from "@/app/_utils";
import {
  setInitialDescriptionState,
  createUpdateDescriptionProps,
  MainCreateUpdateProductContext,
  createUpdateDescriptionState,
  defaultCreateUpdateDescriptionState,
  resetCreateUpdateDescriptionState,
  getDescriptionModalHeader,
  createUpdateDescription,
} from "@/app/merchant/products/helpers";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ScrollShadow,
  Textarea,
} from "@nextui-org/react";
import { useCallback, useContext, useEffect, useState } from "react";
import { SeriesDescription } from "./series description";

export const CreateUpdateDescription = ({
  isOpen,
  onOpenChange,
}: createUpdateDescriptionProps) => {
  const mainContext = useContext(MainCreateUpdateProductContext);
  const [config, setConfig] = useState<createUpdateDescriptionState>(
    defaultCreateUpdateDescriptionState(),
  );
  const setData = useCallback(setNestedPath(setConfig), [setConfig]);
  useEffect(() => {
    if (!mainContext?.config?.descriptionType) return;
    resetCreateUpdateDescriptionState(
      mainContext?.config?.descriptionType,
      setMultiplePaths(setConfig),
      isOpen,
    );
  }, [mainContext?.config?.descriptionType, isOpen]);

  useEffect(() => {
    if (!mainContext) return;
    setInitialDescriptionState(
      mainContext?.config,
      setConfig,
      mainContext?.setConfig,
    );
  }, [mainContext?.config?.updateDescriptionDetails]);

  if (!mainContext) return null;
  const { config: mainConfig, setConfig: setMainConfig } = mainContext;

  return (
    <>
      <Modal
        classNames={{ body: ["mt-3"], header: ["flex justify-center"] }}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="5xl"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ScrollShadow className="max-h-[70svh]">
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
                    <SeriesDescription config={config} setConfig={setConfig} />
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
              </ScrollShadow>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
