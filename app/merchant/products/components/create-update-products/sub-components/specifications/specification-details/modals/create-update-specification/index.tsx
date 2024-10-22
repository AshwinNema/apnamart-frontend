import { setMultiplePaths, setNestedPath } from "@/app/_utils";
import {
  createUpdateSpecification,
  defaultCreateUpdateSpecificationState,
  getSpecificationModalHeader,
  createUpdateSpecificationProps,
  createUpdateSpecificationState,
  resetCreateUpdateSpecificationState,
  setInitialSpecificationState,
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
import { useCallback, useEffect, useState } from "react";
import { SeriesSpecification } from "./series specifications";

export const CreateUpdateSpecification = ({
  mainConfig,
  isOpen,
  onOpenChange,
  setMainConfig,
}: createUpdateSpecificationProps) => {
  const { specificationType, updateSpecificationDetails } = mainConfig;
  const [config, setConfig] = useState<createUpdateSpecificationState>(
    defaultCreateUpdateSpecificationState(),
  );
  const setData = useCallback(setNestedPath(setConfig), [setConfig]);
  useEffect(() => {
    resetCreateUpdateSpecificationState(
      specificationType,
      setMultiplePaths(setConfig),
      isOpen,
    );
  }, [specificationType, isOpen]);

  useEffect(() => {
    setInitialSpecificationState(mainConfig, setConfig, setMainConfig);
  }, [updateSpecificationDetails]);

  return (
    <>
      <Modal
        classNames={{ body: ["mt-3"], header: ["flex justify-center"] }}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <ScrollShadow className="max-h-[70svh]">
              <ModalHeader>
                {getSpecificationModalHeader(mainConfig, config)}
              </ModalHeader>
              <ModalBody>
                {typeof config.details === "string" ? (
                  <Textarea
                    label="Description"
                    value={config.details}
                    onValueChange={setData("details")}
                  />
                ) : (
                  <SeriesSpecification config={config} setConfig={setConfig} />
                )}
              </ModalBody>
              <ModalFooter>
                <div className="flex justify-end">
                  <Button
                    className="text-white mb-5"
                    onPress={() =>
                      createUpdateSpecification(config, onClose, setMainConfig)
                    }
                    color={`${config.isUpdating ? "warning" : "success"}`}
                  >
                    {config.isUpdating ? "Update" : "Create"}
                  </Button>
                </div>
              </ModalFooter>
            </ScrollShadow>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
