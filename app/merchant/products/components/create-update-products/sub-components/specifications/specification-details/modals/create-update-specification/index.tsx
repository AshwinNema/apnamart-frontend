import { setMultiplePaths, setNestedPath } from "@/app/_utils";
import {
  createUpdateSpecification,
  defaultNewSpecificationConfig,
  getCurState,
  getSpecificationModalHeader,
  newSpecificationProps,
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
  Textarea,
} from "@nextui-org/react";
import { useCallback, useEffect, useState } from "react";
import { SeriesSpecification } from "./series specifications";

export const CreateUpdateSpecification = ({
  mainConfig,
  isOpen,
  onOpenChange,
  setMainConfig,
}: newSpecificationProps) => {
  const { specificationType, updateDetails } = mainConfig;
  const [config, setConfig] = useState<createUpdateSpecificationState>(
    defaultNewSpecificationConfig(),
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
  }, [updateDetails]);

  const curState = getCurState(mainConfig);
  return (
    <>
      <Modal
        classNames={{ body: ["mt-3"], header: ["flex justify-center"] }}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                {getSpecificationModalHeader(mainConfig)}
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
                    className="text-white"
                    onPress={() =>
                      createUpdateSpecification(config, onClose, setMainConfig)
                    }
                    color={`${curState === "create" ? "success" : "warning"}`}
                  >
                    {curState === "create" ? "Create" : "Update"}
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
